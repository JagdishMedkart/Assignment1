// eslint-disable-next-line @typescript-eslint/no-require-imports
const { PrismaClient } = require("../prisma/client");

const prisma = new PrismaClient();

async function main() {
  console.log("Clearing User table...");

  // Truncate the User table and reset the primary key sequence
  await prisma.$executeRawUnsafe(`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE;`);

  console.log("Adding a new admin user...");

  // Create a hashed password
  const bcrypt = require("bcrypt");
  const hashedPassword = await bcrypt.hash("admin123", 10);

  // Insert a new admin user
  const newUser = await prisma.user.create({
    data: {
      name: "Admin User",
      email: "admin@example.com",
      passwordHash: hashedPassword,
      isSuperAdmin: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  console.log("New user added:", newUser);
}

main()
  .catch((e) => {
    console.error("Error while seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
