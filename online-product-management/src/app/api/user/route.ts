import { Auth } from "../../../lib/manage/auth";
import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../prisma/client";
import { User } from "../../../lib/manage/user"
import { z } from "zod";
import { hashSync } from "bcrypt-ts";
import { cookies } from "next/headers";

const userSchema = z.object({
    password: z.string(),
});

interface DeleteId {
    id: number;
}

// REST API
export async function DELETE(req: NextRequest) {
    const usrId = await Auth.authenticate();
    if (!usrId) return NextResponse.json("Invalid credentials", { status: 401 });
    const body = await req.json();
    const { id }: DeleteId = body;
    await User.remove(id);
    return NextResponse.json("Deleted", { status: 200 });
}

//update user

export async function PATCH(req: NextRequest) {
    try {
        const usrId = await Auth.authenticate();
        console.log(usrId);
        if (!usrId) return NextResponse.json("Invalid credentials", { status: 401 });

        const body = await req.json();
        const validation = userSchema.safeParse(body);
        console.log(validation);
        if (!validation.success) return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
        const sess = (await cookies()).get("session-us")?.value;
        console.log(sess);
        const usr = await prisma.session.findFirst({ where: { sessionToken: sess } });
        console.log(usr);
        const hash = hashSync(validation.data.password, 10);
        const user = await prisma.user.update({
            data: {
                passwordHash: hash,
            },
            where: { userId: usr.userId },
        });
        console.log(user);
        return NextResponse.json("Success", { status: 200 });
    } catch (error) {
        if (error instanceof Error) {
            console.log("Error: ", error.stack)
        }
    }
}