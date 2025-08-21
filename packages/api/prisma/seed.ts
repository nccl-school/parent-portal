import { ENV } from "@nccl/env";

import { seedRoles } from "./seed.roles.js";
import { seedSuperUser } from "./seed.super-user.js";
import { seedResource } from "./seed.resource.js";

import { PrismaClient } from "../src/_generated/prisma/client.js";

ENV.load();

const prisma = new PrismaClient();
async function main() {
  const seedScripts = [seedRoles, seedSuperUser, seedResource];

  for (const seedScript of seedScripts) {
    try {
      await seedScript();
    } catch {
      break;
    }
  }
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
