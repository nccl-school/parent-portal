export {};
import type { UserRole } from "./features/user";

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role?: UserRole;
    };
  }
  interface UserPublicMetadata {
    role?: UserRole;
  }
}
