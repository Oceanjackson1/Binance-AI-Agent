const logLevel = process.env.BINANCE_LOG_LEVEL ?? "info";

const LEVELS: Record<string, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
};

function shouldLog(level: string): boolean {
  return (LEVELS[level] ?? 1) >= (LEVELS[logLevel] ?? 1);
}

export const logger = {
  debug(msg: string): void {
    if (shouldLog("debug")) console.error(`[DEBUG] ${msg}`);
  },
  info(msg: string): void {
    if (shouldLog("info")) console.error(`[INFO] ${msg}`);
  },
  warn(msg: string): void {
    if (shouldLog("warn")) console.error(`[WARN] ${msg}`);
  },
  error(msg: string): void {
    if (shouldLog("error")) console.error(`[ERROR] ${msg}`);
  },
};
