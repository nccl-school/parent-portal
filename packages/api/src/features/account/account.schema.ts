import z from "zod";

import { RolesSchema } from "../role/role.utils.js";
import { zMessageSchema, zStringRequired } from "../../utils/util.schema.js";

type PasswordRule = {
  label: string;
  test: (password: string) => boolean;
};

export const passwordRules: PasswordRule[] = [
  {
    label: "Between 12 - 128 characters",
    test: (v) => v.length >= 12 && v.length <= 128,
  },
  { label: "1 uppercase letter", test: (v) => /[A-Z]/.test(v) },
  { label: "1 number", test: (v) => /\d/.test(v) },
  { label: "1 special character", test: (v) => /[^A-Za-z0-9]/.test(v) },
  { label: "No spaces", test: (v) => !/\s/.test(v) },
];

export const zPasswordSchema = passwordRules.reduce(
  (schema, rule) =>
    schema.refine(rule.test, {
      message: rule.label,
    }),
  z.string()
);

// Invite Users
export const InviteUsersRequestSchema = z.object({
  email_addresses: z.array(z.email({ pattern: z.regexes.html5Email })),
  role: RolesSchema,
});
export type InviteUsersRequest = z.infer<typeof InviteUsersRequestSchema>;
export const InviteUsersResponseSchema = z.object({
  message: z.string(),
  userCount: z.number(),
});
export type InviteUsersResponse = z.infer<typeof InviteUsersResponseSchema>;

// Validate Token
export const ValidateTokenParamsSchema = z.object({ token: z.string() });
export const ValidateTokenResponseSchema = z.discriminatedUnion("status", [
  z.object({
    status: z.literal("invalid_token"),
    reason: z.string(),
  }),
  z.object({
    status: z.literal("valid"),
    email: z.string(),
  }),
]);
export type ValidateTokenResponse = z.infer<typeof ValidateTokenResponseSchema>;

// Accept Invite
export const AcceptInviteRequestSchema = z.object({
  token: z.string(),
  password: zPasswordSchema,
  firstName: zStringRequired("A first name is required"),
  lastName: zStringRequired("A last name is required"),
});
export type AcceptInviteRequest = z.infer<typeof AcceptInviteRequestSchema>;
export const AcceptInviteResponseSchema = zMessageSchema;
export type AcceptInviteResponse = z.infer<typeof AcceptInviteResponseSchema>;
