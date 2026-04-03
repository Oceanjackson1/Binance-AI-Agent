import dotenv from "dotenv";
import { ConfigurationError } from "./errors.js";
import type { BinanceConfig, Environment } from "./types.js";

dotenv.config();

export function loadConfig(): BinanceConfig {
  const apiKey = process.env.BINANCE_API_KEY ?? "";
  const apiSecret = process.env.BINANCE_API_SECRET ?? "";
  const environment = (process.env.BINANCE_ENVIRONMENT ?? "testnet") as Environment;
  const recvWindow = parseInt(process.env.BINANCE_RECV_WINDOW ?? "5000", 10);
  const logLevel = process.env.BINANCE_LOG_LEVEL ?? "info";

  if (environment !== "mainnet" && environment !== "testnet") {
    throw new ConfigurationError(
      `Invalid BINANCE_ENVIRONMENT: ${environment}. Must be "mainnet" or "testnet".`
    );
  }

  return { apiKey, apiSecret, environment, recvWindow, logLevel };
}

export function isModuleEnabled(moduleName: string): boolean {
  const envKey = `BINANCE_ENABLE_${moduleName.toUpperCase().replace(/-/g, "_")}`;
  const value = process.env[envKey];
  return value === undefined || value === "true";
}
