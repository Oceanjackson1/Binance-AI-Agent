export interface PortfolioMarginAccount {
  uniMMR: string;
  accountEquity: string;
  actualEquity: string;
  accountMaintMargin: string;
  accountStatus: string;
}

export interface PortfolioMarginBalance {
  asset: string;
  totalWalletBalance: string;
  crossMarginAsset: string;
  crossMarginBorrowed: string;
  crossMarginFree: string;
  crossMarginInterest: string;
  crossMarginLockedAmount: string;
  umWalletBalance: string;
  umUnrealizedPNL: string;
  cmWalletBalance: string;
  cmUnrealizedPNL: string;
  updateTime: number;
}

export interface PortfolioMarginOrder {
  orderId: number;
  symbol: string;
  status: string;
  clientOrderId: string;
  price: string;
  avgPrice: string;
  origQty: string;
  executedQty: string;
  cumQuote: string;
  timeInForce: string;
  type: string;
  reduceOnly: boolean;
  side: string;
  positionSide: string;
  origType: string;
  updateTime: number;
}

export interface PortfolioMarginPosition {
  symbol: string;
  positionAmt: string;
  entryPrice: string;
  markPrice: string;
  unRealizedProfit: string;
  liquidationPrice: string;
  leverage: string;
  positionSide: string;
}

export interface PortfolioMarginLeverageResponse {
  leverage: number;
  maxQty: string;
  symbol: string;
}

export interface PortfolioMarginMaxBorrowable {
  amount: string;
  borrowLimit: string;
}
