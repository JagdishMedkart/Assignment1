// src/app/api/cart/clear/route.ts

import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma/client";
import { withAuth } from "../../../../middleware/authMiddleware";

export async function DELETE(req: NextRequest) {
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
    // Delete all items from the cart for this user
    await prisma.cartItem.deleteMany({
      where: { userId: user.userId },
    });

    return NextResponse.json(
      { message: "Cart cleared successfully", success: true },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error clearing cart:", error);
    return NextResponse.json(
      { message: "Failed to clear cart", success: false },
      { status: 500 }
    );
  }
}

export const config = {
  handler: withAuth,
};
