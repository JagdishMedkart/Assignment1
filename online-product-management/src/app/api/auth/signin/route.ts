import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import prisma from "../../../../../../prisma/client"; // Corrected path
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
            { expires: { lt: now } },
            { userId: dbuser.userId },
          ],
        },
      });
      await prisma.session.create({
        data: {
          sessionToken,
          userId: dbuser.userId,
          expires: futureDate,
        },
      });

      (await cookies()).set("session-us", sessionToken, { expires: futureDate });

      return true;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl + "/dashboard/home";
    },
    async session({ session, token, user }) {
      const dbuser = await prisma.user.findFirst({ where: { email: session.user?.email } });
      if (!dbuser) {
        return session;
      }
      const now = new Date();
      const ourSess = await prisma.session.findFirst({
        where: { userId: dbuser.userId, expires: { gt: now } },
      });
      if (!ourSess) {
        return session;
      }

      (await cookies()).set("session-us", ourSess.sessionToken, { expires: new Date(ourSess.expires) });

      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      return token;
    },
  },
});

export { handler as GET, handler as POST };
