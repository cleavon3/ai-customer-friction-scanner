import { NextResponse } from "next/server";

import { crawlStore } from "@/lib/deepAudit/crawler";

import { generateFreePreview } from "@/lib/deepAudit/freePreviewGenerator";

import { createAuditSession } from "@/lib/deepAudit/auditStore";

import { createLead } from "@/lib/dashboard/createLead";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { storeUrl, email } = body;

    if (!storeUrl || !email) {
      return NextResponse.json(
        {
          error: "Store URL and email are required",
        },

        {
          status: 400,
        },
      );
    }

    console.log("STARTING DEEP AUDIT:", storeUrl);

    const auditData = await crawlStore(storeUrl);

    console.log("CRAWL COMPLETE");

    console.log("STARTING FREE PREVIEW");

    const preview = generateFreePreview(auditData);

    console.log("FREE PREVIEW GENERATED");
    const lead = await createLead(email, storeUrl);

    console.log("LEAD CREATED:", lead.id);

    const auditSession = await createAuditSession({
      storeUrl,

      email,

      leadId: lead.id,

      freePreviewGenerated: true,

      premiumUnlocked: false,
    });
    console.log("AUDIT SESSION CREATED:", auditSession.id);

    return NextResponse.json({
      success: true,

      preview,

      auditId: auditSession.id,
    });
  } catch (error) {
    console.error("DEEP AUDIT ERROR:", error);

    return NextResponse.json(
      {
        error: "Deep audit failed",
      },

      {
        status: 500,
      },
    );
  }
}
