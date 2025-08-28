import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { ResetPasswordEmail } from "@nccl/emails";
import { ENV_RUNTIME } from "@nccl/env";

import { createResendClient, EMAIL_FIELDS } from "./utils/util.resend.js";
import { createPrismaClient } from "./utils/util.prisma.js";

const prisma = createPrismaClient();
const resend = createResendClient();

export const auth = betterAuth({
  telemetry: { enabled: false },
  trustedOrigins: [
    ENV_RUNTIME.getOne("NCCL_API_URL"),
    ENV_RUNTIME.getOne("NCCL_APP_URL"),
  ],
  emailAndPassword: {
    enabled: true,
    async sendResetPassword(data) {
      await resend.emails.send({
        from: EMAIL_FIELDS.from,
        subject: "Reset your password",
        to: data.user.email,
        react: <ResetPasswordEmail resetLink={data.url} />,
      });
    },
    async onPasswordReset({ user }) {
      // your logic here
      console.log(`Password for user ${user.email} has been reset.`);
    },
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
  socialProviders: {
    google: {
      clientId: ENV_RUNTIME.getOne("BETTER_AUTH_PROVIDER_GOOGLE_CLIENT_ID"),
      clientSecret: ENV_RUNTIME.getOne(
        "BETTER_AUTH_PROVIDER_GOOGLE_CLIENT_SECRET"
      ),
      accessType: "offline",
      prompt: "select_account consent",
    },
  },
  databaseHooks: {
    user: {
      create: {
        async before(user) {
          const userHasAnExistingInvite = await prisma.accountToken.findFirst({
            where: {
              email: user.email,
              type: "INVITE",
              acceptedAt: { not: null },
            },
          });

          if (!userHasAnExistingInvite) {
            // stop Better Auth from creating this user
            throw "user_not_invited";
          }

          return { data: user };
        },
      },
    },
  },
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
});
