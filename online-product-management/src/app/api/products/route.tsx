import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import prisma from "../../../../prisma/client";

export async function POST(req: NextRequest) {
  try {
    const {
      name,
      wsCode,
      salesPrice,
      mrp,
      packageSize,
      categoryId,
      tags,
      images,
    }: {
      name: string;
      wsCode: number;
      salesPrice: number;
      mrp: number;
      packageSize: number;
      categoryId: number;
      tags: string[];
      images: string[]; // Base64 strings
    } = await req.json();

    // Validate required fields
    if (!name || !wsCode || !salesPrice || !mrp || !packageSize || !categoryId) {
      return NextResponse.json(
        { message: "All fields are required!", success: false },
        { status: 400 }
      );
    }

    // Check category existence
    const categoryExists = await prisma.category.findUnique({
      where: { categoryId: categoryId },
    });

    if (!categoryExists) {
      return NextResponse.json(
        { message: "Invalid category ID", success: false },
        { status: 400 }
      );
    }

    // Validate image count
    if (images.length > 5) {
      return NextResponse.json(
        { message: "A maximum of 5 images is allowed!", success: false },
        { status: 400 }
      );
    }

    // Create upload directory
    const uploadDir = path.join(process.cwd(), "public", "uploads", wsCode.toString());
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Save images and get paths
    const imagePaths: string[] = [];
    for (const [index, base64Image] of images.entries()) {
      const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, "");
      const buffer = Buffer.from(base64Data, "base64");
      const imagePath = path.join(uploadDir, `${index + 1}.jpg`);
      fs.writeFileSync(imagePath, buffer);
      imagePaths.push(`/uploads/${wsCode}/${index + 1}.jpg`);
    }

    // Insert product into database
    await prisma.product.create({
      data: {
        name,
        wsCode,
        salesPrice,
        mrp,
        packageSize,
        categoryId,
        tags,
        images: imagePaths,
      },
    });

    return NextResponse.json({ message: "Product added successfully!", success: true });
  } catch (error) {
    if (error instanceof Error){
      console.log("Error: ", error.stack)
  }
    console.error("Error saving product:", error);
    return NextResponse.json(
      { message: "Failed to add product", success: false, error: error.message },
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
