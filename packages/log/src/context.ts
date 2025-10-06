import { AsyncLocalStorage } from "node:async_hooks";

/**
 * Context values that persist throughout the lifetime
 * of a single request. These are automatically merged
 * into every log emitted during that request.
 */
export interface RequestLogContext {
  requestId?: string;
  [key: string]: unknown;
}

class LogContext extends AsyncLocalStorage<RequestLogContext> {
  set<K extends keyof RequestLogContext>(key: K, value: RequestLogContext[K]) {
    const store = this.getStore();
    if (store) store[key] = value;
  }

  get<K extends keyof RequestLogContext>(
    key: K
  ): RequestLogContext[K] | undefined {
    return this.getStore()?.[key];
  }
}

/**
 * Singleton AsyncLocalStorage instance used by the logger.
 *
 * Use:
 *   logContext.run({ requestId }, async () => { ... });
 *   const ctx = logContext.getStore(); // => RequestLogContext | undefined
 */
export const logContext = new LogContext();
