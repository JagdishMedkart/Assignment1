import { NextRequest, NextResponse } from "next/server";
import { hashSync } from "bcrypt-ts";
import prisma from "../../../../../../prisma/client";

export async function POST(req: NextRequest) {
  if (req.method !== "POST") {
    return NextResponse.json(
      { message: "Method not allowed", success: false },
      { status: 405 }
    );
  }

  try {
    // Parse the request body
    const body = await req.json();

    // Basic Validation
    const { fullName, email, password } = body;
    if (!fullName || !email || !password) {
      return NextResponse.json(
        { message: "All fields are required", success: false },
        { status: 400 }
      );
    }

    // Check if the user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "Email already registered", success: false },
        { status: 409 } // Conflict
      );
    }

    // Hash the password
    const hashedPassword = hashSync(password, 10);

    // Create the new user
    const newUser = await prisma.user.create({
      data: {
        name: fullName,
        email,
        password: hashedPassword,
        isSuperAdmin: false, // Default to customer role
      },
    });

    return NextResponse.json(
      {
        message: "User registration successful",
        success: true,
        user: { id: newUser.userId, email: newUser.email }, // Return minimal user info
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in signup:", error);
    return NextResponse.json(
      { message: "An error occurred during registration", success: false },
      { status: 500 }
    );
  }
}
