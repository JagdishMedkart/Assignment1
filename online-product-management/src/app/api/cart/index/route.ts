// src/app/api/cart/index/route.ts

import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma/client"
import { withAuth } from "../../../../middleware/authMiddleware";


export async function GET(req: NextRequest) {
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

    const cartItems = await prisma.cartItem.findMany({
      where: { userId: user?.userId },
      include: { product: true },
    });

    return NextResponse.json(
      { message: "Cart items fetched successfully", success: true, cartItems },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching cart items:", error);
    return NextResponse.json(
      { message: "Failed to fetch cart items", success: false },
      { status: 500 }
    );
  }
}

export const config = {
  handler: withAuth,
};
