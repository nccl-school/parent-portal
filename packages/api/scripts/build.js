import path from "path";
import { copyFile, readdir } from "fs/promises";

import { build } from "esbuild";
import { nodeExternalsPlugin } from "esbuild-node-externals";

console.log("Building API...");
await build({
  entryPoints: [
    path.resolve(import.meta.dirname, "../src/index.ts"),
    path.resolve(import.meta.dirname, "../src/auth.tsx"),
  ],
  outdir: "dist",
  bundle: true,
  platform: "node",
  target: "node24",
  sourcemap: true,
  format: "esm",
  plugins: [
    nodeExternalsPlugin({
      allowList: ["@nccl/env", "@nccl/emails"],
    }),
  ],
});
console.log("Building API... success!");

console.log("Copying Prisma binaries...");
const binaryOutDir = path.resolve(import.meta.dirname, "../dist");
const binaryDir = path.resolve(import.meta.dirname, "../src/_generated/prisma");
const binaryDirents = await readdir(binaryDir, { withFileTypes: true });
const binaryFileMeta = binaryDirents.reduce((accum, dirent) => {
  if (!dirent.name.startsWith("libquery_engine")) return accum;
  return accum.concat({
    source: path.join(dirent.parentPath, dirent.name),
    dest: path.join(binaryOutDir, dirent.name),
  });
}, []);
await Promise.all(
  binaryFileMeta.map((meta) => copyFile(meta.source, meta.dest))
);
console.log("Copying Prisma binaries... success!");
