export interface P2POrderRecord {
  orderNumber: string;
  advNo: string;
  tradeType: string;
  asset: string;
  fiat: string;
  fiatSymbol: string;
  amount: string;
  totalPrice: string;
  unitPrice: string;
  orderStatus: string;
  createTime: number;
  commission: string;
  counterPartNickName: string;
}

export interface P2PAd {
  advNo: string;
  tradeType: string;
  asset: string;
  fiatUnit: string;
  price: string;
  surplusAmount: string;
  maxSingleTransAmount: string;
  minSingleTransAmount: string;
  tradeMethods: Array<{
    identifier: string;
    tradeMethodName: string;
  }>;
  advertiserNickName: string;
}

export interface P2PTradeDetail {
  orderNumber: string;
  advNo: string;
  tradeType: string;
  asset: string;
  fiat: string;
  totalPrice: string;
  unitPrice: string;
  amount: string;
  orderStatus: string;
  createTime: number;
}
