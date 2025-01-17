import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const newPassword = "admin123"; // Replace with the new password if needed
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  // Update the admin user's password hash
  await prisma.user.update({
    where: { email: "admin@example.com" },
    data: {
      passwordHash: hashedPassword, // Update the password hash
      updatedAt: new Date(), // Update the timestamp for the record
    },
  });

  // console.log("Admin user's password updated successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
