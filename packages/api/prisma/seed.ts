import path from "node:path";

import dotenv from "dotenv";

import { PrismaClient } from "../src/_generated/prisma/default.js";

dotenv.config({ path: path.resolve(import.meta.dirname, "../../../.env") });

const prisma = new PrismaClient();
async function main() {
  console.log("Seeding roles...");
  await prisma.role.createMany({
    data: [
      {
        name: "PARENT",
        label: "Parent",
        description:
          "View student information, resources, and school updates. Limited to family-specific content and actions.",
      },
      {
        name: "STAFF",
        label: "Staff",
        description:
          "Access to internal tools, directories, and administrative resources. Designed for teachers and school personnel.",
      },
      {
        name: "ADMIN",
        label: "Administrator",
        description:
          "Full access to manage users, content, and system settings. Ideal for IT or leadership roles.",
      },
    ],
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
