import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { BinanceClient } from "../../core/client.js";
import { success, error } from "../../utils/formatting.js";

export function registerP2pTools(
  server: McpServer,
  client: BinanceClient
): void {
  // 1. Get P2P order history
  server.tool(
    "p2p_get_order_history",
    "Get P2P (C2C) trade order history",
    {
      tradeType: z
        .enum(["BUY", "SELL"])
        .describe("Trade type: BUY or SELL"),
      startTimestamp: z
        .number()
        .optional()
        .describe("Start timestamp in ms"),
      endTimestamp: z
        .number()
        .optional()
        .describe("End timestamp in ms"),
      page: z.number().optional().describe("Page number (default 1)"),
      rows: z
        .number()
        .optional()
        .describe("Rows per page (default 10, max 100)"),
    },
    async ({ tradeType, startTimestamp, endTimestamp, page, rows }) => {
      try {
        const data = await client.signedRequest(
          "GET",
          "/sapi/v1/c2c/orderMatch/listUserOrderHistory",
          { tradeType, startTimestamp, endTimestamp, page, rows },
          "sapi"
        );
        return success(data);
      } catch (err) {
        return error(err);
      }
    }
  );

  // 2. Search P2P ads
  server.tool(
    "p2p_get_ads",
    "Search available P2P (C2C) advertisements",
    {
      asset: z.string().optional().describe("Crypto asset, e.g. USDT"),
      fiat: z.string().optional().describe("Fiat currency, e.g. USD"),
      tradeType: z
        .enum(["BUY", "SELL"])
        .optional()
        .describe("Trade type: BUY or SELL"),
      page: z.number().optional().describe("Page number (default 1)"),
      rows: z
        .number()
        .optional()
        .describe("Rows per page (default 10, max 20)"),
    },
    async ({ asset, fiat, tradeType, page, rows }) => {
      try {
        const data = await client.signedRequest(
          "POST",
          "/sapi/v1/c2c/ads/search",
          { asset, fiat, tradeType, page, rows },
          "sapi"
        );
        return success(data);
      } catch (err) {
        return error(err);
      }
    }
  );

  // 3. Get P2P trade detail
  server.tool(
    "p2p_get_trade_detail",
    "Get details of a specific P2P (C2C) trade order",
    {
      adOrderNo: z.string().describe("Ad order number"),
    },
    async ({ adOrderNo }) => {
      try {
        const data = await client.signedRequest(
          "GET",
          "/sapi/v1/c2c/orderMatch/getUserOrderDetail",
          { adOrderNo },
          "sapi"
        );
        return success(data);
      } catch (err) {
        return error(err);
      }
    }
  );
}
