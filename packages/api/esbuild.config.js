// esbuild.config.js
import { builtinModules } from "node:module";

import { build } from "esbuild";

// You may want to include built-ins with 'node:' prefix too (e.g. 'node:fs')
const externals = [
  ...builtinModules,
  ...builtinModules.map((m) => `node:${m}`),
];

build({
  entryPoints: ["./src/index.ts"],
  outfile: "./dist/index.js",
  platform: "node",
  bundle: true,
  target: "node24",
  external: externals,
  format: "esm", // or 'cjs' if you're targeting CommonJS
  sourcemap: true,
}).catch((e) => {
  console.error(e);
  process.exit(1);
});
