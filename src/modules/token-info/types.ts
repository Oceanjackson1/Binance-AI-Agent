export interface TokenSearchResult {
  symbol: string;
  name: string;
  contractAddress: string;
  chain: string;
  price: string;
  marketCap: string;
}

export interface TokenDetail {
  symbol: string;
  name: string;
  contractAddress: string;
  chain: string;
  price: string;
  marketCap: string;
  totalSupply: string;
  circulatingSupply: string;
  holders: number;
}

export interface TokenKline {
  openTime: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  closeTime: number;
}

export interface MarketOverview {
  totalMarketCap: string;
  totalVolume24h: string;
  btcDominance: string;
}
