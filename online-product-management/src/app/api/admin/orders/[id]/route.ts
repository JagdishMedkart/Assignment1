import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../../prisma/client";

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
