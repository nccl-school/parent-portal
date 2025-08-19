import { getEnvVar, validateEnvVars } from "../index.js";

validateEnvVars();

const envVar = getEnvVar("NCCL_API_URL");
console.log(envVar);
