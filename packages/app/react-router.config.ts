import type { Config } from "@react-router/dev/config";
import { ENV_RUNTIME } from "@nccl/env";

export default {
  ssr: true,
  buildEnd: async ({ viteConfig, reactRouterConfig, buildManifest }) => {
    if (!ENV_RUNTIME.getOne("SENTRY_ENABLED")) return;
    const Sentry = await import("@sentry/react-router");
    await Sentry.sentryOnBuildEnd({
      viteConfig,
      reactRouterConfig,
      buildManifest,
    });
  },
} satisfies Config;
