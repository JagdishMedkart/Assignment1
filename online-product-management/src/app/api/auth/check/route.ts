import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma/client";

export async function GET(req: NextRequest) {
  try {
    const sessionToken = req.cookies.get("session-us")?.value; // Retrieve session-us cookie

    if (!sessionToken) {
      return NextResponse.json({ message: "Not authenticated", isLoggedIn: false }, { status: 401 });
    }

    const session = await prisma.session.findFirst({
      where: {
        sessionToken,
        expires: {
          gt: new Date().toISOString().replace("T", " "), // Ensure session is not expired
        },
      },
    });

    if (!session) {
      return NextResponse.json({ message: "Invalid or expired session", isLoggedIn: false }, { status: 401 });
    }

    return NextResponse.json({ message: "Authenticated", isLoggedIn: true }, { status: 200 });
  } catch (error) {
    console.error("Error in /api/auth/check:", error);
    return NextResponse.json({ message: "Internal server error", success: false }, { status: 500 });
  }
}
