import type { Environment, ServiceType } from "./types.js";

const ENDPOINTS: Record<ServiceType, Record<Environment, string>> = {
  spot: {
    mainnet: "https://api.binance.com",
    testnet: "https://testnet.binance.vision",
  },
  usds_futures: {
    mainnet: "https://fapi.binance.com",
    testnet: "https://testnet.binancefuture.com",
  },
  coin_futures: {
    mainnet: "https://dapi.binance.com",
    testnet: "https://testnet.binancefuture.com",
  },
  options: {
    mainnet: "https://eapi.binance.com",
    testnet: "https://testnet.binanceops.com",
  },
  portfolio_margin: {
    mainnet: "https://papi.binance.com",
    testnet: "https://testnet.binance.vision",
  },
  sapi: {
    mainnet: "https://api.binance.com",
    testnet: "https://testnet.binance.vision",
  },
};

export function getBaseUrl(service: ServiceType, environment: Environment): string {
  return ENDPOINTS[service][environment];
}
