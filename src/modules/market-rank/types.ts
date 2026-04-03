export interface MarketRankEntry {
  symbol: string;
  name: string;
  price: string;
  change24h: string;
  volume24h: string;
  marketCap: string;
  rank: number;
}

export interface MarketGainerLoser {
  symbol: string;
  name: string;
  price: string;
  changePercent: string;
  volume: string;
}

export interface MarketVolumeEntry {
  symbol: string;
  name: string;
  volume24h: string;
  price: string;
}
