import { ENV_RUNTIME, ENV_SEED } from "@nccl/env";

import { PrismaClient } from "../_generated/prisma/client.js";
import { auth } from "../auth.js";

const prisma = new PrismaClient();

export async function seedSuperUser() {
  try {
    console.log("Seeding super user...");
    let superUserId: string;

    const existingSuperUser = await prisma.user.findUnique({
      where: { email: ENV_SEED.getOne("SUPER_USER_EMAIL") },
    });

    if (existingSuperUser) {
      superUserId = existingSuperUser.id;
    } else {
      const { user } = await auth.api.signUpEmail({
        body: {
          email: ENV_SEED.getOne("SUPER_USER_EMAIL"),
          password: ENV_SEED.getOne("SUPER_USER_PASSWORD"),
          name: `Superman (${ENV_RUNTIME.getOne("NCCL_ENVIRONMENT")})`,
          image:
            "https://yoolk.ninja/wp-content/uploads/2019/07/DC-Comics-Superman-1024x819.png",
          firstName: "Clark",
          lastName: "Kent",
          roleId: "ADMIN",
        },
      });
      await prisma.user.update({
        where: { id: user.id },
        data: { imageUrl: user.image },
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
