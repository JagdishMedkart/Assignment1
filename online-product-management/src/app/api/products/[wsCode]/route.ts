import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import prisma from "../../../../../prisma/client";

// Helper function to delete the directory and its contents
const deleteDirectoryRecursive = (dirPath: string) => {
  if (fs.existsSync(dirPath)) {
    const files = fs.readdirSync(dirPath);
    files.forEach((file) => {
      const currentPath = path.join(dirPath, file);
      if (fs.lstatSync(currentPath).isDirectory()) {
        deleteDirectoryRecursive(currentPath); // Recurse into subdirectories
      } else {
        fs.unlinkSync(currentPath); // Delete file
      }
    });
    fs.rmdirSync(dirPath); // Delete the directory itself
  }
};

export async function DELETE(
  req: NextRequest,
  { params }: { params: { wsCode: string } }
) {
  try {
    // Await params to access wsCode correctly
    const { wsCode } = await params; // Awaiting to access wsCode

    const wsCodeNumber = Number(wsCode); // Convert to number

    // Validate wsCode
    if (!wsCodeNumber) {
      return NextResponse.json(
        { message: "wsCode is required to delete the product", success: false },
        { status: 400 }
      );
    }

    // Check if the product exists
    const product = await prisma.product.findUnique({
      where: { wsCode: wsCodeNumber }, // Use the number type for wsCode
    });

    if (!product) {
      return NextResponse.json(
        {
          message: `Product with wsCode ${wsCodeNumber} not found`,
          success: false,
        },
        { status: 404 }
      );
    }

    // Delete images and the directory from the server
    const uploadDir = path.join(
      process.cwd(),
      "public",
      "uploads",
      wsCodeNumber.toString()
    );
    deleteDirectoryRecursive(uploadDir); // Delete images and the folder

    // Delete the product from the database
    await prisma.product.delete({
      where: { wsCode: wsCodeNumber }, // Use the number type for wsCode
    });

    return NextResponse.json(
      {
        message: `Product with wsCode ${wsCodeNumber} deleted successfully`,
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json(
      {
        message: "Failed to delete product",
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}

const saveImages = async (wsCode: string, base64Images: string[]) => {
  const uploadDir = path.join(process.cwd(), "public", "uploads", wsCode.toString());
  
  const imagePaths: string[] = [];
  for (const [index, base64Image] of base64Images.entries()) {
        const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, "");
        const buffer = Buffer.from(base64Data, "base64");
        const imagePath = path.join(uploadDir, `${index + 1}.jpg`);
        fs.writeFileSync(imagePath, buffer);
        imagePaths.push(`/uploads/${wsCode}/${index + 1}.jpg`);
      }

  return imagePaths;
};

export async function PATCH(
  req: NextRequest,
  { params }: { params: { wsCode: string } }
) {
  try {
    const { wsCode } = params;
    const wsCodeNumber = Number(wsCode);

    if (!wsCode || isNaN(wsCodeNumber)) {
      return NextResponse.json(
        { message: "wsCode is required and must be a valid number", success: false },
        { status: 400 }
      );
    }

    const product = await prisma.product.findUnique({
      where: { wsCode: wsCodeNumber },
    });

    if (!product) {
      return NextResponse.json(
        { message: `Product with wsCode ${wsCodeNumber} not found`, success: false },
        { status: 404 }
      );
    }

    const body = await req.json();
    const { name, salesPrice, mrp, packageSize, categoryId, tags, images } = body;

    if (!name || !salesPrice || !mrp || !packageSize || !categoryId) {
      return NextResponse.json(
        { message: "Missing required fields", success: false },
        { status: 400 }
      );
    }

    if (!Array.isArray(images) || images.length > 5) {
      return NextResponse.json(
        { message: "A maximum of 5 images is allowed!", success: false },
        { status: 400 }
      );
    }

    const imagePaths = await saveImages(wsCode, images);

    await prisma.product.update({
      where: { wsCode: wsCodeNumber },
      data: {
        name,
        salesPrice: parseFloat(salesPrice),
        mrp: parseFloat(mrp),
        packageSize: parseFloat(packageSize),
        categoryId: parseInt(categoryId, 10),
        tags: Array.isArray(tags) ? tags : [tags],
        images: imagePaths.length > 0 ? imagePaths : undefined,
      },
    });

    return NextResponse.json(
      { message: "Product updated successfully!", success: true },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json(
      { message: "Failed to update product", success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: { wsCode: string } }
) {
  try {
    const { wsCode } = params;
    const wsCodeNumber = Number(wsCode);

    if (!wsCode || isNaN(wsCodeNumber)) {
      return NextResponse.json(
        { message: "wsCode is required and must be a valid number", success: false },
        { status: 400 }
      );
    }

    const product = await prisma.product.findUnique({
      where: { wsCode: wsCodeNumber },
    });

    if (!product) {
      return NextResponse.json(
        { message: `Product with wsCode ${wsCodeNumber} not found`, success: false },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      product,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch products." },
      { status: 500 }
    );
  }
}