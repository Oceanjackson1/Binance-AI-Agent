export interface VipLoanBorrowResponse {
  loanAccountId: string;
  orderId: string;
  requestId: string;
  loanCoin: string;
  loanAmount: string;
  collateralAccountId: string;
  collateralCoin: string;
  loanTerm: number;
}

export interface VipLoanRepayResponse {
  loanCoin: string;
  repayAmount: string;
  remainingPrincipal: string;
  remainingInterest: string;
  collateralCoin: string;
  currentCollateralRate: string;
  repayStatus: string;
}

export interface VipLoanRenewResponse {
  loanAccountId: string;
  orderId: string;
  loanCoin: string;
  loanAmount: string;
  loanTerm: number;
}

export interface VipLoanOrder {
  orderId: number;
  loanCoin: string;
  totalDebt: string;
  residualInterest: string;
  collateralAccountId: string;
  collateralCoin: string;
  collateralValue: string;
  currentCollateralRate: string;
  expirationTime: number;
  loanDate: string;
  loanRate: string;
  loanTerm: number;
}

export interface VipLoanRepayRecord {
  loanCoin: string;
  repayAmount: string;
  collateralCoin: string;
  repayStatus: string;
  repayTime: number;
  orderId: number;
}

export interface VipLoanCollateralAccount {
  collateralAccountId: string;
  collateralCoin: string;
  collateralValue: string;
}

export interface VipLoanLoanableData {
  loanCoin: string;
  _flexibleDailyInterestRate: string;
  _flexibleYearlyInterestRate: string;
  _fixedAnnualInterestRate: string;
  vipLevel: number;
}

export interface VipLoanInterestRate {
  asset: string;
  dailyInterestRate: string;
  annualInterestRate: string;
}
