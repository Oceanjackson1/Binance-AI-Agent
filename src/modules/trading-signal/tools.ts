import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { BinanceClient } from "../../core/client.js";
import { success, error } from "../../utils/formatting.js";

export function registerTradingSignalTools(
  server: McpServer,
  client: BinanceClient
): void {
  // 1. Get smart money movements
  server.tool(
    "trading_signal_get_smart_money",
    "Get smart money wallet movements and trading activity",
    {
      chain: z
        .string()
        .optional()
        .describe("Blockchain network filter, e.g. ETH, BSC, SOL"),
      limit: z
        .number()
        .optional()
        .describe("Number of results to return"),
    },
    async ({ chain, limit }) => {
      try {
        const data = await client.publicRequest(
          "GET",
          "/bapi/composite/v1/public/market/signal/smart-money",
          { chain, limit },
          "spot"
        );
        return success(data);
      } catch (err) {
        return error(err);
      }
    }
  );

  // 2. Get whale alerts
  server.tool(
    "trading_signal_get_whale_alerts",
    "Get whale transfer alerts for large token movements",
    {
      chain: z
        .string()
        .optional()
        .describe("Blockchain network filter, e.g. ETH, BSC, SOL"),
      limit: z
        .number()
        .optional()
        .describe("Number of results to return"),
    },
    async ({ chain, limit }) => {
      try {
        const data = await client.publicRequest(
          "GET",
          "/bapi/composite/v1/public/market/signal/whale-alerts",
          { chain, limit },
          "spot"
        );
        return success(data);
      } catch (err) {
        return error(err);
      }
    }
  );

  // 3. Get token-specific signals
  server.tool(
    "trading_signal_get_token_signals",
    "Get trading signals for a specific token",
    {
      symbol: z
        .string()
        .optional()
        .describe("Token symbol, e.g. BTC, ETH"),
      contractAddress: z
        .string()
        .optional()
        .describe("Token contract address"),
    },
    async ({ symbol, contractAddress }) => {
      try {
        const data = await client.publicRequest(
          "GET",
          "/bapi/composite/v1/public/market/signal/token",
          { symbol, contractAddress },
          "spot"
        );
        return success(data);
      } catch (err) {
        return error(err);
      }
    }
  );

  // 4. Get hot signals
  server.tool(
    "trading_signal_get_hot_signals",
    "Get the hottest/most popular trading signals right now",
    {
      limit: z
        .number()
        .optional()
        .describe("Number of results to return"),
    },
    async ({ limit }) => {
      try {
        const data = await client.publicRequest(
          "GET",
          "/bapi/composite/v1/public/market/signal/hot",
          { limit },
          "spot"
        );
        return success(data);
      } catch (err) {
        return error(err);
      }
    }
  );
}
