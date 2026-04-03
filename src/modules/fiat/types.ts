export interface FiatOrder {
  orderNo: string;
  fiatCurrency: string;
  indicatedAmount: string;
  amount: string;
  totalFee: string;
  method: string;
  status: string;
  createTime: number;
  updateTime: number;
}

export interface FiatPayment {
  orderNo: string;
  sourceAmount: string;
  fiatCurrency: string;
  obtainAmount: string;
  cryptoCurrency: string;
  totalFee: string;
  price: string;
  status: string;
  createTime: number;
  updateTime: number;
}
