export interface SimpleEarnFlexibleProduct {
  asset: string;
  latestAnnualPercentageRate: string;
  tierAnnualPercentageRate: Record<string, string>;
  airDropPercentageRate: string;
  canPurchase: boolean;
  canRedeem: boolean;
  isSoldOut: boolean;
  hot: boolean;
  minPurchaseAmount: string;
  productId: string;
  subscriptionStartTime: number;
  status: string;
}

export interface SimpleEarnLockedProduct {
  projectId: string;
  detail: {
    asset: string;
    rewardAsset: string;
    duration: number;
    renewable: boolean;
    apy: string;
  };
  quota: {
    totalPersonalQuota: string;
    minimum: string;
  };
}

export interface SimpleEarnSubscribeResponse {
  purchaseId: number;
  positionId: string;
  success: boolean;
}

export interface SimpleEarnRedeemResponse {
  redeemId: number;
  success: boolean;
}

export interface SimpleEarnFlexiblePosition {
  totalAmount: string;
  tierAnnualPercentageRate: Record<string, string>;
  latestAnnualPercentageRate: string;
  asset: string;
  canRedeem: boolean;
  productId: string;
  freeAmount: string;
  freezeAmount: string;
  redeemingAmount: string;
}

export interface SimpleEarnLockedPosition {
  positionId: string;
  projectId: string;
  asset: string;
  amount: string;
  purchaseTime: number;
  duration: number;
  accrualDays: number;
  rewardAsset: string;
  apy: string;
  isRenewable: boolean;
  isAutoRenew: boolean;
  redeemDate: string;
}

export interface SimpleEarnRewardRecord {
  asset: string;
  rewards: string;
  projectId: string;
  type: string;
  time: number;
}
