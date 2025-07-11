import type { Roles } from "@nccl/api/client";

export {};

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role?: Roles;
      db_id?: string;
    };
  }
  interface UserPublicMetadata {
    role?: Roles;
    db_id?: string;
  }
}
