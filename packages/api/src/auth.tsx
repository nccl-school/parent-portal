import path from "node:path";

import dotenv from "dotenv";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { ResetPasswordEmail } from "@nccl/emails";

import { createResendClient, EMAIL_FIELDS } from "./utils/util.resend.js";
import { createPrismaClient } from "./utils/util.prisma.js";

const envPath = path.resolve(import.meta.dirname, "../../../.env");
dotenv.config({ path: envPath });

const prisma = createPrismaClient();
const resend = createResendClient();

export const auth = betterAuth({
  telemetry: { enabled: false },
  ...(process.env.NCCL_ENV === "local"
    ? {
        trustedOrigins: [
          process.env.NCCL_API_URL,
          process.env.NCCL_APP_URL,
        ].map((url) => String(url)),
      }
    : {}),
  emailAndPassword: {
    enabled: true,
    async sendResetPassword(data) {
      const resetLink = `${process.env.NCCL_API_URL}/api/auth${data.url}`;
      console.log({ url: data.url, resetLink });
      await resend.emails.send({
        from: EMAIL_FIELDS.from,
        subject: "Reset your password",
        to: data.user.email,
        react: <ResetPasswordEmail resetLink={resetLink} />,
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
  // socialProviders: {
  //   google: {
  //     clientId:
  //   }
  // },  // TODO: social providers,
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
});
