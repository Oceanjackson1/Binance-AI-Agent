export interface OnchainPayPaymentMethod {
  paymentMethod: string;
  displayName: string;
}

export interface OnchainPayTradingPair {
  fiat: string;
  crypto: string;
  minAmount: string;
  maxAmount: string;
}

export interface OnchainPayQuote {
  quoteId: string;
  fiat: string;
  crypto: string;
  fiatAmount: string;
  cryptoAmount: string;
  price: string;
  expireTime: number;
}

export interface OnchainPayOrder {
  orderId: string;
  status: string;
}
