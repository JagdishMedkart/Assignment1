import prisma from "../../../../../../prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    // Replace `orders` with the actual name of your orders table or collection
    const totalProducts = await prisma.product.count();

    return NextResponse.json({ totalProducts }, { status: 200 });
  } catch (error) {
    console.error("Error fetching total order count:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
