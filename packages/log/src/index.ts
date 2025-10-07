import { logContext } from "./context.js";

export type LogLevel = "debug" | "info" | "warn" | "error";

export interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: number;
  namespace?: string[];
  context: Record<string, unknown>;
}

export interface LoggerPlugin {
  name: string;
  init?(logger: Logger): void;
  onLog?(entry: LogEntry): void;
}

export interface LoggerOptions {
  level?: LogLevel;
  plugins?: LoggerPlugin[];
  namespace?: string[];
  bufferSize?: number;
}

const LEVEL_PRIORITY: Record<LogLevel, number> = {
  debug: 10,
  info: 20,
  warn: 30,
  error: 40,
};

const COLORS = [
  "#e6194b",
  "#3cb44b",
  "#ffe119",
  "#4363d8",
  "#f58231",
  "#911eb4",
  "#46f0f0",
  "#f032e6",
  "#bcf60c",
  "#fabebe",
  "#008080",
  "#e6beff",
  "#9a6324",
  "#fffac8",
  "#800000",
  "#aaffc3",
];

function colorForNamespace(ns: string[]): string {
  const key = ns.join(":");
  let hash = 0;
  for (let i = 0; i < key.length; i++) {
    hash = (hash << 5) - hash + key.charCodeAt(i);
    hash |= 0;
  }
  return COLORS[Math.abs(hash) % COLORS.length];
}

function coerceToLevel(
  level: string | undefined = "",
  fallback: LogLevel
): LogLevel {
  const levels = Object.keys(LEVEL_PRIORITY);
  const levelInLevels = levels.indexOf(level);
  if (levelInLevels !== -1) {
    return levels[levelInLevels] as LogLevel;
  }
  return fallback;
}

export class Logger {
  #level: LogLevel;
  #plugins: LoggerPlugin[] = [];
  #namespace: string[];
  #buffer: LogEntry[] = [];
  #bufferSize: number;
  #contextProviders: Array<() => Record<string, unknown>> = [];

  constructor(options: LoggerOptions = {}) {
    // Set the level and override if a env variable exists
    this.#level = coerceToLevel(options.level, "info");
    if (typeof window === "undefined") {
      this.#level = coerceToLevel(process.env.LOG_LEVEL, this.#level);
    } else {
      this.#level = process.env.NODE_ENV === "development" ? "debug" : "info";
    }
    this.#namespace = options.namespace ?? [];
    this.#bufferSize = options.bufferSize ?? 500;

    if (options.plugins) {
      options.plugins.forEach((p) => this.use(p));
    }

    // Attach root logger to window for browser
    if (typeof window !== "undefined" && this.#namespace.length === 0) {
      window.__NCCL_LOGS__ = this;
    }
  }

  setLevel(level: LogLevel) {
    this.#level = level;
  }

  use(plugin: LoggerPlugin) {
    this.#plugins.push(plugin);
    plugin.init?.(this);
  }

  addContextProvider(fn: () => Record<string, unknown>) {
    this.#contextProviders.push(fn);
  }

  async #enrichContext(ctx?: Record<string, unknown>) {
    const asyncCtx = logContext.getStore?.() ?? {};

    const globalCtx = this.#contextProviders.reduce<Record<string, unknown>>(
      (acc, fn) => Object.assign(acc, fn()),
      {}
    );
    return { ...asyncCtx, ...globalCtx, ...ctx };
  }

  feature(name: string): Logger {
    const child = new Logger({
      level: this.#level,
      plugins: this.#plugins,
      namespace: [...this.#namespace, name],
      bufferSize: this.#bufferSize,
    });

    child.#contextProviders = [...this.#contextProviders];

    if (typeof window !== "undefined") {
      const root = window.__NCCL_LOGS__;
      if (root && this.#namespace.length === 0) {
        root[name] = child;
      }
    }

    return child;
  }

  private shouldLog(level: LogLevel) {
    return LEVEL_PRIORITY[level] >= LEVEL_PRIORITY[this.#level];
  }

  private store(entry: LogEntry) {
    this.#buffer.push(entry);
    if (this.#buffer.length > this.#bufferSize) {
      this.#buffer.shift();
    }
  }

  private async emit(
    level: LogLevel,
    message: string,
    context?: Record<string, unknown>
  ) {
    if (!this.shouldLog(level)) return;

    const enrichedCtx = await this.#enrichContext(context);

    const entry: LogEntry = {
      level,
      message,
      timestamp: Date.now(),
      namespace: this.#namespace,
      context: enrichedCtx,
    };

    this.store(entry);

    // --- Client ---
    if (typeof window !== "undefined") {
      // Browser: colorful
      const namespacePrefix = entry.namespace?.length
        ? entry.namespace.join(":")
        : "root";
      const nsColor = colorForNamespace(entry.namespace ?? []);
      const levelLabel = `[${entry.level.toUpperCase()}]`;
      const fn = console[level] ?? console.log;
      fn(
        `%c[${namespacePrefix}]%c ${levelLabel} ${entry.message}`,
        `color:${nsColor}; font-weight:bold`,
        "color:inherit",
        entry.context
      );
      return;
    }

    // --- Server ---

    if (process.env.NODE_ENV === "development") {
      // Pretty dev formatting with ANSI colors
      const colorLevel: Record<LogLevel, string> = {
        debug: "\x1b[95m", // bright magenta
        info: "\x1b[36m", // cyan
        warn: "\x1b[33m", // yellow
        error: "\x1b[31m", // red
      };
      const colorBold = "\x1b[1m";
      const colorReset = "\x1b[0m";
      const colorDim = "\x1b[2m"; // dimmed style for message

      function colorize(color: keyof typeof colorLevel | "dim", ctx: string) {
        if (color === "dim") {
          return `${colorDim}${ctx}${colorReset}`;
        }
        return `${colorBold}${colorLevel[level]}${ctx}${colorReset}`;
      }

      // Pretty format
      const printNamespace = entry.namespace?.length
        ? entry.namespace.join(":")
        : "root";
      const timestamp = new Date(entry.timestamp).toISOString();
      const printTimestamp = colorize("dim", timestamp);
      const fn = console[level] ?? console.log;
      const printLevel = colorize(level, `${level.toUpperCase()}`);
      const printMessage = message;
      const printContext =
        Object.keys(entry.context).length > 0
          ? colorize("dim", JSON.stringify(entry.context))
          : "";

      fn(
        `${printTimestamp} [${printNamespace}] ${printLevel} - ${printMessage} ${printContext}`
      );
    } else {
      // JSON for production
      process.stdout.write(JSON.stringify(entry) + "\n");
    }

    this.#plugins.forEach((plugin) => plugin.onLog?.(entry));
  }

  // API
  debug(msg: string, ctx?: Record<string, unknown>) {
    this.emit("debug", msg, ctx);
  }
  info(msg: string, ctx?: Record<string, unknown>) {
    this.emit("info", msg, ctx);
  }
  warn(msg: string, ctx?: Record<string, unknown>) {
    this.emit("warn", msg, ctx);
  }
  error(msg: string, ctx?: Record<string, unknown>) {
    this.emit("error", msg, ctx);
  }

  // Access log buffer
  getLogs(): LogEntry[] {
    return [...this.#buffer];
  }
  clearLogs() {
    this.#buffer.length = 0;
  }

  // Example: send buffer to Sentry
  flushToSentry(send: (logs: LogEntry[]) => void) {
    send(this.getLogs());
    this.clearLogs();
  }
}
