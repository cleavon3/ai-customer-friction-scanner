import { NextResponse } from "next/server";

import Stripe from "stripe";

import { headers } from "next/headers";

import { createAdminClient } from "@/lib/supabase/admin";

import { updateReportStatus } from "@/lib/deepAudit/auditStore";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: Request) {
  console.log("🔥 STRIPE WEBHOOK RECEIVED");

  try {
    const body = await request.text();

    const headersList = await headers();

    const signature = headersList.get("stripe-signature");

    if (!signature) {
      return NextResponse.json(
        {
          error: "Missing Stripe signature",
        },
        {
          status: 400,
        },
      );
    }

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(
        body,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET!,
      );
    } catch (error) {
      console.error("WEBHOOK SIGNATURE ERROR:", error);

      return NextResponse.json(
        {
          error: "Invalid webhook signature",
        },
        {
          status: 400,
        },
      );
    }

    console.log("STRIPE EVENT:", event.type);

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;

      const auditId = session.metadata?.auditId || session.client_reference_id;

      const email = session.metadata?.email || session.customer_details?.email;

      console.log("PAYMENT SUCCESS:", {
        auditId,
        email,
      });

      if (!auditId) {
        throw new Error("Audit ID missing");
      }

      const supabase = createAdminClient();

      /*
      =========================
      FIND AUDIT SESSION
      =========================
      */

      const { data: auditSession, error: auditError } = await supabase
        .from("audit_sessions")
        .select("*")
        .eq("id", auditId)
        .single();

      if (auditError || !auditSession) {
        console.error("AUDIT SESSION ERROR:", auditError);

        throw new Error("Audit session not found");
      }

      /*
      =========================
      SAVE PAYMENT
      =========================
      */

      const { error: paymentError } = await supabase.from("payments").insert({
        lead_id: auditSession.lead_id,

        amount: 49,

        currency: "USD",

        product: "Premium Audit",

        status: "paid",

        stripe_session_id: session.id,

        stripe_payment_intent_id:
          typeof session.payment_intent === "string"
            ? session.payment_intent
            : null,

        customer_email: email,
      });

      if (paymentError) {
        if (paymentError.code === "23505") {
          console.log("PAYMENT ALREADY RECORDED");
        } else {
          console.error("PAYMENT SAVE ERROR:", paymentError);

          throw paymentError;
        }
      }

      /*
      =========================
      UPDATE LEAD
      =========================
      */

      const { error: leadError } = await supabase
        .from("leads")
        .update({
          status: "AUDIT_PURCHASED",
        })
        .eq("id", auditSession.lead_id);

      if (leadError) {
        console.error("LEAD UPDATE ERROR:", leadError);

        throw leadError;
      }

      /*
      =========================
      START REPORT GENERATION
      =========================
      */

      await updateReportStatus(auditId, "generating");

      console.log("✅ PREMIUM AUDIT UNLOCKED");
    }

    return NextResponse.json({
      received: true,
    });
  } catch (error) {
    console.error("WEBHOOK ERROR:", error);

    return NextResponse.json(
      {
        error: "Webhook failed",
      },
      {
        status: 500,
      },
    );
  }
}
