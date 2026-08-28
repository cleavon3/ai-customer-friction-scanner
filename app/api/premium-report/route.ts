import { NextResponse } from "next/server";

import {
  getAuditSession,
  updateReportStatus,
} from "@/lib/deepAudit/auditStore";

import { crawlStore } from "@/lib/deepAudit/crawler";

import { generateAuditReport } from "@/lib/deepAudit/auditGenerator";

import { saveAuditResult } from "@/lib/dashboard/saveAudit";

import { generatePremiumPDF } from "@/lib/pdf/generatePremiumPDF";

import { uploadPremiumReport } from "@/lib/storage/uploadPremiumReport";

import { sendPremiumAuditEmail } from "@/lib/email";

export async function POST(request: Request) {
  const startTime = Date.now();

  let auditId: string | null = null;

  try {
    const body = await request.json();

    auditId = body.auditId;

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

    const session = await getAuditSession(auditId);

    if (!session) {
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
PREVENT DUPLICATE
=========================
*/

    if (session.reportStatus === "completed") {
      return NextResponse.json({
        success: true,
        message: "Report already completed",
      });
    }

    /*
=========================
MARK GENERATING
=========================
*/

    await updateReportStatus(auditId, "generating");

    console.log("START PREMIUM REPORT:", session.storeUrl);

    /*
=========================
CRAWL
=========================
*/

    const auditData = await crawlStore(session.storeUrl);

    /*
=========================
AI REPORT
=========================
*/

    const report = await generateAuditReport(auditData);

    console.log("PREMIUM REPORT GENERATED");

    /*
=========================
PDF
=========================
*/

    const pdfBuffer = await generatePremiumPDF(report);

    const pdfUrl = await uploadPremiumReport(pdfBuffer, `${session.id}.pdf`);

    /*
=========================
EMAIL
=========================
*/

    await sendPremiumAuditEmail(session.email, report, pdfUrl);

    /*
=========================
SAVE DASHBOARD
=========================
*/

    await saveAuditResult(
      report,
      session.email,
      "Ecommerce",
      session.id,
      pdfUrl,
    );

    console.log("AUDIT SAVED TO DASHBOARD");

    /*
=========================
COMPLETE
=========================
*/

    await updateReportStatus(auditId, "completed");

    console.log("REPORT STATUS COMPLETED:", auditId);

    console.log("TOTAL TIME:", Date.now() - startTime, "ms");

    return NextResponse.json({
      success: true,

      report,

      pdfUrl,
    });
  } catch (error) {
    console.error("PREMIUM REPORT ERROR:", error);

    if (auditId) {
      try {
        await updateReportStatus(auditId, "failed");
      } catch (statusError) {
        console.error("STATUS UPDATE FAILED", statusError);
      }
    }

    return NextResponse.json(
      {
        error: "Premium report failed",
      },
      {
        status: 500,
      },
    );
  }
}
