export interface MemeToken {
  contractAddress: string;
  chain: string;
  name: string;
  symbol: string;
  price: string;
  change24h: string;
  volume24h: string;
  marketCap: string;
}

export interface MemeTokenDetail {
  contractAddress: string;
  chain: string;
  name: string;
  symbol: string;
  price: string;
  totalSupply: string;
  holders: number;
  liquidity: string;
  description: string;
}

export interface MemeTradeResult {
  orderId: string;
  status: string;
  contractAddress: string;
  chain: string;
  amount: string;
  price: string;
}

export interface MemePortfolioEntry {
  contractAddress: string;
  chain: string;
  symbol: string;
  balance: string;
  value: string;
  pnl: string;
}
