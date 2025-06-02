export {};

// Create a type for the roles
export type Roles = "admin" | "staff" | "parent";

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role?: Roles;
    };
  }
  interface UserPublicMetadata {
    role?: Roles;
  }
}
