import { NextRequest, NextResponse } from "next/server";
import { compareSync } from "bcrypt-ts";
import { AuthSchema } from "../authSchema"
import prisma from "../../../../../prisma/client";
import { randomString } from "@/lib/util";
import { cookies } from "next/headers";

interface LoginRequest {
    email: string;
}

export async function POST(req: NextRequest) {
    if (req.method === "POST") {
        const body = await req.json();
        const { email }: LoginRequest = body;
        const user = await prisma.user.findFirst({ where: { email: email } });
        if (!user) {
            return NextResponse.json({ message: "Invalid Email Credentials", success: false }, { status: 401 });
        }
        if (email != null) {
            const sessionToken = randomString(32);
            const now = new Date();
            const futureDate = new Date(Date.now() + 1000 * 60 * 60 * 6); // 6 hours into the future
            await prisma.session.deleteMany({
                where: {
                    OR: [
                        {
                            expires: {
                                lt: now.toISOString().replace("T", " "),
                            },
                        },
                        {
                            userId: user.userId,
                        },
                    ],
                },
            });
            await prisma.session.create({
                data: {
                    sessionToken: sessionToken,
                    userId: user.userId,
                    expires: futureDate.toISOString().replace("T", " "),
                },
            });

            (await cookies()).set({
                name: "session-us",
                value: sessionToken,
                expires: futureDate,
            });

            return NextResponse.json({ message: "Success", success: true }, { status: 200 });
        }
    } else {
        return NextResponse.json("Method not allowed", { status: 405 });
    }
}