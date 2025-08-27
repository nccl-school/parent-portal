import { ENV_RUNTIME } from "@nccl/env";

if (ENV_RUNTIME.getOne("SENTRY_ENABLED")) {
  const Sentry = await import("@sentry/react-router");
  Sentry.init({
    dsn: ENV_RUNTIME.getOne("SENTRY_DSN_APP"),
    environment: ENV_RUNTIME.getOne("NCCL_ENVIRONMENT"),

    // Adds request headers and IP for users, for more info visit:
    // https://docs.sentry.io/platforms/javascript/guides/react-router/configuration/options/#sendDefaultPii
    sendDefaultPii: true,

    // Enable logs to be sent to Sentry
    enableLogs: true,
  });
}
