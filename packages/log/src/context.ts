/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Isomorphic context storage for @nccl/logger.
 * Works in both Node (AsyncLocalStorage) and browser (simple stack).
 */
export interface RequestLogContext {
  requestId?: string;
  [key: string]: unknown;
}

type NodeALS<T> = {
  run(store: T, fn: () => any): any;
  getStore(): T | undefined;
};

function createContextStore<T extends object>() {
  // Runtime detection only, no static imports:
  const NodeAsyncLocalStorage: NodeALS<T> | undefined =
    typeof globalThis !== "undefined" && (globalThis as any).AsyncLocalStorage
      ? new (globalThis as any).AsyncLocalStorage()
      : undefined;

  const stack: T[] = [];

  return {
    run<R>(context: T, fn: () => R): R {
      if (NodeAsyncLocalStorage) return NodeAsyncLocalStorage.run(context, fn);
      stack.push(context);
      try {
        return fn();
      } finally {
        stack.pop();
      }
    },
    getStore(): T | undefined {
      return NodeAsyncLocalStorage
        ? NodeAsyncLocalStorage.getStore()
        : stack.at(-1);
    },
  };
}

export const logContext = createContextStore<RequestLogContext>();
