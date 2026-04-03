export interface AlgoOrder {
  algoId: number;
  symbol: string;
  side: string;
  totalQty: string;
  executedQty: string;
  executedAmt: string;
  avgPrice: string;
  bookTime: number;
  endTime: number;
  algoStatus: string;
  algoType: string;
  urgency: string;
}

export interface AlgoSubOrder {
  algoId: number;
  orderId: number;
  orderStatus: string;
  executedQty: string;
  executedAmt: string;
  feeAmt: string;
  feeAsset: string;
  bookTime: number;
  avgPrice: string;
  side: string;
  symbol: string;
  subId: number;
  timeInForce: string;
  origQty: string;
}

export interface AlgoNewOrderResult {
  clientAlgoId: string;
  success: boolean;
  code: number;
  msg: string;
}

export interface AlgoCancelResult {
  algoId: number;
  success: boolean;
  code: number;
  msg: string;
}

export interface AlgoOpenOrdersResponse {
  total: number;
  orders: AlgoOrder[];
}

export interface AlgoHistoricalOrdersResponse {
  total: number;
  orders: AlgoOrder[];
}

export interface AlgoSubOrdersResponse {
  total: number;
  executedQty: string;
  executedAmt: string;
  subOrders: AlgoSubOrder[];
}
