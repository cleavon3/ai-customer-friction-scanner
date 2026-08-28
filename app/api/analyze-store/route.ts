import { NextResponse } from "next/server";

import { validateStore } from "@/lib/storeValidator";

import { supabase } from "@/lib/supabase";

import { analyzeStore } from "@/lib/storeAnalyzer";

import { generateFrictionReport } from "@/lib/frictionAI";

import { sendFrictionReportEmail } from "@/lib/email";

console.log("✅ ANALYZE STORE ROUTE REGISTERED");

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      storeUrl,

      email,

      category,
    } = body;

    console.log("STORE URL:", storeUrl);

    console.log("EMAIL:", email);

    console.log("CATEGORY:", category);

    if (!storeUrl || !email || !category) {
      return NextResponse.json(
        {
          error: "All fields are required",
        },

        {
          status: 400,
        },
      );
    }

    // STEP 1
    // Validate store before analysis

    const validation = await validateStore(storeUrl);

    console.log("STORE VALIDATION:", validation);

    if (!validation.valid) {
      return NextResponse.json(
        {
          error: validation.reason,
        },
        {
          status: 400,
        },
      );
    }

    if (!validation.valid) {
      console.log("❌ STORE REJECTED:", validation.reason);

      return NextResponse.json(
        {
          error: validation.reason,
        },
        {
          status: 400,
        },
      );
    }

    /*
      STEP 1
      Analyze Shopify store
    */

    const storeData = await analyzeStore(storeUrl);

    console.log(
      "STORE DATA:",

      storeData.signals,
    );

    /*
      STEP 2
      Generate friction report
    */

    const frictionReport = await generateFrictionReport(storeData, category);

    const frictionScore = frictionReport.score;

    console.log(
      "FRICTION REPORT:",

      frictionReport,
    );

    /*
      STEP 3
      Save lead
    */

    const {
      data: lead,

      error: leadError,
    } = await supabase

      .from("leads")

      .insert({
        email,

        store_url: storeUrl,

        category,

        friction_score: frictionScore,

        status: "new",
      })

      .select("id")

      .single();

    if (leadError || !lead) {
      console.error(
        "LEAD SAVE ERROR:",

        leadError,
      );

      return NextResponse.json(
        {
          error: "Could not save lead",
        },

        {
          status: 500,
        },
      );
    }

    console.log(
      "LEAD SAVED:",

      lead.id,
    );

    /*
      STEP 4
      Save report
    */

    const { error: reportError } = await supabase

      .from("reports")

      .insert({
        lead_id: lead.id,

        score: frictionScore,

        report_data: frictionReport,
      });

    if (reportError) {
      console.error(
        "REPORT SAVE ERROR:",

        reportError,
      );
    } else {
      console.log("REPORT SAVED SUCCESSFULLY");
    }

    /*
      STEP 5
      Send email report
    */

    console.log("STARTING EMAIL PROCESS");

    try {
      await sendFrictionReportEmail(
        email,

        frictionReport,
      );

      console.log("EMAIL SENT SUCCESSFULLY");
    } catch (emailError) {
      console.error(
        "EMAIL ERROR:",

        emailError,
      );
    }

    /*
      STEP 6
      Return response
    */

    return NextResponse.json({
      success: true,

      score: frictionScore,

      report: frictionReport,

      storeData,

      message: "Store analysis created",
    });
  } catch (error) {
    console.error(
      "ANALYZE STORE ERROR:",

      error,
    );

    return NextResponse.json(
      {
        error: "Analysis failed",
      },

      {
        status: 500,
      },
    );
  }
}
