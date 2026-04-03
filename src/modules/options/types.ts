export interface OptionsOrder {
  orderId: number;
  symbol: string;
  status: string;
  clientOrderId: string;
  price: string;
  quantity: string;
  executedQty: string;
  fee: string;
  timeInForce: string;
  type: string;
  reduceOnly: boolean;
  side: string;
  createTime: number;
  updateTime: number;
}

export interface OptionsPosition {
  symbol: string;
  side: string;
  quantity: string;
  entryPrice: string;
  markPrice: string;
  unrealizedPnl: string;
  ror: string;
  expiryDate: number;
}

export interface OptionsAccount {
  asset: string;
  marginBalance: string;
  equity: string;
  availableBalance: string;
  maxWithdrawAmount: string;
  unrealizedPnl: string;
}

export interface OptionsTrade {
  id: number;
  tradeId: number;
  orderId: number;
  symbol: string;
  price: string;
  quantity: string;
  fee: string;
  realizedProfit: string;
  side: string;
  type: string;
  time: number;
}
