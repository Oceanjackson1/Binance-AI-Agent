export interface UserAsset {
  asset: string;
  free: string;
  locked: string;
  freeze: string;
  withdrawing: string;
  ipoable: string;
  btcValuation: string;
}

export interface WalletBalance {
  activate: boolean;
  balance: string;
  walletName: string;
}

export interface AssetDetail {
  [asset: string]: {
    minWithdrawAmount: string;
    depositStatus: boolean;
    withdrawFee: number;
    withdrawStatus: boolean;
    depositTip?: string;
  };
}

export interface AssetTransferResponse {
  tranId: number;
}

export interface AssetTransferRecord {
  timestamp: number;
  asset: string;
  amount: string;
  type: string;
  status: string;
  tranId: number;
}

export interface AssetTransferHistory {
  total: number;
  rows: AssetTransferRecord[];
}

export interface DepositRecord {
  amount: string;
  coin: string;
  network: string;
  status: number;
  address: string;
  txId: string;
  insertTime: number;
  confirmTimes: string;
}

export interface WithdrawRecord {
  id: string;
  amount: string;
  coin: string;
  network: string;
  status: number;
  address: string;
  txId: string;
  applyTime: string;
  completeTime?: string;
}

export interface WithdrawResponse {
  id: string;
}

export interface DepositAddress {
  address: string;
  coin: string;
  tag: string;
  url: string;
}

export interface DustTransferResponse {
  totalServiceCharge: string;
  totalTransfered: string;
  transferResult: Array<{
    amount: string;
    fromAsset: string;
    transferedAmount: string;
    serviceChargeAmount: string;
  }>;
}
