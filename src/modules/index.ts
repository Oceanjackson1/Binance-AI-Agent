import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { BinanceClient } from "../core/client.js";
import { isModuleEnabled } from "../core/config.js";
import { logger } from "../utils/logger.js";

import { registerSpotModule } from "./spot/index.js";
import { registerUsdsFuturesModule } from "./usds-futures/index.js";
import { registerCoinFuturesModule } from "./coin-futures/index.js";
import { registerOptionsModule } from "./options/index.js";
import { registerPortfolioMarginModule } from "./portfolio-margin/index.js";
import { registerPortfolioMarginProModule } from "./portfolio-margin-pro/index.js";
import { registerMarginModule } from "./margin/index.js";
import { registerAlgoModule } from "./algo/index.js";
import { registerAlphaModule } from "./alpha/index.js";
import { registerAssetsModule } from "./assets/index.js";
import { registerSubAccountModule } from "./sub-account/index.js";
import { registerSimpleEarnModule } from "./simple-earn/index.js";
import { registerVipLoanModule } from "./vip-loan/index.js";
import { registerConvertModule } from "./convert/index.js";
import { registerP2pModule } from "./p2p/index.js";
import { registerFiatModule } from "./fiat/index.js";
import { registerOnchainPayModule } from "./onchain-pay/index.js";
import { registerTokenInfoModule } from "./token-info/index.js";
import { registerAddressInfoModule } from "./address-info/index.js";
import { registerTokenAuditModule } from "./token-audit/index.js";
import { registerTokenizedSecuritiesModule } from "./tokenized-securities/index.js";
import { registerMarketRankModule } from "./market-rank/index.js";
import { registerMemeRushModule } from "./meme-rush/index.js";
import { registerTradingSignalModule } from "./trading-signal/index.js";
import { registerSquarePostModule } from "./square-post/index.js";
import { registerGitHubModule } from "./github/index.js";

interface ModuleEntry {
  name: string;
  register: (server: McpServer, client: BinanceClient) => void;
}

const modules: ModuleEntry[] = [
  { name: "spot", register: registerSpotModule },
  { name: "usds-futures", register: registerUsdsFuturesModule },
  { name: "coin-futures", register: registerCoinFuturesModule },
  { name: "options", register: registerOptionsModule },
  { name: "portfolio-margin", register: registerPortfolioMarginModule },
  { name: "portfolio-margin-pro", register: registerPortfolioMarginProModule },
  { name: "margin", register: registerMarginModule },
  { name: "algo", register: registerAlgoModule },
  { name: "alpha", register: registerAlphaModule },
  { name: "assets", register: registerAssetsModule },
  { name: "sub-account", register: registerSubAccountModule },
  { name: "simple-earn", register: registerSimpleEarnModule },
  { name: "vip-loan", register: registerVipLoanModule },
  { name: "convert", register: registerConvertModule },
  { name: "p2p", register: registerP2pModule },
  { name: "fiat", register: registerFiatModule },
  { name: "onchain-pay", register: registerOnchainPayModule },
  { name: "token-info", register: registerTokenInfoModule },
  { name: "address-info", register: registerAddressInfoModule },
  { name: "token-audit", register: registerTokenAuditModule },
  { name: "tokenized-securities", register: registerTokenizedSecuritiesModule },
  { name: "market-rank", register: registerMarketRankModule },
  { name: "meme-rush", register: registerMemeRushModule },
  { name: "trading-signal", register: registerTradingSignalModule },
  { name: "square-post", register: registerSquarePostModule },
];

export function registerAllModules(server: McpServer, client: BinanceClient): void {
  let count = 0;
  for (const mod of modules) {
    if (isModuleEnabled(mod.name)) {
      mod.register(server, client);
      count++;
      logger.debug(`Registered module: ${mod.name}`);
    } else {
      logger.info(`Module disabled: ${mod.name}`);
    }
  }
  // GitHub module (no BinanceClient needed)
  if (isModuleEnabled("github")) {
    registerGitHubModule(server);
    count++;
    logger.debug("Registered module: github");
  }

  logger.info(`Registered ${count} modules`);
}
