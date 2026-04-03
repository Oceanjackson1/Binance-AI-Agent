export interface AddressPortfolio {
  address: string;
  chain: string;
  totalValue: string;
  tokens: AddressToken[];
}

export interface AddressToken {
  symbol: string;
  balance: string;
  value: string;
}

export interface AddressTransaction {
  hash: string;
  from: string;
  to: string;
  value: string;
  timestamp: number;
}

export interface AddressAnalysis {
  address: string;
  chain: string;
  riskLevel: string;
  labels: string[];
}
