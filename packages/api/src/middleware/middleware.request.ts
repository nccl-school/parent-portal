import { createMiddleware } from "hono/factory";
import { logContext } from "@nccl/logger/context";

import { LOG } from "../utils/util.logger.js";

const humanize = (times: string[]) => {
  const [delimiter, separator] = [",", "."];

  const orderTimes = times.map((v) =>
    v.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1" + delimiter)
  );

  return orderTimes.join(separator);
};

const time = (start: number) => {
  const delta = Date.now() - start;
  return humanize([
    delta < 1000 ? delta + "ms" : Math.round(delta / 1000) + "s",
  ]);
};

const colorStatus = (status: number) => {
  switch ((status / 100) | 0) {
    case 5: // red = error
      return `\x1b[31m${status}\x1b[0m`;
    case 4: // yellow = warning
      return `\x1b[33m${status}\x1b[0m`;
    case 3: // cyan = redirect
      return `\x1b[36m${status}\x1b[0m`;
    case 2: // green = success
      return `\x1b[32m${status}\x1b[0m`;
  }
  // Fallback to unsupported status code.
  // E.g.) Bun and Deno supports new Response with 101, but Node.js does not.
  // And those may evolve to accept more status.
  return `${status}`;
};

export const requestMiddleware = createMiddleware(async (c, next) => {
  const requestId = c.get("requestId");

  await logContext.run({ requestId }, async () => {
    const { method, url } = c.req;

    const printMethod = method.toUpperCase();
    const printPath = url.slice(url.indexOf("/", 8));
    LOG.feature("request:start").info(`${printMethod} ${printPath}`);

    const start = Date.now();

    await next();

    const printStatus = colorStatus(c.res.status);
    LOG.feature("request:end").info(
      `${printMethod} ${printPath} ${printStatus}`,
      {
        duration: time(start),
      }
    );
  });
});
