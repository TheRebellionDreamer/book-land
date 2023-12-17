import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash("A76132cd", 10);

  // Создаем пользователя
  await prisma.user.create({
    data: {
      passwordHash,
      email: "rebellion.dreamer@ya.ru",
      role: "USER",
      profile: {
        create: {
          firstName: "Никита",
          lastName: "Красильников",
          age: 26,
          city: "Нижний Новгород",
          address: "сп. Новинки, ул. Богородская, д. 14, кв. 16",
          pickUpLocation: "Нижний Новгород, ул. Советская, д. 14",
        },
      },
      cart: {
        create: {
          summaryCoast: 0,
          goods: {
            create: [],
          },
        },
      },
    },
  });
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
