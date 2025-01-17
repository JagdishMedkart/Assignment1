import { NextRequest, NextResponse } from "next/server";
import { authSchema } from "../authSchema"; 
import { hashSync } from "bcrypt-ts";
import prisma from "../../../../../prisma/client";

export async function POST(req: NextRequest) {
  try{
    if (req.method === 'POST') {
        const body= await req.json();
        // console.log(body);
        const validation = authSchema.safeParse(body);
        // console.log(validation);
        // console.log(validation.success)
        if (!validation.success)
            return NextResponse.json({ message: 'User registration failed', success: false },{status:500});
        const hash = hashSync(body.password,10);
        // console.log(hash);
        const newUser= await prisma.user.create({
            data:{
              name:body.Username,
              email:body.Email,
              passwordHash:hash,
              isSuperAdmin: false,
            }
        })
        return NextResponse.json({ message: 'User registration successful', success: true },{status:200})
      } else {
        return NextResponse.json('Method not allowed',{status:405})
      }
    }
    catch(error) {
      if (error instanceof Error){
          console.log("Error: ", error.stack)
      }
  }
  }