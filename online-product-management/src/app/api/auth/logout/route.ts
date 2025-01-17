import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma/client"
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  try {
    // Retrieve the session token from the cookies
    const sessionToken = req.cookies.get("session-us")?.value;

    if (!sessionToken) {
      return NextResponse.json({ message: "Not authenticated", success: false }, { status: 401 });
    }

    // Delete the session from the database
    await prisma.session.deleteMany({
      where: {
        sessionToken: sessionToken,
      },
    });

    // Clear the cookie from the browser
    (await cookies()).delete("session-us");

    return NextResponse.json({ message: "Logged out successfully", success: true }, { status: 200 });
  } catch (error) {
    console.error("Error during logout:", error);
    return NextResponse.json({ message: "An error occurred", success: false }, { status: 500 });
  }
}
