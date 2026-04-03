export interface SmartMoneySignal {
  address: string;
  chain: string;
  action: string;
  token: string;
  amount: string;
  timestamp: number;
}

export interface WhaleAlert {
  hash: string;
  from: string;
  to: string;
  token: string;
  amount: string;
  chain: string;
  timestamp: number;
}

export interface TokenSignal {
  symbol: string;
  signalType: string;
  strength: string;
  description: string;
  timestamp: number;
}

export interface HotSignal {
  symbol: string;
  signalType: string;
  score: number;
  description: string;
}
