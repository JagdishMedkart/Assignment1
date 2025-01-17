// src/app/api/cart/add/route.ts

import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma/client";
import { withAuth } from "../../../../middleware/authMiddleware"; // Import the authentication middleware

export async function POST(req: NextRequest) {
  try {
    const sessionToken = req.cookies.get("session-us")?.value; // Retrieve session-us cookie

    if (!sessionToken) {
      return NextResponse.json(
        { message: "Not authenticated", isLoggedIn: false },
        { status: 401 }
      );
    }

    let user = await prisma.user.findFirst({
      where: {
        sessions: {
          some: {
            sessionToken: sessionToken,
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json(
        { message: "You are not logged in!", isLoggedIn: false },
        { status: 401 }
      );
    }
    const { productId, quantity }: { productId: number; quantity: number } =
      await req.json();

    if (!productId || !quantity) {
      return NextResponse.json(
        { message: "Product ID and quantity are required", success: false },
        { status: 400 }
      );
    }

    // Check if the product already exists in the user's cart
    const existingItem = await prisma.cartItem.findFirst({
      where: { userId: user?.userId, productId },
    });

    if (existingItem) {
      // Update the quantity if the product is already in the cart
      const updatedItem = await prisma.cartItem.update({
        where: { cartItemId: existingItem.cartItemId },
        data: { quantity: existingItem.quantity + quantity },
      });

      return NextResponse.json(
        {
          message: "Cart item updated successfully",
          success: true,
          updatedItem,
        },
        { status: 200 }
      );
    }

    // Add the product to the cart if not already present
    const newItem = await prisma.cartItem.create({
      data: { userId: user.userId, productId, quantity },
    });

    return NextResponse.json(
      { message: "Item added to cart successfully", success: true, newItem },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.stack);
    }
    return NextResponse.json(
      { message: "Failed to add item to cart", success: false },
      { status: 500 }
    );
  }
}

// Configuring the handler to ensure authentication via middleware
export const config = {
  handler: withAuth, // Attach the authentication middleware to ensure the user is authenticated
};
