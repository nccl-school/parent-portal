import { ENV_RUNTIME } from "../src/index.js";

ENV_RUNTIME.getAll();

const envVar = ENV_RUNTIME.getOne("NCCL_API_URL");
console.log(envVar);
