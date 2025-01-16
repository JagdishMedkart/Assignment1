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

// const saveImages = async (wsCode: string, base64Images: string[]) => {
//   const uploadDir = path.join(process.cwd(), "public", "uploads", wsCode.toString());
  
//   const imagePaths: string[] = [];
//   for (const [index, base64Image] of base64Images.entries()) {
//         const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, "");
//         const buffer = Buffer.from(base64Data, "base64");
//         const imagePath = path.join(uploadDir, `${index + 1}.jpg`);
//         fs.writeFileSync(imagePath, buffer);
//         imagePaths.push(`/uploads/${wsCode}/${index + 1}.jpg`);
//       }

//   return imagePaths;
// };

// export async function PATCH(
//   req: NextRequest,
//   { params }: { params: { wsCode: string } }
// ) {
//   try {
//     const { wsCode } = params;
//     const wsCodeNumber = Number(wsCode);

//     if (!wsCode || isNaN(wsCodeNumber)) {
//       return NextResponse.json(
//         { message: "wsCode is required and must be a valid number", success: false },
//         { status: 400 }
//       );
//     }

//     const product = await prisma.product.findUnique({
//       where: { wsCode: wsCodeNumber },
//     });

//     if (!product) {
//       return NextResponse.json(
//         { message: `Product with wsCode ${wsCodeNumber} not found`, success: false },
//         { status: 404 }
//       );
//     }

//     const body = await req.json();
//     const { name, mrp, packageSize, categoryId, tags, images } = body;

//     if (!name  || !mrp || !packageSize || !categoryId) {
//       return NextResponse.json(
//         { message: "Missing required fields", success: false },
//         { status: 400 }
//       );
//     }

//     if (!Array.isArray(images) || images.length > 5) {
//       return NextResponse.json(
//         { message: "A maximum of 5 images is allowed!", success: false },
//         { status: 400 }
//       );
//     }

//     const imagePaths = await saveImages(wsCode, images);

//     await prisma.product.update({
//       where: { wsCode: wsCodeNumber },
//       data: {
//         name,
//         // salesPrice: parseFloat(salesPrice),
//         mrp: parseFloat(mrp),
//         packageSize: parseFloat(packageSize),
//         categoryId: parseInt(categoryId, 10),
//         tags: Array.isArray(tags) ? tags : [tags],
//         images: imagePaths.length > 0 ? imagePaths : undefined,
//       },
//     });

//     return NextResponse.json(
//       { message: "Product updated successfully!", success: true },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Error updating product:", error);
//     return NextResponse.json(
//       { message: "Failed to update product", success: false, error: error.message },
//       { status: 500 }
//     );
//   }
// }

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



const deleteOldImages = (wsCode: string) => {
  const uploadDir = path.join(process.cwd(), "public", "uploads", wsCode);
  
  // Check if the directory exists
  if (fs.existsSync(uploadDir)) {
    const files = fs.readdirSync(uploadDir);

    // Delete all the files inside the wsCode folder
    for (const file of files) {
      const filePath = path.join(uploadDir, file);
      fs.unlinkSync(filePath); // Delete the file
    }
    fs.rmdirSync(uploadDir); // Remove the directory after deleting the files
  }
};

// Helper function to save the new images
const saveImages = async (wsCode: string, base64Images: string[]) => {
  const uploadDir = path.join(process.cwd(), "public", "uploads", wsCode);
  
  // Create the product-specific directory if it doesn't exist
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const imagePaths: string[] = [];
  
  // Process and save each base64 image
  for (const [index, base64Image] of base64Images.entries()) {
    const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, "");
    const buffer = Buffer.from(base64Data, "base64");
    const imagePath = path.join(uploadDir, `${index + 1}.jpg`);
    fs.writeFileSync(imagePath, buffer); // Write the image to the file system
    imagePaths.push(`/uploads/${wsCode}/${index + 1}.jpg`); // Store the path for response
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
    const { name, mrp, packageSize, categoryId, tags, images } = body;

    if (!name || !mrp || !packageSize || !categoryId) {
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

    // If new images are provided, delete the old ones and save the new ones
    let imagePaths: string[] = [];
    if (images.length > 0) {
      // Delete old images
      deleteOldImages(wsCode);
      // Save new images and get their paths
      imagePaths = await saveImages(wsCode, images);
    }

    // Update the product in the database
    await prisma.product.update({
      where: { wsCode: wsCodeNumber },
      data: {
        name,
        mrp: parseFloat(mrp),
        packageSize: parseFloat(packageSize),
        categoryId: parseInt(categoryId, 10),
        tags: Array.isArray(tags) ? tags : [tags],
        images: imagePaths.length > 0 ? imagePaths : product.images, // If no new images, keep old ones
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