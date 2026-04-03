export interface CoinFuturesTickerPrice {
  symbol: string;
  ps: string;
  price: string;
  time: number;
}

export interface CoinFuturesTickerStats {
  symbol: string;
  priceChange: string;
  priceChangePercent: string;
  weightedAvgPrice: string;
  lastPrice: string;
  lastQty: string;
  openPrice: string;
  highPrice: string;
  lowPrice: string;
  volume: string;
  baseVolume: string;
  openTime: number;
  closeTime: number;
  count: number;
}

export interface CoinFuturesOrder {
  orderId: number;
  symbol: string;
  pair: string;
  status: string;
  clientOrderId: string;
  price: string;
  avgPrice: string;
  origQty: string;
  executedQty: string;
  cumBase: string;
  timeInForce: string;
  type: string;
  reduceOnly: boolean;
  side: string;
  positionSide: string;
  origType: string;
  updateTime: number;
}

export interface CoinFuturesAccount {
  totalWalletBalance: string;
  totalUnrealizedProfit: string;
  totalMarginBalance: string;
  availableBalance: string;
  totalCrossWalletBalance: string;
  totalCrossUnPnl: string;
}

export interface CoinFuturesBalance {
  accountAlias: string;
  asset: string;
  balance: string;
  crossWalletBalance: string;
  availableBalance: string;
  maxWithdrawAmount: string;
}

export interface CoinFuturesPosition {
  symbol: string;
  positionAmt: string;
  entryPrice: string;
  markPrice: string;
  unRealizedProfit: string;
  liquidationPrice: string;
  leverage: string;
  marginType: string;
  positionSide: string;
}

export interface CoinFuturesLeverageResponse {
  leverage: number;
  maxQty: string;
  symbol: string;
}
