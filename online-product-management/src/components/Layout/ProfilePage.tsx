import { cookies } from "next/headers";
import prisma from "../../../prisma/client";
import Profile from "./Profile";

export const ProfilePage = async () => {
  const sess = (await cookies()).get('session-us')?.value;
  if (sess == null) return <></>;

  const usr = await prisma.user.findFirst({
    where: {
      sessions: {
        some: {
          sessionToken: sess
        }
      }
    }
  });

  if (!usr) return <p>User not found</p>;

  return (
      <Profile Username={usr.Username} Email={usr.Email} />
  );
};