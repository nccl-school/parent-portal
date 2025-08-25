import { ENV_CD, ENV_CI, ENV_RUNTIME } from "@nccl/env";

ENV_CI.validate();
ENV_CD.validate();
ENV_RUNTIME.validate();
