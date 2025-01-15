// src/app/components/CheckLoginStatus.tsx
import prisma from "../../../prisma/client";
import { cookies } from "next/headers";

export async function checkLoginStatus() {
  const sessionToken = (await cookies()).get("session-us")?.value; // Adjust cookie key as needed
  if (!sessionToken) {
    return false;
  }

  const user = await prisma.user.findFirst({
    where: {
      sessions: {
        some: {
          sessionToken,
        },
      },
    },
  });

  return Boolean(user); // Return true if a user is found
}
