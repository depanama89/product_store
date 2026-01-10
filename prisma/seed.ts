import { PrismaClient } from '@prisma/client';
import * as argon from 'argon2';
import { UserRoles } from 'src/const/const';

const prisma = new PrismaClient();
async function main() {
  const hashPassword = await argon.hash('kibangu25');
  const userRole = await prisma.role.upsert({
    where: {
      name: UserRoles.USER,
    },
    update: {},
    create: {
      name: UserRoles.USER,
    },
  });

  const adminRole = await prisma.role.upsert({
    where: {
      name: UserRoles.ADMIN,
    },
    update: {},
    create: {
      name: UserRoles.ADMIN,
    },
  });

  await prisma.user.upsert({
    where: { email: 'kudiatutomanitu@gmail.com' },
    update: {},
    create: {
      name: 'Patrick',
      email: 'kudiatutomanitu@gmail.com',
      password: hashPassword,
      isActive: true,
      gpdr: new Date(),
      roleId: adminRole.id,
    },
  });

  await prisma.user.upsert({
    where: {
      email: 'useremail@nestjs.com',
    },
    update: {},
    create: {
      name: 'tomanitu',
      email: 'useremail@nestjs.com',
      password: hashPassword,
      isActive: true,
      gpdr: new Date(),
      roleId: userRole.id,
    },
  });
  const product = await prisma.product.create({
    data: {
      name: 'IPhone 17',
      price: '1900',
      isAvailable: true,
      description: 'good quality',
    },
  });

  const firstCategory = await prisma.productCategory.create({
    data: {
      name: 'electronics',
    },
  });

  await prisma.productCategory.create({
    data: {
      name: 'phone',
    },
  });

  await prisma.productHasCategory.create({
    data: {
      productId: product.id,
      categoryId: firstCategory.id,
    },
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
