import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { BinanceClient } from "../../core/client.js";
import { success, error } from "../../utils/formatting.js";

export function registerTokenizedSecuritiesTools(
  server: McpServer,
  client: BinanceClient
): void {
  // 1. List tokenized securities
  server.tool(
    "tokenized_securities_list",
    "List available tokenized securities (stocks, ETFs, etc.)",
    {
      page: z
        .number()
        .optional()
        .describe("Page number (default 1)"),
      size: z
        .number()
        .optional()
        .describe("Number of results per page"),
    },
    async ({ page, size }) => {
      try {
        const data = await client.publicRequest(
          "GET",
          "/bapi/composite/v1/public/market/tokenized-securities/list",
          { page, size },
          "spot"
        );
        return success(data);
      } catch (err) {
        return error(err);
      }
    }
  );

  // 2. Get tokenized security detail
  server.tool(
    "tokenized_securities_get_detail",
    "Get detailed information about a specific tokenized security",
    {
      symbol: z.string().describe("Tokenized security symbol, e.g. TSLA, AAPL"),
    },
    async ({ symbol }) => {
      try {
        const data = await client.publicRequest(
          "GET",
          "/bapi/composite/v1/public/market/tokenized-securities/detail",
          { symbol },
          "spot"
        );
        return success(data);
      } catch (err) {
        return error(err);
      }
    }
  );

  // 3. Get tokenized security market data
  server.tool(
    "tokenized_securities_get_market_data",
    "Get real-time market data for a tokenized security",
    {
      symbol: z.string().describe("Tokenized security symbol, e.g. TSLA, AAPL"),
    },
    async ({ symbol }) => {
      try {
        const data = await client.publicRequest(
          "GET",
          "/bapi/composite/v1/public/market/tokenized-securities/market-data",
          { symbol },
          "spot"
        );
        return success(data);
      } catch (err) {
        return error(err);
      }
    }
  );
}
