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

    // Fetch the authenticated user
    const user = await prisma.user.findFirst({
      where: {
        sessions: {
          some: { sessionToken },
        },
      },
    });

    if (!user || !user.isSuperAdmin) {
      return NextResponse.json(
        { message: "Not authorized", isLoggedIn: false },
        { status: 403 }
      );
    }

    // Get the page number and limit from query parameters, default to 1 and 5
    const page = parseInt(req.nextUrl.searchParams.get("page") || "1", 10);
    const limit = parseInt(req.nextUrl.searchParams.get("limit") || "5", 10);
    const skip = (page - 1) * limit;

    // Fetch users with pagination
    const users = await prisma.user.findMany({
      skip,
      take: limit,
      select: {
        userId: true,
        name: true,
        email: true,
        isSuperAdmin: true,
        createdAt: true,
      },
      orderBy: { createdAt: "desc" },
    });

    // Count total users for pagination calculation
    const totalUsers = await prisma.user.count();

    return NextResponse.json({
      message: "Users fetched successfully",
      users,
      totalUsers,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { message: "Internal server error", success: false },
      { status: 500 }
    );
  }
}
