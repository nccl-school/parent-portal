import { ENV_CD, ENV_CI, ENV_RUNTIME, ENV_SEED } from "@nccl/env";

ENV_CI.validate();
ENV_CD.validate();
ENV_RUNTIME.validate();
ENV_SEED.validate();
