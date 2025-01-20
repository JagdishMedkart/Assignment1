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
    const page = parseInt(req.nextUrl.searchParams.get("page") || "1", 10);
    const ordersPerPage = 5;
    const skip = (page - 1) * ordersPerPage;

    // Fetch orders with true total
    const orders = await prisma.order.findMany({
      skip,
      take: ordersPerPage,
      include: {
        user: { select: { name: true } },
        orderItems: {
          include: {
            product: { select: { name: true, mrp: true, images: true } },
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    // Calculate true total for each order
    const ordersWithTrueTotal = orders.map((order) => {
      const trueTotal = order.orderItems.reduce(
        (sum, item) => sum + item.totalPrice,
        0
      );
      return { ...order, trueTotal };
    });

    // Count total orders for pagination calculation
    const totalOrders = await prisma.order.count();

    return NextResponse.json({
      message: "Orders fetched successfully",
      orders: ordersWithTrueTotal,
      totalOrders,
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      { message: "Internal server error", success: false },
      { status: 500 }
    );
  }
}
