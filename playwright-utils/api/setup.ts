import { test as setup } from "@playwright/test";

import { ENV_TEST } from "@nccl/env";

import { ROLE_CONFIG } from "./roles.js";

for (const [role, roleDef] of Object.entries(ROLE_CONFIG)) {
  setup(`authenticate as ${role}`, async ({ request }) => {
    const res = await request.post(
      ENV_TEST.getOne("NCCL_API_URL_PUBLIC").concat("/api/auth/sign-in/email"),
      {
        data: {
          email: roleDef.email,
          password: roleDef.password,
        },
      }
    );

    if (!res.ok()) {
      throw new Error(`${role} login failed: ${res.status()}`);
    }

    // Save cookies + storage state for this role
    await request.storageState({
      path: roleDef.statePath,
    });
  });
}
