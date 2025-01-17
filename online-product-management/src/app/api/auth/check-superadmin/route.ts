import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma/client";

export async function GET(req: NextRequest) {
  try {
    const sessionToken = req.cookies.get("session-us")?.value; // Retrieve session-us cookie

    if (!sessionToken) {
      return NextResponse.json(
        { message: "Not authenticated", isLoggedIn: false },
        { status: 401 }
      );
    }

    let user = await prisma.user.findFirst({
      where: {
        sessions: {
          some: {
            sessionToken: sessionToken,
          },
        },
      },
    });

    if (!user || !user.isSuperAdmin) {
      return NextResponse.json(
        { message: "Access Denied!", isLoggedIn: false },
        { status: 401 }
      );
    }

    return NextResponse.json(
      {
        message: "Authenticated",
        isLoggedIn: true,
        user, // Returning the user object
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in /api/auth/check:", error);
    return NextResponse.json(
      { message: "Internal server error", success: false },
      { status: 500 }
    );
  }
}
