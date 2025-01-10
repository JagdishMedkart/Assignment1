import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Adding new users...');
  await prisma.user.createMany({
    data: [
      {
        name: 'Admin',
        email: 'admin@example.com',
        password: 'root', // Remember to hash this in production!
        isSuperAdmin: true,
      },
    ],
  });

  console.log('Seed completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
