import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { ResetPasswordEmail } from "@nccl/emails";
import { ENV_RUNTIME } from "@nccl/env";

import { createResendClient, EMAIL_FIELDS } from "./utils/util.resend.js";
import { createPrismaClient } from "./utils/util.prisma.js";
import { acceptAndMarkTokenUsed } from "./features/account/account.utils.js";
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

          // Check the validity of the invites of the user
          const invites = await prisma.accountToken.findMany({
            where: {
              email: user.email,
              type: "INVITE",
            },
            orderBy: { createdAt: "desc" },
          });

          if (invites.length === 0) {
            throw new ErrorSet.unauthorized("INVITE_REQUIRED");
          }

          const now = new Date().getTime();

          const [latestInvite] = invites;
          const [validInvite] = invites.filter(
            (i) => !i.revokedAt && !i.acceptedAt && i.expiresAt.getTime() > now
          );

          if (!validInvite) {
            throw new ErrorSet.unauthorized("INVITE_INVALID");
          }
          if (!validInvite && latestInvite.revokedAt) {
            throw new ErrorSet.unauthorized("INVITE_REVOKED");
          }

          if (!validInvite && latestInvite.expiresAt.getTime() <= now) {
            throw new ErrorSet.unauthorized("INVITE_EXPIRED");
          }
          if (!validInvite && latestInvite.acceptedAt) {
            throw new ErrorSet.unauthorized("INVITE_ALREADY_USED");
          }

          // Delete all of the tokens with the user
          await acceptAndMarkTokenUsed(prisma.accountToken, {
            tokenId: validInvite.id,
            acceptedById: user.id,
          });

          const [firstName, lastName] = user.name.split(" ");

          return {
            data: {
              user,
              firstName,
              lastName,
              roleId: validInvite.roleId,
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
