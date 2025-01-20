// pages/api/products/search-index.js
import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma/client"; // Adjust for your database setup

export async function GET(req: NextRequest) {
  try {
    const products = await prisma.product.findMany({
      select: {
        wsCode: true,
        name: true,
      },
      where: {
        deletedAt: null,
      }
    });
    return NextResponse.json({ products: products, success: true });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: `Failed to get all product details`,
    });
  }
}
