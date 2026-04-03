export interface AlphaToken {
  symbol: string;
  name: string;
  network: string;
  contractAddress: string;
  status: string;
}

export interface AlphaTokenDetail {
  symbol: string;
  name: string;
  network: string;
  contractAddress: string;
  status: string;
  marketCap: string;
  price: string;
  volume24h: string;
}

export interface AlphaOrder {
  orderId: number;
  symbol: string;
  side: string;
  quantity: string;
  quoteOrderQty: string;
  price: string;
  status: string;
  time: number;
  updateTime: number;
}

export interface AlphaTokensResponse {
  total: number;
  tokens: AlphaToken[];
}

export interface AlphaOrdersResponse {
  total: number;
  orders: AlphaOrder[];
}
