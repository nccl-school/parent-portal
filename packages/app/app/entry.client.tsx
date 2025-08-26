import { startTransition, StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import { HydratedRouter } from "react-router/dom";

import { getClientVar } from "./utils/client";

if (getClientVar("SENTRY_ENABLED")) {
  const Sentry = await import("@sentry/react-router");
  Sentry.init({
    enabled: getClientVar("SENTRY_ENABLED"),
    dsn: getClientVar("SENTRY_DSN_APP"),
    // Adds request headers and IP for users, for more info visit:
    // https://docs.sentry.io/platforms/javascript/guides/react-router/configuration/options/#sendDefaultPii
    sendDefaultPii: true,
    environment: getClientVar("NCCL_ENVIRONMENT"),
    // integrations: [
    //   Sentry.feedbackIntegration({
    //     // Additional SDK configuration goes in here, for example:
    //     colorScheme: "system",
    //   }),
    // ],
    // Enable logs to be sent to Sentry
    enableLogs: true,
  });
}

startTransition(() => {
  hydrateRoot(
    document,
    <StrictMode>
      <HydratedRouter />
    </StrictMode>
  );
});
