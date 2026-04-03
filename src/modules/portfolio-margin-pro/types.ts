export interface PortfolioMarginProAccount {
  uniMMR: string;
  accountEquity: string;
  actualEquity: string;
  accountMaintMargin: string;
  accountStatus: string;
}

export interface PortfolioMarginProBalance {
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

export interface PortfolioMarginProOrder {
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

export interface PortfolioMarginProPosition {
  symbol: string;
  positionAmt: string;
  entryPrice: string;
  markPrice: string;
  unRealizedProfit: string;
  liquidationPrice: string;
  leverage: string;
  positionSide: string;
}

export interface PortfolioMarginProLeverageResponse {
  leverage: number;
  maxQty: string;
  symbol: string;
}
