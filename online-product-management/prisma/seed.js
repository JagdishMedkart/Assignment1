import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  // Add predefined categories
  const categories = [
    { name: "Electronics" },
    { name: "Fashion" },
    { name: "Home Appliances" },
    { name: "Books" },
    { name: "Sports Equipment" },
  ];

  // for (const category of categories) {
  //   await prisma.category.upsert({
  //     where: { name: category.name },
  //     update: {},
  //     create: category,
  //   });
  // }
  const hashedPassword = await bcrypt.hash("admin123", 10);
  console.log("Categories added successfully!");

  // Add an admin user
  const admin = {
    name: "Admin User",
    email: "admin@example.com",
    emailVerified: null, // Change to a valid DateTime value if needed
    image: null,
    passwordHash: hashedPassword, // Replace with an actual hashed password
    isSuperAdmin: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  await prisma.user.upsert({
    where: { email: admin.email },
    update: {},
    create: admin,
  });

  console.log("Admin user added successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
