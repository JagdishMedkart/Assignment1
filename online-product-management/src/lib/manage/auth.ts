import { cookies } from "next/headers";
import prisma from "../../../prisma/client";

export class Auth {
    // Authenticate a user's session
    public static async authenticate() {
        const sess = (await cookies()).get("session-us")?.value;
        // console.log(sess);
        let authenticated = null;
        if (sess != null) {
            const userSession = await prisma.session.findFirst({ where: { sessionToken: sess } });
            if (userSession != null) {
                authenticated = userSession.userId;
            }
            // console.log(userSession);
        }
        return authenticated;
    }
}