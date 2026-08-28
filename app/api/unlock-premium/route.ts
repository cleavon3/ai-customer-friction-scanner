import { NextResponse } from "next/server";

import { unlockPremiumAudit } from "@/lib/deepAudit/auditStore";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { auditId } = body;

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

    const audit = await unlockPremiumAudit(auditId);

    return NextResponse.json({
      success: true,

      audit,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Unlock failed",
      },

      {
        status: 500,
      },
    );
  }
}
