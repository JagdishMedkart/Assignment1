// src/middleware/authMiddleware.ts

import { NextRequest, NextResponse } from "next/server";
import prisma from "../../prisma/client"

export async function withAuth(req: NextRequest, res: NextResponse) {
  const authorization = req.headers.get("authorization");

  if (!authorization) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }

  const token = authorization.split(" ")[1];

  try {
    const userSession = await prisma.session.findUnique({
      where: { sessionToken: token },
      include: { user: true },
    });

    if (!userSession) {
      return NextResponse.json({ message: "Invalid session" }, { status: 401 });
    }

    (req as any).user = userSession.user; // Attach user to request object
    return res;
  } catch (error) {
    console.error("Authentication error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
