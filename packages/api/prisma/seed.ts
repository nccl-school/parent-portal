import { PrismaClient } from "../src/_generated/prisma/client.js";
import type { Role } from "../src/features/role/role.utils.js";
import { loadEnv } from "../scripts/load-env.script.js";

loadEnv();

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

  console.log("Seeding resources...");
  // Creates a fake relation to preserve the FK constraints and unique-ness values at the root
  // of the folder structure
  await prisma.resource.create({
    data: {
      id: "__ROOT__",
      name: "__ROOT__",
      slug: "__ROOT__",
      type: "FOLDER",
      parentResourceId: "__ROOT__",
    },
  });
  console.log("Seeding resources... complete.");
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
