import { ENV } from "../src/index.js";

ENV.getAllEnvVars();

const envVar = ENV.getEnvVar("NCCL_API_URL");
console.log(envVar);
