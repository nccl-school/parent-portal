import { ENV_CI, ENV_RUNTIME, loadEnvVars } from "@nccl/env";

loadEnvVars();

ENV_CI.validate();
ENV_RUNTIME.validate();
