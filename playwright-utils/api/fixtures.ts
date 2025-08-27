/* eslint-disable react-hooks/rules-of-hooks */
import { test as base } from "@playwright/test";

import type { Role } from "./roles.js";
import { ROLE_CONFIG } from "./roles.js";

function makeRoleTest(role: Role) {
  return base.extend({
    // RATIONALE: Playwright expects a destructure
    // eslint-disable-next-line no-empty-pattern
    storageState: async ({}, use) => {
      await use(ROLE_CONFIG[role].statePath);
    },
  });
}

// Individual exports
export const testAs = {
  super: makeRoleTest("super"),
};
