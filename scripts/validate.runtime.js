import { ENV_RUNTIME, loadEnvVars } from "@nccl/env";

loadEnvVars();
ENV_RUNTIME.validate();
