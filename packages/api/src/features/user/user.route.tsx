import { Hono } from "hono";

import {
  GetCurrentUserResponseSchema,
  GetUserListResponseSchema,
  GetUserParamsSchema,
  GetUserResponseSchema,
  UserIDParamsSchema,
  UpdateUserRoleRequestSchema,
  UpdateUserRoleResponseSchema,
  UpdateMyProfileRequestSchema,
  UpdateMyProfileResponseSchema,
  UpdateAvatarRequestSchema,
} from "./user.utils.js";

import { validate } from "../../middleware/middleware.validate.js";
import { ErrorSet } from "../../utils/util.errors.js";
import { authorize } from "../../middleware/middleware.authorize.js";
import { serialize } from "../../utils/util.serialize.js";
import { createBucketPath, getBucket } from "../../utils/util.bucket.js";

export const user = new Hono();

user.get("/current", async (c) => {
  const db = c.get("db");
  const currentUser = c.get("user");
  const userWithRole = await db.user.findUnique({
    where: {
      id: currentUser.id,
    },
    include: {
      role: true,
    },
  });
  if (!userWithRole) throw new ErrorSet.notFound("Cannot get the current user");
  const data = await serialize(GetCurrentUserResponseSchema, userWithRole);
  return c.json(data);
});

// GET /api/user | Get a list of users
user.get("/", authorize("ADMIN"), async (c) => {
  const db = c.get("db");
  const users = await db.user.findMany({
    include: {
      role: {},
    },
  });
  const data = await serialize(GetUserListResponseSchema, users);
  return c.json(data);
});

// GET /api/user/:id | Get a user
user.get("/:id", validate("param", GetUserParamsSchema), async (c) => {
  const params = c.req.valid("param");
  const db = c.get("db");
  const user = await db.user.findUnique({
    where: {
      id: params.id,
    },
    include: {
      role: true,
    },
  });
  if (!user) {
    throw new ErrorSet.notFound("");
  }

  const data = await serialize(GetUserResponseSchema, user);
  return c.json(data);
});

// PUT /api/user/:id/role | Update a users role
user.put(
  "/:id/role",
  authorize("ADMIN"),
  validate("param", UserIDParamsSchema),
  validate("json", UpdateUserRoleRequestSchema),
  async (c) => {
    const body = c.req.valid("json");
    const param = c.req.valid("param");
    const db = c.get("db");
    console.log("Updating user in db");
    const user = await db.user.update({
      data: {
        roleId: body.role,
      },
      where: {
        id: param.id,
      },
      include: {
        role: true,
      },
    });

    // Invalidate the current user cache
    const data = await serialize(UpdateUserRoleResponseSchema, user);
    return c.json(data);
  }
);

// PUT /api/user/my-profile | Update the current user's profile information
user.put(
  "/my-profile",
  validate("json", UpdateMyProfileRequestSchema),
  async (c) => {
    const db = c.get("db");
    const currentUser = c.get("user");
    const body = c.req.valid("json");

    const updatedUser = await db.user.update({
      where: {
        id: currentUser.id,
      },
      data: body,
    });

    const data = await serialize(UpdateMyProfileResponseSchema, updatedUser);
    return c.json(data);
  }
);

// POST /api/user/avatar | Update the current user's avatar information
user.post("/avatar", validate("form", UpdateAvatarRequestSchema), async (c) => {
  const db = c.get("db");
  const currentUser = c.get("user");
  const body = c.req.valid("form");

  const { crop } = await import("holycrop/server");
  const { croppedBuffer } = await crop(body);

  const bucket = getBucket();
  const bucketImagePath = createBucketPath({
    owner: "freeform",
    segments: ["avatars", `${crypto.randomUUID()}.png`],
  });
  const blob = bucket.file(bucketImagePath);
  await blob.save(croppedBuffer, {
    contentType: "image/png",
  });
  await blob.makePublic();
  const imageUrl = blob.publicUrl();

  const updateUser = await db.user.update({
    data: {
      imageUrl,
      imageUrlLastUpdated: new Date(),
    },
    where: {
      id: currentUser.id,
    },
  });

  const data = await serialize(UpdateMyProfileResponseSchema, updateUser);
  return c.json(data);
});

user.all(() => {
  throw new ErrorSet.notFound();
});
