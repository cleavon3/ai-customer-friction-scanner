import { NextResponse } from "next/server";

import Stripe from "stripe";

import { getAuditSession } from "@/lib/deepAudit/auditStore";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { auditId, email } = body;

    if (!auditId || !email) {
      return NextResponse.json(
        {
          error: "Audit ID and email required",
        },
        {
          status: 400,
        },
      );
    }

    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error("Stripe secret key missing");
    }

    /*
    =========================
    VERIFY AUDIT SESSION
    =========================
    */

    const auditSession = await getAuditSession(auditId);

    if (!auditSession) {
      return NextResponse.json(
        {
          error: "Audit session not found",
        },
        {
          status: 404,
        },
      );
    }

    /*
    =========================
    CREATE STRIPE CHECKOUT
    =========================
    */

    const checkoutSession = await stripe.checkout.sessions.create({
      mode: "payment",

      customer_email: email,

      client_reference_id: auditId,

      line_items: [
        {
          price_data: {
            currency: "usd",

            product_data: {
              name: "Premium Shopify Intelligence Audit",

              description:
                "AI-powered customer friction analysis and conversion roadmap",
            },

            unit_amount: 4900,
          },

          quantity: 1,
        },
      ],

      metadata: {
        auditId,

        email,

        product: "Premium Audit",
      },

      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/audit-success?id=${auditId}`,

      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/unlock-audit?id=${auditId}`,
    });

    console.log("STRIPE CHECKOUT CREATED:", checkoutSession.id);

    return NextResponse.json({
      success: true,

      checkoutId: checkoutSession.id,

      checkoutUrl: checkoutSession.url,
    });
  } catch (error) {
    console.error("STRIPE CHECKOUT ERROR:", error);

    return NextResponse.json(
      {
        error: "Stripe checkout creation failed",
      },
      {
        status: 500,
      },
    );
  }
}
