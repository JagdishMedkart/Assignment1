import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../../prisma/client";

export async function GET(req: NextRequest, { params }: { params: { orderId: string } }) {
  const orderId = parseInt(params.orderId);

  if (isNaN(orderId)) {
    return NextResponse.json(
      { message: "Invalid order ID" },
      { status: 400 }
    );
  }

  try {
    // Fetch the order with its associated order items and product details
    const order = await prisma.order.findUnique({
      where: { orderId },
      include: {
        user: { select: { name: true, email: true } }, // User details
        orderItems: {
          select: {
            product: { select: { name: true, mrp: true } }, // Product details
            quantity: true, // Quantity of product
            unitPrice: true, // Unit price of product
            totalPrice: true, // Total price of the item
          },
        },
      },
    });

    if (!order) {
      return NextResponse.json(
        { message: "Order not found" },
        { status: 404 }
      );
    }

    // Calculate total amount from the order items
    const totalAmount = order.orderItems.reduce(
      (acc, item) => acc + item.totalPrice,
      0
    );

    // Return the enriched order details
    return NextResponse.json(
      {
        message: "Order details fetched successfully",
        order: { ...order, totalAmount }, // Add totalAmount to the response
      },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Error){
        console.log("Error: ", error.stack)
    }
    console.error("Error fetching order details:", error);
    return NextResponse.json(
      { message: "Internal server error", success: false },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const { status, paymentStatus } = await req.json();

    const updatedOrder = await prisma.order.update({
      where: { orderId: Number(id) },
      data: { status, paymentStatus },
    });

    return NextResponse.json(
      { message: "Order updated successfully", order: updatedOrder },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating order:", error);
    return NextResponse.json(
      { message: "Internal server error", success: false },
      { status: 500 }
    );
  }
}

