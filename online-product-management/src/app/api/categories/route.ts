import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../prisma/client";

export async function POST(req: NextRequest) {
  try {
    const { name }: { name: string } = await req.json();

    if (!name) {
      return NextResponse.json(
        { message: "Category name is required", success: false },
        { status: 400 }
      );
    }

    const category = await prisma.category.create({
      data: { name },
    });

    return NextResponse.json(
      { message: "Category added successfully", success: true, category },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding category:", error);
    return NextResponse.json(
      { message: "Failed to add category", success: false },
      { status: 500 }
    );
  }
}
export async function GET() {
    try {
      const categories = await prisma.category.findMany({
        orderBy: { name: "asc" }, // Optional: Order categories alphabetically
      });
  
      return NextResponse.json(
        { message: "Categories fetched successfully", success: true, categories },
        { status: 200 }
      );
    } catch (error) {
      console.error("Error fetching categories:", error);
      return NextResponse.json(
        { message: "Failed to fetch categories", success: false },
        { status: 500 }
      );
    }
  }
  