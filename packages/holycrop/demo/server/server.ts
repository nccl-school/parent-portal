import path from "path";
import { mkdir, writeFile } from "fs/promises";

import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { cors } from "hono/cors";

import { crop, CropSchema } from "../../src/server/index.js";

const app = new Hono();

app.use("/api/*", cors());

app.post("/api/avatar", zValidator("form", CropSchema), async (c) => {
  const json = c.req.valid("form");

  const { croppedBuffer, originalBuffer } = await crop(json);

  const uploadsDir = path.join(process.cwd(), "uploads");
  await mkdir(uploadsDir, { recursive: true });

  await Promise.all([
    writeFile(path.join(uploadsDir, "cropped.png"), croppedBuffer),
    writeFile(path.join(uploadsDir, "original.png"), originalBuffer),
  ]);

  return c.json({
    message: "Successful",
  });
});

export default app;
