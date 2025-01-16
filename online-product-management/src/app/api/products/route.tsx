import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import path from "path";
import fs from "fs";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const {
      name,
      mrp,
      packageSize,
      categoryId,
      tags,
      images,
    }: {
      name: string;
      mrp: number;
      packageSize: number;
      categoryId: number;
      tags: string[];
      images: string[]; // Base64 strings
    } = await req.json();

    // Validate required fields
    if (!name || !mrp || !packageSize || !categoryId) {
      return NextResponse.json(
        { message: "All fields except images and tags are required!", success: false },
        { status: 400 }
      );
    }

    // Check category existence
    const categoryExists = await prisma.category.findUnique({
      where: { categoryId },
    });

    if (!categoryExists) {
      return NextResponse.json(
        { message: "Invalid category ID", success: false },
        { status: 400 }
      );
    }

    // Validate image count
    if (images && images.length > 5) {
      return NextResponse.json(
        { message: "A maximum of 5 images is allowed!", success: false },
        { status: 400 }
      );
    }

    // Get the next wsCode by finding the largest existing wsCode
    const lastProduct = await prisma.product.findFirst({
      orderBy: { wsCode: "desc" },
      select: { wsCode: true },
    });
    const wsCode = lastProduct ? lastProduct.wsCode + 1 : 1;

    // Create upload directory for the product
    const uploadDir = path.join(process.cwd(), "public", "uploads", wsCode.toString());
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Save images and get paths
    const imagePaths: string[] = [];
    if (images) {
      for (const [index, base64Image] of images.entries()) {
        const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, "");
        const buffer = Buffer.from(base64Data, "base64");
        const imagePath = path.join(uploadDir, `${index + 1}.jpg`); // Save images as 1.jpg, 2.jpg, etc.
        fs.writeFileSync(imagePath, buffer);
        imagePaths.push(`/uploads/${wsCode}/${index + 1}.jpg`);
      }
    }

    // Insert product into the database
    const newProduct = await prisma.product.create({
      data: {
        name,
        wsCode,
        mrp,
        packageSize,
        categoryId,
        tags: tags || [],
        images: imagePaths,
      },
    });

    return NextResponse.json({
      message: "Product added successfully!",
      success: true,
      product: newProduct,
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error saving product:", error.stack);
    }
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