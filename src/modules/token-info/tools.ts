import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { BinanceClient } from "../../core/client.js";
import { success, error } from "../../utils/formatting.js";

export function registerTokenInfoTools(
  server: McpServer,
  client: BinanceClient
): void {
  // 1. Search for tokens by keyword
  server.tool(
    "token_info_search",
    "Search for tokens by keyword (name, symbol, or contract address)",
    {
      keyword: z.string().describe("Search keyword, e.g. BTC, Ethereum, or a contract address"),
    },
    async ({ keyword }) => {
      try {
        const data = await client.publicRequest(
          "GET",
          "/bapi/composite/v1/public/market/token/search",
          { keyword },
          "spot"
        );
        return success(data);
      } catch (err) {
        return error(err);
      }
    }
  );

  // 2. Get token detail
  server.tool(
    "token_info_get_detail",
    "Get detailed information about a specific token",
    {
      symbol: z
        .string()
        .optional()
        .describe("Token symbol, e.g. BTC"),
      contractAddress: z
        .string()
        .optional()
        .describe("Token contract address"),
    },
    async ({ symbol, contractAddress }) => {
      try {
        const data = await client.publicRequest(
          "GET",
          "/bapi/composite/v1/public/market/token/detail",
          { symbol, contractAddress },
          "spot"
        );
        return success(data);
      } catch (err) {
        return error(err);
      }
    }
  );

  // 3. Get token price history (kline)
  server.tool(
    "token_info_get_price_history",
    "Get token price history (kline/candlestick data)",
    {
      symbol: z.string().describe("Token symbol, e.g. BTCUSDT"),
      interval: z
        .string()
        .describe("Kline interval, e.g. 1m, 5m, 1h, 1d"),
      limit: z
        .number()
        .optional()
        .describe("Number of data points to return"),
    },
    async ({ symbol, interval, limit }) => {
      try {
        const data = await client.publicRequest(
          "GET",
          "/bapi/composite/v1/public/market/token/kline",
          { symbol, interval, limit },
          "spot"
        );
        return success(data);
      } catch (err) {
        return error(err);
      }
    }
  );

  // 4. Get market overview
  server.tool(
    "token_info_get_market_overview",
    "Get overall crypto market overview (total market cap, volume, BTC dominance)",
    {},
    async () => {
      try {
        const data = await client.publicRequest(
          "GET",
          "/bapi/composite/v1/public/market/overview",
          {},
          "spot"
        );
        return success(data);
      } catch (err) {
        return error(err);
      }
    }
  );
}
