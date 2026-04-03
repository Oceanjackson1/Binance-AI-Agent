export interface TokenizedSecurity {
  symbol: string;
  name: string;
  underlyingAsset: string;
  price: string;
  change24h: string;
}

export interface TokenizedSecurityDetail {
  symbol: string;
  name: string;
  underlyingAsset: string;
  description: string;
  price: string;
  marketCap: string;
  volume24h: string;
}

export interface TokenizedSecurityMarketData {
  symbol: string;
  price: string;
  open: string;
  high: string;
  low: string;
  volume: string;
  change24h: string;
}
