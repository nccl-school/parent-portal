import { ENV, ENV_CD, ENV_CI, ENV_TEST } from "@nccl/env";

ENV.load();
ENV_CI.load();

switch (ENV.getOne("NCCL_ENVIRONMENT")) {
  case "test":
    ENV_TEST.load();
    ENV_TEST.set("");
    ENV.set("DATABASE_URL");
    break;

  case "dev":
  case "production":
    ENV_CD.load();

    ENV_CD.validate();
    ENV.validate();
    break;

  default:
    break;
}
