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

    // Fetch the total quantity of the product in pending orders
    const totalPendingQuantity = await prisma.orderItem.aggregate({
      _sum: {
        quantity: true, // Sum up the quantity
      },
      where: {
        productWsCode: parseInt(wsCode, 10), // Match the productWsCode
        order: {
          status: "PENDING", // Match orders with pending status
        },
      },
    });

    const totalQuantity = totalPendingQuantity._sum.quantity;

    return NextResponse.json({
      success: true,
      wsCode,
      pendingOrders: totalQuantity,
    });
  } catch (error) {
    console.error("Error fetching total pending quantity:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch total pending quantity." },
      { status: 500 }
    );
  }
}
