import { ENV_RUNTIME } from "@nccl/env";

import { PrismaClient } from "./_generated/prisma/client.js";

import { seedRoles } from "../seed/seed.roles.js";
import { seedSuperUser } from "../seed/seed.super-user.js";
import { seedResource } from "../seed/seed.resource.js";

ENV_RUNTIME.load();

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
