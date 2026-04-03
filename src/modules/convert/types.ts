export interface ConvertPair {
  fromAsset: string;
  toAsset: string;
  fromAssetMinAmount: string;
  fromAssetMaxAmount: string;
  toAssetMinAmount: string;
  toAssetMaxAmount: string;
}

export interface ConvertQuote {
  quoteId: string;
  ratio: string;
  inverseRatio: string;
  validTimestamp: number;
  toAmount: string;
  fromAmount: string;
}

export interface ConvertAcceptQuoteResponse {
  orderId: string;
  createTime: number;
  orderStatus: string;
}

export interface ConvertTradeRecord {
  quoteId: string;
  orderId: number;
  orderStatus: string;
  fromAsset: string;
  fromAmount: string;
  toAsset: string;
  toAmount: string;
  ratio: string;
  inverseRatio: string;
  createTime: number;
}

export interface ConvertLimitOrderResponse {
  orderId: number;
  status: string;
}

export interface ConvertCancelLimitResponse {
  orderId: number;
  status: string;
}
