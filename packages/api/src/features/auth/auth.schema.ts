import z from "zod/v4";

import { zStringRequired } from "../../utils/util.schema.js";

export const AuthSignInEmailRequestSchema = z.object({
  email: z.string(),
  password: z.string(),
  callbackUrl: z.string().optional(),
});
export type AuthSignInEmailRequest = z.infer<
  typeof AuthSignInEmailRequestSchema
>;

export const AuthSignInSocialRequestSchema = z
  .discriminatedUnion("provider", [z.object({ provider: z.literal("google") })])
  .and(
    z.object({
      inviteToken: z.string().optional(),
      newUserCallbackURL: z.string(),
      callbackURL: z.string(),
      errorCallbackURL: z.string(),
    })
  );
export type AuthSignInSocialRequest = z.infer<
  typeof AuthSignInSocialRequestSchema
>;

export const AuthForgotPasswordRequestSchema = z.object({
  email: z.string(),
  redirectTo: z.string(),
});
export type AuthForgotPasswordRequest = z.infer<
  typeof AuthForgotPasswordRequestSchema
>;

export const AuthResetPasswordSchema = z.object({
  newPassword: zStringRequired("A new password is required"),
  token: z.string(),
});
export type AuthResetPassword = z.infer<typeof AuthResetPasswordSchema>;
