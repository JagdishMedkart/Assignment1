import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../../../prisma/client";
import { withAuth } from "../../../../../../middleware/authMiddleware";

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const sessionToken = req.cookies.get("session-us")?.value; // Retrieve session-us cookie

    if (!sessionToken) {
      return NextResponse.json(
        { message: "Not authenticated", isLoggedIn: false },
        { status: 401 }
      );
    }

    // Find the authenticated user based on the session token
    const user = await prisma.user.findFirst({
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

    const { id } = params; // Get productId from URL parameters
    const userId = user.userId; // Use userId from session

    if (!id) {
      return NextResponse.json(
        { message: "Product ID is required", success: false },
        { status: 400 }
      );
    }

    // Find the cart item using the composite key (userId and productId)
    const cartItem = await prisma.cartItem.findUnique({
      where: { userId_productId: { userId, productId: Number(id) } },
    });

    if (!cartItem) {
      return NextResponse.json(
        { message: "Cart item not found or unauthorized", success: false },
        { status: 404 }
      );
    }

    // Delete the cart item
    await prisma.cartItem.delete({
      where: { userId_productId: { userId, productId: Number(id) } },
    });

    return NextResponse.json(
      { message: "Item removed from cart successfully", success: true },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.stack);
    }
    console.error("Error removing item from cart:", error);
    return NextResponse.json(
      { message: "Failed to remove item from cart", success: false },
      { status: 500 }
    );
  }
}

export const config = {
  handler: withAuth,
};
