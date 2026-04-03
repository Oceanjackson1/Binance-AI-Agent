import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { BinanceClient } from "../../core/client.js";
import { success, error } from "../../utils/formatting.js";

export function registerPortfolioMarginProTools(
  server: McpServer,
  client: BinanceClient
): void {
  // 1. Get account information
  server.tool(
    "pm_pro_get_account",
    "Get Portfolio Margin Pro account information including equity and margin status",
    {},
    async () => {
      try {
        const data = await client.signedRequest(
          "GET",
          "/papi/v1/account",
          {},
          "portfolio_margin"
        );
        return success(data);
      } catch (err) {
        return error(err);
      }
    }
  );

  // 2. Get balance
  server.tool(
    "pm_pro_get_balance",
    "Get Portfolio Margin Pro account balance across all asset types",
    {},
    async () => {
      try {
        const data = await client.signedRequest(
          "GET",
          "/papi/v1/balance",
          {},
          "portfolio_margin"
        );
        return success(data);
      } catch (err) {
        return error(err);
      }
    }
  );

  // 3. Place order
  server.tool(
    "pm_pro_place_order",
    "Place a USDS-M futures order via Portfolio Margin Pro. \u26a0\ufe0f EXECUTES REAL TRADE",
    {
      symbol: z.string().describe("Trading pair symbol, e.g. BTCUSDT"),
      side: z.enum(["BUY", "SELL"]).describe("Order side"),
      type: z
        .enum([
          "LIMIT",
          "MARKET",
          "STOP",
          "STOP_MARKET",
          "TAKE_PROFIT",
          "TAKE_PROFIT_MARKET",
          "TRAILING_STOP_MARKET",
        ])
        .describe("Order type"),
      quantity: z.string().optional().describe("Order quantity"),
      price: z.string().optional().describe("Order price (required for LIMIT orders)"),
      timeInForce: z
        .enum(["GTC", "IOC", "FOK", "GTX", "GTD"])
        .optional()
        .describe("Time in force (required for LIMIT orders)"),
      positionSide: z
        .enum(["BOTH", "LONG", "SHORT"])
        .optional()
        .describe("Position side for hedge mode"),
      reduceOnly: z
        .boolean()
        .optional()
        .describe("Reduce-only order flag"),
    },
    async ({
      symbol,
      side,
      type,
      quantity,
      price,
      timeInForce,
      positionSide,
      reduceOnly,
    }) => {
      try {
        const data = await client.signedRequest(
          "POST",
          "/papi/v1/um/order",
          {
            symbol,
            side,
            type,
            quantity,
            price,
            timeInForce,
            positionSide,
            reduceOnly,
          },
          "portfolio_margin"
        );
        return success(data);
      } catch (err) {
        return error(err);
      }
    }
  );

  // 4. Cancel order
  server.tool(
    "pm_pro_cancel_order",
    "Cancel an existing USDS-M futures order via Portfolio Margin Pro",
    {
      symbol: z.string().describe("Trading pair symbol, e.g. BTCUSDT"),
      orderId: z.number().optional().describe("Order ID to cancel"),
    },
    async ({ symbol, orderId }) => {
      try {
        const data = await client.signedRequest(
          "DELETE",
          "/papi/v1/um/order",
          { symbol, orderId },
          "portfolio_margin"
        );
        return success(data);
      } catch (err) {
        return error(err);
      }
    }
  );

  // 5. Get positions
  server.tool(
    "pm_pro_get_positions",
    "Get USDS-M futures position risk via Portfolio Margin Pro, optionally filtered by symbol",
    {
      symbol: z.string().optional().describe("Trading pair symbol, e.g. BTCUSDT"),
    },
    async ({ symbol }) => {
      try {
        const data = await client.signedRequest(
          "GET",
          "/papi/v1/um/positionRisk",
          { symbol },
          "portfolio_margin"
        );
        return success(data);
      } catch (err) {
        return error(err);
      }
    }
  );

  // 6. Set leverage
  server.tool(
    "pm_pro_set_leverage",
    "Set leverage for a USDS-M futures symbol via Portfolio Margin Pro",
    {
      symbol: z.string().describe("Trading pair symbol, e.g. BTCUSDT"),
      leverage: z.number().describe("Target leverage (1-125)"),
    },
    async ({ symbol, leverage }) => {
      try {
        const data = await client.signedRequest(
          "POST",
          "/papi/v1/um/leverage",
          { symbol, leverage },
          "portfolio_margin"
        );
        return success(data);
      } catch (err) {
        return error(err);
      }
    }
  );
}
