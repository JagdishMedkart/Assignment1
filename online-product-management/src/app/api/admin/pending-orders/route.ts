import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma/client";

export async function GET(req: NextRequest) {
  try {
    // Extract wsCode from the query parameters
    const { searchParams } = new URL(req.url);
    const wsCode = searchParams.get("wsCode");

    if (!wsCode) {
      return NextResponse.json(
        { success: false, message: "Product wsCode is required." },
        { status: 400 }
      );
    }

    // Fetch the total number of pending orders for the given product
    const pendingOrdersCount = await prisma.orderItem.count({
      where: {
        productWsCode: parseInt(wsCode, 10), // Match the productWsCode
        order: {
          status: "PENDING", // Match orders with pending status
        },
      },
    });

    return NextResponse.json({
      success: true,
      wsCode,
      pendingOrders: pendingOrdersCount,
    });
  } catch (error) {
    console.error("Error fetching pending orders:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch pending orders." },
      { status: 500 }
    );
  }
}
