import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  // Add predefined categories
  const categoryUpdates = [
    // { categoryId: 1, name: "Elderly Care" },
    // { categoryId: 2, name: "Diabetes Care" },
    // { categoryId: 3, name: "Blood Pressure" },
    // { categoryId: 4, name: "Eye Care" },
    { categoryId: 1, name: "Cold and Cough" },
    { categoryId: 2, name: "Healthcare Products" },
    { categoryId: 3, name: "Ayurvedic Products" },
    // { categoryId: 8, name: "Vitamins and Supplements" },
    { categoryId: 4, name: "Pain Relief" },
    { categoryId: 5, name: "Personal Hygiene" },
  ];

  for (const update of categoryUpdates) {
    await prisma.category.update({
      where: { categoryId: update.categoryId }, // Match by ID
      data: { name: update.name }, // Update the name
    });
  }

  console.log("Categories updated successfully!");
  // const hashedPassword = await bcrypt.hash("admin123", 10);
  // console.log("Categories added successfully!");

  // // Add an admin user
  // const admin = {
  //   name: "Admin User",
  //   email: "admin@example.com",
  //   emailVerified: null, // Change to a valid DateTime value if needed
  //   image: null,
  //   passwordHash: hashedPassword, // Replace with an actual hashed password
  //   isSuperAdmin: true,
  //   createdAt: new Date(),
  //   updatedAt: new Date(),
  // };

  // await prisma.user.upsert({
  //   where: { email: admin.email },
  //   update: {},
  //   create: admin,
  // });

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
