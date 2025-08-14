import { PrismaClient } from "../src/_generated/prisma/client.js";
import type { Role } from "../src/features/role/role.utils.js";

const prisma = new PrismaClient();

export async function seedRoles() {
  try {
    console.log("Seeding roles...");
    const data: Role[] = [
      {
        id: "USER",
        label: "User",
        description:
          "A basic user that can be linked to students, groups, committees, view basic information, resources, and school updates.",
      },
      {
        id: "STAFF",
        label: "Staff",
        description:
          "Access to internal tools, directories, and administrative resources. Designed for teachers and school personnel.",
      },
      {
        id: "ADMIN",
        label: "Administrator",
        description:
          "Full access to manage users, content, and system settings. Ideal for IT or leadership roles.",
      },
    ];
    await prisma.role.createMany({
      data,
      skipDuplicates: true,
    });
    console.log("Seeding roles... complete.");
  } catch (error) {
    console.log("Seeding roles... FAILURE.");
    console.error(error);
  }
}
