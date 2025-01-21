import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../../prisma/client"

export async function GET(req: NextRequest, { params }: { params: { categoryId: string } }) {
  try {
    // Extract categoryId from params
    const { categoryId } = params;

    // Default maximum number of products to display
    const maxProducts = 8;

    const cat = parseInt(categoryId)

    // Fetch products by categoryId
    const products = await prisma.product.findMany({
      where: {
        deletedAt: null, // Ensure the product is not deleted
        categoryId: cat || undefined, // Use the categoryId if provided
      },
      take: maxProducts, // Limit the result to maxProducts
    });

    // Return the products in JSON format
    return NextResponse.json({ success: true, products }, { status: 200 });
  } catch (error) {
    if(error instanceof Error){
      console.log(error.stack);
    }
    console.error("Error fetching products by category:", error);
    return NextResponse.json(
      { success: false, message: "Error fetching products" },
      { status: 500 }
    );
  }
}
