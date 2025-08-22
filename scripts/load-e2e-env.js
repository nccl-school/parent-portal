import path from "node:path";
import { writeFile } from "node:fs/promises";

import { ENV_RUNTIME, ENV_TEST, validateCI } from "@nccl/env";

console.log("Validating env vars");
validateCI();

const test = ENV_TEST.print();
const run = ENV_RUNTIME.print();

console.log(`Creating ".env.spec" file...`);
const filePath = path.resolve(import.meta.dirname, "../.env.spec");
const contents = `${test}\n${run}`;
await writeFile(filePath, contents, { encoding: "utf-8" });
console.log(`Creating ".env.spec" file... done.`);
