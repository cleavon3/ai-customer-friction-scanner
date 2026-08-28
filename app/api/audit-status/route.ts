import { NextResponse } from "next/server";

import { getAuditSession } from "@/lib/deepAudit/auditStore";

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

    return NextResponse.json({
      success: true,

      auditId: auditSession.id,

      premiumUnlocked: auditSession.premiumUnlocked,

      reportStatus: auditSession.reportStatus,
    });
  } catch (error) {
    console.error("AUDIT STATUS ERROR:", error);

    return NextResponse.json(
      {
        error: "Unable to check audit status",
      },
      {
        status: 500,
      },
    );
  }
}
