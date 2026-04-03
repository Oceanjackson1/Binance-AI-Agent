export interface TokenAuditResult {
  contractAddress: string;
  chain: string;
  tokenName: string;
  tokenSymbol: string;
  riskLevel: string;
  issues: TokenAuditIssue[];
}

export interface TokenAuditIssue {
  type: string;
  severity: string;
  description: string;
}

export interface HoneypotCheckResult {
  isHoneypot: boolean;
  contractAddress: string;
  chain: string;
  details: string;
}

export interface TokenAuditReport {
  contractAddress: string;
  chain: string;
  overallScore: number;
  sections: TokenAuditSection[];
}

export interface TokenAuditSection {
  name: string;
  score: number;
  findings: string[];
}
