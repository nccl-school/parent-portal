import { ENV, ENV_CD, ENV_CI } from "@nccl/env";

ENV_CI.load();
ENV.load();

switch (ENV.getOne("NCCL_ENVIRONMENT")) {
  case "dev":
  case "production":
    console.log("Loading CD environment variables");
    ENV_CD.load();
    break;

  default:
    break;
}
