export type Environment = "mainnet" | "testnet";

export type ServiceType =
  | "spot"
  | "usds_futures"
  | "coin_futures"
  | "options"
  | "portfolio_margin"
  | "sapi";

export enum OrderSide {
  BUY = "BUY",
  SELL = "SELL",
}

export enum OrderType {
  LIMIT = "LIMIT",
  MARKET = "MARKET",
  STOP_LOSS = "STOP_LOSS",
  STOP_LOSS_LIMIT = "STOP_LOSS_LIMIT",
  TAKE_PROFIT = "TAKE_PROFIT",
  TAKE_PROFIT_LIMIT = "TAKE_PROFIT_LIMIT",
  LIMIT_MAKER = "LIMIT_MAKER",
}

export enum TimeInForce {
  GTC = "GTC",
  IOC = "IOC",
  FOK = "FOK",
  GTX = "GTX",
  GTD = "GTD",
}

export enum FuturesOrderType {
  LIMIT = "LIMIT",
  MARKET = "MARKET",
  STOP = "STOP",
  STOP_MARKET = "STOP_MARKET",
  TAKE_PROFIT = "TAKE_PROFIT",
  TAKE_PROFIT_MARKET = "TAKE_PROFIT_MARKET",
  TRAILING_STOP_MARKET = "TRAILING_STOP_MARKET",
}

export enum MarginType {
  ISOLATED = "ISOLATED",
  CROSSED = "CROSSED",
}

export enum PositionSide {
  BOTH = "BOTH",
  LONG = "LONG",
  SHORT = "SHORT",
}

export interface BinanceConfig {
  apiKey: string;
  apiSecret: string;
  environment: Environment;
  recvWindow: number;
  logLevel: string;
}
