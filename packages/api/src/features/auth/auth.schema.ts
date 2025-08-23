import z from "zod/v4";

export const AuthSignInEmailRequestSchema = z.object({
  email: z.string(),
  password: z.string(),
  callbackUrl: z.string().optional(),
});
export type AuthSignInEmailRequest = z.infer<
  typeof AuthSignInEmailRequestSchema
>;
