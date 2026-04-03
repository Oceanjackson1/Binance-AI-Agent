export interface MarginOrder {
  symbol: string;
  orderId: number;
  clientOrderId: string;
  transactTime: number;
  price: string;
  origQty: string;
  executedQty: string;
  cummulativeQuoteQty: string;
  status: string;
  timeInForce: string;
  type: string;
  side: string;
  isIsolated: boolean;
}

export interface MarginAccount {
  borrowEnabled: boolean;
  marginLevel: string;
  totalAssetOfBtc: string;
  totalLiabilityOfBtc: string;
  totalNetAssetOfBtc: string;
  tradeEnabled: boolean;
  transferEnabled: boolean;
  userAssets: MarginUserAsset[];
}

export interface MarginUserAsset {
  asset: string;
  borrowed: string;
  free: string;
  interest: string;
  locked: string;
  netAsset: string;
}

export interface MarginTrade {
  commission: string;
  commissionAsset: string;
  id: number;
  isBestMatch: boolean;
  isBuyer: boolean;
  isMaker: boolean;
  orderId: number;
  price: string;
  qty: string;
  symbol: string;
  time: number;
  isIsolated: boolean;
}

export interface MarginBorrowRepay {
  tranId: number;
  clientTag: string;
}

export interface MarginMaxBorrowable {
  amount: string;
  borrowLimit: string;
}

export interface MarginMaxTransferable {
  amount: string;
}

export interface MarginInterestHistory {
  rows: MarginInterestRecord[];
  total: number;
}

export interface MarginInterestRecord {
  txId: number;
  interestAccuredTime: number;
  asset: string;
  rawAsset: string;
  principal: string;
  interest: string;
  interestRate: string;
  type: string;
  isolatedSymbol: string;
}
