import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma/client";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId, orderItems, totalAmount, address, notes } = body;

    if (
      !userId ||
      !orderItems ||
      orderItems.length === 0 ||
      !totalAmount ||
      !address
    ) {
      return NextResponse.json(
        { message: "Missing required fields.", success: false },
        { status: 400 }
      );
    }

    // Create order
    const order = await prisma.order.create({
      data: {
        userId,
        totalAmount,
        address: address,
        notes: notes,
        orderItems: {
          create: orderItems.map((item: any) => ({
            productWsCode: Number(item.productWsCode),
            quantity: item.quantity,
            unitPrice: item.unitPrice,
            totalPrice: item.quantity * item.unitPrice,
          })),
        },
      },
    });

    return NextResponse.json(
      { message: "Order placed successfully!", success: true, order },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof Error){
      console.log("Error: ", error.stack)
  }
    return NextResponse.json(
      { message: "An error occurred while placing the order.", success: false },
      { status: 500 }
    );
  }
}
