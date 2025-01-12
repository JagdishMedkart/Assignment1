import prisma from "../../../prisma/client";
import { Id } from "./types";

export class User {
    /// Create a new user
    /// @param name The name of the user
    /// @param email The email of the user
    /// @param passwordHash The password hash of the user
    /// @param isSuperAdmin Whether the user is a super admin
    /// @param roleId The role id of the user
    public static async register(name: string, email: string, passwordHash: string, isSuperAdmin: boolean): Promise<Id<"User">> {
        // Create the user
        const usr = await prisma.user.create({
            data: {
                Username: name,
                Email: email,
                passwordHash: passwordHash,
                isSuperAdmin: isSuperAdmin,
            },
        });
        return usr.id as Id<"User">;
    }

    /// Remove a user
    /// @param id The id of the user
    public static async remove(id: number) {
        // Delete their sessions
        await prisma.session.deleteMany({
            where: {
                userId: id,
            },
        });
        await prisma.user.deleteMany({
            where: {
                userId: id,
            },
        });
    }

    /// Update a user
    /// @param id The id of the user
    /// @param name The name of the user
    /// @param email The email of the user
    /// @param passwordHash The password hash of the user
    /// @param isSuperAdmin Whether the user is a super admin
    /// @param roleId The role id of the user
    public static async update(id: Id<"User">, name: string, email: string, passwordHash: string | undefined, isSuperAdmin: boolean) {
        await prisma.user.update({
            where: {
                userId: id,
            },
            data: {
                name: name,
                email: email,
                passwordHash: passwordHash,
                isSuperAdmin: isSuperAdmin,
            },
        });
    }


}