import { ENV_RUNTIME } from "@nccl/env";
import * as Sentry from "@sentry/react-router";

Sentry.init({
  dsn: ENV_RUNTIME.getOne("VITE_SENTRY_DSN_APP"),

  // Adds request headers and IP for users, for more info visit:
  // https://docs.sentry.io/platforms/javascript/guides/react-router/configuration/options/#sendDefaultPii
  sendDefaultPii: true,

  // Enable logs to be sent to Sentry
  enableLogs: true,
});
