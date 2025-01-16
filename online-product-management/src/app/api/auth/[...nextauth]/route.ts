import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import prisma from "../../../../../prisma/client";
import { randomString } from "@/lib/util";
import { cookies } from "next/headers";

const SESSION_EXPIRY_HOURS = 6;

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
    async signIn({ user }) {
      try {
        const dbUser = await prisma.user.findUnique({
          where: { email: user.email },
        });
        console.log(dbUser);
        if (!dbUser) {
          console.error(`User not found: ${user.email}`);
          return false;
        }

        // Generate a new session
        const sessionToken = randomString(32);
        const expires = new Date(Date.now() + SESSION_EXPIRY_HOURS * 60 * 60 * 1000);

        // Remove expired sessions or existing sessions for the user
        await prisma.session.deleteMany({
          where: {
            OR: [
              { expires: { lt: new Date() } },
              { userId: dbUser.userId },
            ],
          },
        });

        // Create a new session
        await prisma.session.create({
          data: {
            sessionToken,
            userId: dbUser.userId,
            expires,
          },
        });

        // Set session cookie
        (await
              // Set session cookie
              cookies()).set("session-us", sessionToken, { expires });

        return true;
      } catch (error) {
        console.error("Error in signIn callback:", error);
        return false;
      }
    },

    async redirect({ baseUrl }) {
      return `${baseUrl}/`;
    },

    async session({ session }) {
      try {
        const email = session.user?.email;

        if (!email) return session;

        const dbUser = await prisma.user.findUnique({ where: { email } });

        if (!dbUser) {
          console.error(`User not found during session callback: ${email}`);
          return session;
        }

        // Check for an active session
        const activeSession = await prisma.session.findFirst({
          where: {
            userId: dbUser.userId,
            expires: { gt: new Date() },
          },
        });

        if (!activeSession) {
          console.error(`No active session found for user: ${email}`);
          return session;
        }

        // Refresh session cookie
        (await
              // Refresh session cookie
              cookies()).set("session-us", activeSession.sessionToken, {
          expires: new Date(activeSession.expires),
        });

        return session;
      } catch (error) {
        console.error("Error in session callback:", error);
        return session;
      }
    },

    async jwt({ token, user }) {
      return token;
    },
  },
});

export { handler as GET, handler as POST };
