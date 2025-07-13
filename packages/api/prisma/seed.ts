import path from "node:path";

import dotenv from "dotenv";

import { PrismaClient } from "../src/_generated/prisma/default.js";
import type { Role } from "../src/features/role/role.utils.js";

dotenv.config({ path: path.resolve(import.meta.dirname, "../../../.env") });

const prisma = new PrismaClient();
async function main() {
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
