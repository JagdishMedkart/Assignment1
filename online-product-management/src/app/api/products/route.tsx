import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../prisma/client"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, wsCode, salesPrice, mrp, packageSize, tags, category } = body;

    if (!name || !wsCode || !salesPrice || !mrp || !packageSize || !category) {
      return NextResponse.json(
        { success: false, message: "All fields are required." },
        { status: 400 }
      );
    }

    const product = await prisma.product.create({
      data: {
        name,
        wsCode,
        salesPrice,
        mrp,
        packageSize,
        tags,
        categoryId: parseInt(category),
      },
    });

    return NextResponse.json(
      { success: true, message: "Product added successfully!", product },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding product:", error);
    return NextResponse.json(
      { success: false, message: "Failed to add product." },
      { status: 500 }
    );
  }
  
}
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "5");

    const products = await prisma.product.findMany({
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { createdAt: "desc" },
    });

    const total = await prisma.product.count();

    return NextResponse.json({
      success: true,
      products,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch products." },
      { status: 500 }
    );
  }
}
