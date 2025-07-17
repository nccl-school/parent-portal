import { describe } from "node:test";

import { test, expect } from "@playwright/test";

import type { GetRoleListResponse } from "./role.utils.js";

describe("/api/role", () => {
  test("GET / | Returns a list of predefined roles", async ({ request }) => {
    const res = await request.get("/api/role");
    expect(res.status()).toBe(200);
    const roles = (await res.json()) as GetRoleListResponse;

    for (const role of roles) {
      expect(role).toHaveProperty("id");
      expect(role).toHaveProperty("description");
      expect(role).toHaveProperty("label");
    }

    expect(roles.map(({ id }) => ({ id }))).toEqual(
      expect.arrayContaining([{ id: "USER" }, { id: "ADMIN" }, { id: "STAFF" }])
    );
  });
});
