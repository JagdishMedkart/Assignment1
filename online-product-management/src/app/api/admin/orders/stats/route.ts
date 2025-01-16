import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../../prisma/client";

export async function GET(req: NextRequest) {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const ordersToday = await prisma.order.count({
      where: { createdAt: { gte: today } },
    });

    const pendingOrders = await prisma.order.count({
      where: { status: "PENDING" },
    });

    const totalSalesToday = await prisma.order.aggregate({
      _sum: { totalAmount: true },
      where: { createdAt: { gte: today }, paymentStatus: "COMPLETED" },
    });

    const pendingPayments = await prisma.order.aggregate({
      _sum: { totalAmount: true },
      where: { paymentStatus: "PENDING" },
    });

    const mostPurchasedProduct = await prisma.orderItem.groupBy({
      by: ["productWsCode"],
      _sum: { quantity: true },
      orderBy: { _sum: { quantity: "desc" } },
      take: 1,
    });

    const productDetails =
      mostPurchasedProduct.length > 0
        ? await prisma.product.findUnique({
            where: { wsCode: mostPurchasedProduct[0].productWsCode },
          })
        : null;

    return NextResponse.json(
      {
        message: "Dashboard stats fetched successfully",
        stats: {
          ordersToday,
          pendingOrders,
          totalSalesToday: totalSalesToday._sum.totalAmount || 0,
          pendingPayments: pendingPayments._sum.totalAmount || 0,
          mostPurchasedProduct: productDetails
            ? { name: productDetails.name, quantity: mostPurchasedProduct[0]._sum.quantity }
            : null,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    return NextResponse.json(
      { message: "Internal server error", success: false },
      { status: 500 }
    );
  }
}
