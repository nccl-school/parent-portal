import { PrismaClient } from "../src/_generated/prisma/client.js";

const prisma = new PrismaClient();

export async function seedResource() {
  try {
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
  } catch (error) {
    console.log("Seeding resources... FAILURE.");
    console.error(error);
  }
}
