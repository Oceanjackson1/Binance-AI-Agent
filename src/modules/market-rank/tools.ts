import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { BinanceClient } from "../../core/client.js";
import { success, error } from "../../utils/formatting.js";

export function registerMarketRankTools(
  server: McpServer,
  client: BinanceClient
): void {
  // 1. Get trending tokens
  server.tool(
    "market_rank_get_trending",
    "Get currently trending tokens by popularity",
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
          "/bapi/composite/v1/public/market/rank/trending",
          { limit },
          "spot"
        );
        return success(data);
      } catch (err) {
        return error(err);
      }
    }
  );

  // 2. Get top gainers
  server.tool(
    "market_rank_get_gainers",
    "Get top gaining tokens by price change percentage",
    {
      limit: z
        .number()
        .optional()
        .describe("Number of results to return"),
      period: z
        .string()
        .optional()
        .describe("Time period, e.g. 1h, 24h, 7d"),
    },
    async ({ limit, period }) => {
      try {
        const data = await client.publicRequest(
          "GET",
          "/bapi/composite/v1/public/market/rank/gainers",
          { limit, period },
          "spot"
        );
        return success(data);
      } catch (err) {
        return error(err);
      }
    }
  );

  // 3. Get top losers
  server.tool(
    "market_rank_get_losers",
    "Get top losing tokens by price change percentage",
    {
      limit: z
        .number()
        .optional()
        .describe("Number of results to return"),
      period: z
        .string()
        .optional()
        .describe("Time period, e.g. 1h, 24h, 7d"),
    },
    async ({ limit, period }) => {
      try {
        const data = await client.publicRequest(
          "GET",
          "/bapi/composite/v1/public/market/rank/losers",
          { limit, period },
          "spot"
        );
        return success(data);
      } catch (err) {
        return error(err);
      }
    }
  );

  // 4. Get top volume tokens
  server.tool(
    "market_rank_get_top_volume",
    "Get tokens ranked by highest 24h trading volume",
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
          "/bapi/composite/v1/public/market/rank/volume",
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
