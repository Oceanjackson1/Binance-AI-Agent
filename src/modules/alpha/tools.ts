import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { BinanceClient } from "../../core/client.js";
import { success, error } from "../../utils/formatting.js";

export function registerAlphaTools(
  server: McpServer,
  client: BinanceClient
): void {
  // 1. Get alpha tokens list
  server.tool(
    "alpha_get_tokens",
    "Get a list of available Binance Alpha tokens",
    {
      page: z.number().optional().describe("Page number (default 1)"),
      pageSize: z
        .number()
        .optional()
        .describe("Results per page (default 20)"),
    },
    async ({ page, pageSize }) => {
      try {
        const data = await client.signedRequest(
          "GET",
          "/sapi/v1/alpha/tokens",
          { page, pageSize },
          "sapi"
        );
        return success(data);
      } catch (err) {
        return error(err);
      }
    }
  );

  // 2. Get alpha token detail
  server.tool(
    "alpha_get_token_detail",
    "Get detailed information for a specific Binance Alpha token",
    {
      symbol: z.string().describe("Token symbol, e.g. BTC"),
    },
    async ({ symbol }) => {
      try {
        const data = await client.signedRequest(
          "GET",
          "/sapi/v1/alpha/token",
          { symbol },
          "sapi"
        );
        return success(data);
      } catch (err) {
        return error(err);
      }
    }
  );

  // 3. Place alpha order
  server.tool(
    "alpha_place_order",
    "Place a Binance Alpha token order. \u26a0\ufe0f EXECUTES REAL TRADE",
    {
      symbol: z.string().describe("Token symbol, e.g. BTC"),
      side: z.enum(["BUY", "SELL"]).describe("Order side"),
      quantity: z.string().optional().describe("Order quantity"),
      quoteOrderQty: z
        .string()
        .optional()
        .describe("Quote order quantity (amount in quote asset)"),
    },
    async ({ symbol, side, quantity, quoteOrderQty }) => {
      try {
        const data = await client.signedRequest(
          "POST",
          "/sapi/v1/alpha/order",
          { symbol, side, quantity, quoteOrderQty },
          "sapi"
        );
        return success(data);
      } catch (err) {
        return error(err);
      }
    }
  );

  // 4. Get alpha orders
  server.tool(
    "alpha_get_orders",
    "Get Binance Alpha order history",
    {
      symbol: z.string().optional().describe("Filter by token symbol"),
      startTime: z.number().optional().describe("Start time in ms"),
      endTime: z.number().optional().describe("End time in ms"),
      page: z.number().optional().describe("Page number (default 1)"),
      pageSize: z
        .number()
        .optional()
        .describe("Results per page (default 20)"),
    },
    async ({ symbol, startTime, endTime, page, pageSize }) => {
      try {
        const data = await client.signedRequest(
          "GET",
          "/sapi/v1/alpha/orders",
          { symbol, startTime, endTime, page, pageSize },
          "sapi"
        );
        return success(data);
      } catch (err) {
        return error(err);
      }
    }
  );
}
