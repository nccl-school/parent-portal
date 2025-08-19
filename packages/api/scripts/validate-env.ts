import { ENV } from "@nccl/env";

console.log("Validating environment variables...");
try {
  ENV.validate();
  console.log("Validating environment variables... done.");
} catch (error) {
  console.log(error);
}
