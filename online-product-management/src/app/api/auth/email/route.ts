import { NextRequest, NextResponse } from "next/server";
import { OTP } from "../../../../lib/templates/email"
import { EmailTransport } from "@/lib/util";

interface EmailRequestBody {
    to: string;
    subject: string;
    text: string;
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { to, subject, text }: EmailRequestBody = body;

        if (!to || !subject || !text) {
            return NextResponse.json({ message: "All fields (to, subject, text) are required." }, { status: 400 });
        }

        const otp: string = Math.floor(100000 + Math.random() * 900000).toString();

        const mailOptions = {
            from: process.env.SMTP_EMAIL, // Sender email from environment variable
            to,
            subject,
            html: OTP(otp),
        };

        const info = await EmailTransport.sendMail(mailOptions);
        //console.log('Email sent:', info.response);
        return NextResponse.json({ message: "Email sent successfully", data: info.response, otp: otp }, { status: 200 });
    } catch (error) {
        console.error("Failed to send email:", error);
        return NextResponse.json({ message: "Failed to send email", error: error instanceof Error ? error.message : "Unknown error" }, { status: 500 });
    }
}