import { PrismaClient } from "../src/_generated/prisma/client.js";
import { auth } from "../src/auth.js";

const prisma = new PrismaClient();

export async function seedSuperUser() {
  try {
    console.log("Seeding super user...");
    let superUserId: string;

    const existingSuperUser = await prisma.user.findUnique({
      where: { email: process.env.SUPER_USER_EMAIL },
    });

    if (existingSuperUser) {
      superUserId = existingSuperUser.id;
    } else {
      const superUserFields = {
        email: "SUPER_USER_EMAIL",
        password: "SUPER_USER_PASSWORD",
        name: "SUPER_USER_NAME",
        imgUrl: "SUPER_USER_IMAGE_URL",
      } as const;
      const superUserEntries = Object.entries(superUserFields).map(
        ([key, value]) => {
          const envVar = process.env[value];
          if (!envVar) throw new Error(`Missing super user variable: ${value}`);
          return [key, envVar];
        }
      );
      const body = Object.fromEntries(
        superUserEntries
      ) as typeof superUserFields;
      const { user } = await auth.api.signUpEmail({
        body: {
          ...body,
          roleId: "ADMIN",
        },
      });
      await prisma.user.update({
        where: { id: user.id },
        data: { imageUrl: body.imgUrl },
      });
      superUserId = user.id;
    }

    await prisma.user.update({
      where: { id: superUserId },
      data: {
        isSuper: true,
        emailVerified: true,
        roleId: "ADMIN",
      },
    });

    console.log("Seeding super user... complete.");
  } catch (error) {
    console.log("Seeding super user... FAILURE.");
    console.error(error);
  }
}
