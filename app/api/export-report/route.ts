import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.report) {
      return NextResponse.json(
        {
          error: "Report data is required",
        },
        {
          status: 400,
        },
      );
    }

    return NextResponse.json(
      {
        message: "PDF export moved to client side",
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error("EXPORT REPORT ERROR:", error);

    return NextResponse.json(
      {
        error: "Export failed",
      },
      {
        status: 500,
      },
    );
  }
}
