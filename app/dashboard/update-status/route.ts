import { NextResponse } from "next/server";

import { updateLeadStatus } from "@/lib/dashboard/updateLeadStatus";

export async function POST(request: Request) {
  try {
    const { leadId, status } = await request.json();

    await updateLeadStatus(leadId, status);

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Unable to update status",
      },

      {
        status: 500,
      },
    );
  }
}
