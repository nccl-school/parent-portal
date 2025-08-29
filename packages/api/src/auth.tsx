import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { ResetPasswordEmail } from "@nccl/emails";
import { ENV_RUNTIME } from "@nccl/env";

import { createResendClient, EMAIL_FIELDS } from "./utils/util.resend.js";
import { createPrismaClient } from "./utils/util.prisma.js";
import { ErrorSet } from "./utils/util.errors.js";

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
  // account: {
  //   accountLinking: {
  //     enabled: true,
  //     trustedProviders: ["google"],
  //   },
  // },
  databaseHooks: {
    user: {
      create: {
        async before(user) {
          // Check to see if the user already exists
          // and if it does let BA handle the upsert
          const dbUser = await prisma.user.findUnique({
            where: {
              email: user.email,
            },
          });
          if (dbUser) return { data: user };

          // Check to see if the user has an accepted invite
          // and find the latest invite that was accepted
          const acceptedInvite = await prisma.accountToken.findFirst({
            where: {
              email: user.email,
              type: "INVITE",
              acceptedAt: { not: null },
            },
            orderBy: { acceptedAt: "desc" },
          });

          if (!acceptedInvite) {
            throw new ErrorSet.unauthorized("INVITE_NOT_ACCEPTED");
          }

          const [firstName, lastName] = user.name.split(" ");

          return {
            data: {
              user,
              firstName,
              lastName,
              roleId: acceptedInvite.roleId,
            },
          };
        },
      },
    },
  },
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
});
