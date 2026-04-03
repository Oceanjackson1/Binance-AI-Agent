import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { BinanceClient } from "../../core/client.js";
import { success, error } from "../../utils/formatting.js";

export function registerConvertTools(
  server: McpServer,
  client: BinanceClient
): void {
  // 1. Get convert trading pairs
  server.tool(
    "convert_get_pairs",
    "Get available convert trading pairs and their limits",
    {
      fromAsset: z
        .string()
        .optional()
        .describe("Source asset, e.g. BTC"),
      toAsset: z
        .string()
        .optional()
        .describe("Destination asset, e.g. USDT"),
    },
    async ({ fromAsset, toAsset }) => {
      try {
        const data = await client.signedRequest(
          "GET",
          "/sapi/v1/convert/exchangeInfo",
          { fromAsset, toAsset },
          "sapi"
        );
        return success(data);
      } catch (err) {
        return error(err);
      }
    }
  );

  // 2. Get quote
  server.tool(
    "convert_get_quote",
    "\u26a0\ufe0f REQUESTS A REAL QUOTE - Get a convert quote for asset conversion (quote is valid for a limited time)",
    {
      fromAsset: z.string().describe("Source asset, e.g. BTC"),
      toAsset: z.string().describe("Destination asset, e.g. USDT"),
      fromAmount: z
        .string()
        .optional()
        .describe("Amount of source asset to convert (either fromAmount or toAmount required)"),
      toAmount: z
        .string()
        .optional()
        .describe("Desired amount of destination asset (either fromAmount or toAmount required)"),
    },
    async ({ fromAsset, toAsset, fromAmount, toAmount }) => {
      try {
        const data = await client.signedRequest(
          "POST",
          "/sapi/v1/convert/getQuote",
          { fromAsset, toAsset, fromAmount, toAmount },
          "sapi"
        );
        return success(data);
      } catch (err) {
        return error(err);
      }
    }
  );

  // 3. Accept quote
  server.tool(
    "convert_accept_quote",
    "\u26a0\ufe0f EXECUTES REAL CONVERSION - Accept a convert quote to execute the trade",
    {
      quoteId: z.string().describe("Quote ID from convert_get_quote"),
    },
    async ({ quoteId }) => {
      try {
        const data = await client.signedRequest(
          "POST",
          "/sapi/v1/convert/acceptQuote",
          { quoteId },
          "sapi"
        );
        return success(data);
      } catch (err) {
        return error(err);
      }
    }
  );

  // 4. Get convert trade history
  server.tool(
    "convert_get_history",
    "Get convert trade history within a time range",
    {
      startTime: z.number().describe("Start time in ms"),
      endTime: z.number().describe("End time in ms"),
      limit: z
        .number()
        .optional()
        .describe("Number of results (default 100, max 1000)"),
    },
    async ({ startTime, endTime, limit }) => {
      try {
        const data = await client.signedRequest(
          "GET",
          "/sapi/v1/convert/tradeFlow",
          { startTime, endTime, limit },
          "sapi"
        );
        return success(data);
      } catch (err) {
        return error(err);
      }
    }
  );

  // 5. Place limit order
  server.tool(
    "convert_place_limit",
    "\u26a0\ufe0f EXECUTES REAL LIMIT ORDER - Place a convert limit order",
    {
      baseAsset: z.string().describe("Base asset, e.g. BTC"),
      quoteAsset: z.string().describe("Quote asset, e.g. USDT"),
      side: z.enum(["BUY", "SELL"]).describe("Order side"),
      limitPrice: z.string().describe("Limit price for the conversion"),
      baseAmount: z
        .string()
        .optional()
        .describe("Base asset amount (either baseAmount or quoteAmount required)"),
      quoteAmount: z
        .string()
        .optional()
        .describe("Quote asset amount (either baseAmount or quoteAmount required)"),
      expiredType: z
        .string()
        .optional()
        .describe("Expiry type, e.g. 1_D, 7_D, 30_D"),
    },
    async ({
      baseAsset,
      quoteAsset,
      side,
      limitPrice,
      baseAmount,
      quoteAmount,
      expiredType,
    }) => {
      try {
        const data = await client.signedRequest(
          "POST",
          "/sapi/v1/convert/limit/placeOrder",
          {
            baseAsset,
            quoteAsset,
            side,
            limitPrice,
            baseAmount,
            quoteAmount,
            expiredType,
          },
          "sapi"
        );
        return success(data);
      } catch (err) {
        return error(err);
      }
    }
  );

  // 6. Cancel limit order
  server.tool(
    "convert_cancel_limit",
    "Cancel an existing convert limit order",
    {
      orderId: z.number().describe("Limit order ID to cancel"),
    },
    async ({ orderId }) => {
      try {
        const data = await client.signedRequest(
          "POST",
          "/sapi/v1/convert/limit/cancelOrder",
          { orderId },
          "sapi"
        );
        return success(data);
      } catch (err) {
        return error(err);
      }
    }
  );
}
