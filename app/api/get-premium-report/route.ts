import { NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const auditId = searchParams.get("id");

    if (!auditId) {
      return NextResponse.json(
        {
          error: "Audit ID required",
        },
        {
          status: 400,
        },
      );
    }

    const supabase = await createClient();

    /*
    =========================
    GET PREMIUM REPORT
    =========================
    */

    const { data, error } = await supabase
      .from("reports")
      .select("*")
      .eq("audit_id", auditId)
      .single();

    if (error || !data) {
      console.error("GET PREMIUM REPORT ERROR:", error);

      return NextResponse.json(
        {
          error: "Premium report not found",
        },
        {
          status: 404,
        },
      );
    }

    return NextResponse.json({
      success: true,

      report: data.report_data,

      pdfUrl: data.pdf_url,

      score: data.score,
    });
  } catch (error) {
    console.error("GET PREMIUM REPORT FAILED:", error);

    return NextResponse.json(
      {
        error: "Unable to load premium report",
      },
      {
        status: 500,
      },
    );
  }
}
