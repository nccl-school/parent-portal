import crypto from "node:crypto";

import { addDays } from "date-fns";
import type { DefaultArgs } from "@prisma/client/runtime/library";

import { create64HexToken } from "../../utils/util.general.js";
import type { GlobalOmitConfig } from "../../_generated/prisma/internal/prismaNamespace.js";
import type { AccountTokenDelegate } from "../../_generated/prisma/models.js";
import type {
  AccountTokenType,
  RoleName,
} from "../../_generated/prisma/client.js";

export function hashToken(raw: string) {
  return crypto.createHash("sha256").update(raw).digest("hex");
}

type PrismaAccountTokenDelegate = AccountTokenDelegate<
  DefaultArgs,
  {
    omit: GlobalOmitConfig | undefined;
  }
>;

export async function createToken(
  prismaAccountToken: PrismaAccountTokenDelegate,
  {
    type,
    email,
    roleId,
    expiresInDays,
    createdByUserId,
  }: {
    type: AccountTokenType;
    roleId: RoleName;
    email: string;
    expiresInDays: number;
    createdByUserId: string;
  }
) {
  const inviteTokenRaw = create64HexToken();
  const inviteTokenHash = hashToken(inviteTokenRaw);
  const inviteExpiresAt = addDays(new Date(), expiresInDays);

  await prismaAccountToken.create({
    data: {
      type,
      email: email.toLowerCase().trim(),
      roleId,
      tokenHash: inviteTokenHash,
      expiresAt: inviteExpiresAt,
      createdById: createdByUserId,
    },
  });
  return { inviteTokenRaw, inviteExpiresAt };
}

export async function findValidToken(
  prismaAccountToken: PrismaAccountTokenDelegate,
  { type, rawToken }: { type: "INVITE" | "PASSWORD_RESET"; rawToken: string }
) {
  if (!rawToken) return null;
  const token = await prismaAccountToken.findUnique({
    where: { tokenHash: hashToken(rawToken) },
  });
  if (!token) return null;
  if (token.type !== type) return null;
  if (token.revokedAt) return null;
  if (token.acceptedAt) return null;
  if (token.expiresAt < new Date()) return null;
  return token;
}

/**
 * Mark a specific account token as used by supplying
 * the id of the account token
 */
export async function acceptAndMarkTokenUsed(
  prismaAccountToken: PrismaAccountTokenDelegate,
  { tokenId, acceptedById }: { tokenId: string; acceptedById: string }
) {
  await prismaAccountToken.update({
    where: { id: tokenId },
    data: {
      acceptedAt: new Date(),
      acceptedById,
      tokenHash: hashToken(crypto.randomUUID()), // rotate to kill link
    },
  });
}
