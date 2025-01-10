// app/api/auth/[...nextauth]/route.ts

import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import prisma from "../../../../../../prisma/client"
import { randomString } from "@/lib/util";
import { cookies } from "next/headers";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    secret: process.env.SECRET,
    pages: {
        error: "/auth/signin",
    },
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            // Custom sign-in logic here if needed
            const dbuser = await prisma.user.findFirst({ where: { email: user.email } });
            if (!dbuser) {
                return false;
            }

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
                            userId: dbuser.userId,
                        },
                    ],
                },
            });
            await prisma.session.create({
                data: {
                    sessionToken: sessionToken,
                    userId: dbuser.userId,
                    expires: futureDate.toISOString().replace("T", " "),
                },
            });

            (await cookies()).set({
                name: "session-us",
                value: sessionToken,
                expires: futureDate,
            });

            return true;
        },
        async redirect({ url, baseUrl }) {
            return baseUrl + "/dashboard/home";
        },
        async session({ session, token, user }) {
            const dbuser = await prisma.user.findFirst({ where: { email: session.user?.email } });
            if (dbuser == null) {
                return session;
            }
            const now = new Date();
            const ourSess = await prisma.session.findFirst({ where: { userId: dbuser.userId, expires: { gt: now.toISOString().replace("T", " ") } } });
            if (ourSess == null) {
                return session;
            }

            (await cookies()).set({
                name: "session-us",
                value: ourSess.sessionToken,
                expires: new Date(ourSess.expires),
            });

            return session;
        },
        async jwt({ token, user, account, profile, isNewUser }) {
            // Add custom JWT properties here if needed
            return token;
        },
    },
});

export { handler as GET, handler as POST };