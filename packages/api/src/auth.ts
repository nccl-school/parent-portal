import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";

import { PrismaClient } from "./_generated/prisma/client.js";

const prisma = new PrismaClient();

export const auth = betterAuth({
  telemetry: { enabled: false },
  emailAndPassword: {
    enabled: true,
  },
  user: {
    // custom fields
    additionalFields: {
      roleId: { type: "string" },
      firstName: { type: "string" },
      lastName: { type: "string" },
      isSuper: { type: "boolean", input: false },
    },
  },
  // emailVerification: {
  //   sendVerificationEmail: async ({ user, url }) => {
  //     // implement your logic here to send email verification
  //   },
  // },
  // socialProviders: {
  //   google: {
  //     clientId:
  //   }
  // },  // TODO: social providers,
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
});
