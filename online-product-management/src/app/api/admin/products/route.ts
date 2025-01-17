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

    // Get the page number from query parameters, default to 1
    const page = parseInt(req.nextUrl.searchParams.get("page") || "1", 5);
    const productsPerPage = 5;
    const skip = (page - 1) * productsPerPage;

    // Fetch products with pagination
    const products = await prisma.product.findMany({
      skip,
      take: productsPerPage,
      include: {
        category: { select: { name: true } }, // Include category name
        // tags: true, // Include tags (if tags exist as a relation)
      },
      orderBy: { createdAt: "desc" },
    });

    // Count total products for pagination calculation
    const totalProducts = await prisma.product.count();

    return NextResponse.json({
      message: "Products fetched successfully",
      products,
      totalProducts,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { message: "Internal server error", success: false },
      { status: 500 }
    );
  }
}
