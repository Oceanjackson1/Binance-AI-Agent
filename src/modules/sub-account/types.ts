export interface SubAccountCreateResponse {
  email: string;
}

export interface SubAccountInfo {
  email: string;
  isFreeze: boolean;
  createTime: number;
  isManagedSubAccount: boolean;
  isAssetManagementSubAccount: boolean;
}

export interface SubAccountListResponse {
  subAccounts: SubAccountInfo[];
}

export interface SubAccountAsset {
  asset: string;
  free: number;
  locked: number;
}

export interface SubAccountAssetsResponse {
  balances: SubAccountAsset[];
}

export interface SubAccountTransferResponse {
  tranId: number;
  clientTranId?: string;
}

export interface SubAccountTransferRecord {
  tranId: number;
  fromEmail: string;
  toEmail: string;
  asset: string;
  amount: string;
  fromAccountType: string;
  toAccountType: string;
  status: string;
  createTimeStamp: number;
}

export interface SubAccountTransferHistory {
  result: SubAccountTransferRecord[];
  totalCount: number;
}

export interface SubAccountFuturesEnableResponse {
  email: string;
  isFuturesEnabled: boolean;
}

export interface SubAccountMarginEnableResponse {
  email: string;
  isMarginEnabled: boolean;
}

export interface SubAccountStatus {
  email: string;
  isSubUserEnabled: boolean;
  isUserActive: boolean;
  insertTime: number;
  isMarginEnabled: boolean;
  isFutureEnabled: boolean;
  mobile: number;
}
