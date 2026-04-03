import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { BinanceClient } from "../../core/client.js";
import { success, error } from "../../utils/formatting.js";

export function registerPortfolioMarginTools(
  server: McpServer,
  client: BinanceClient
): void {
  // 1. Get account information
  server.tool(
    "pm_get_account",
    "Get Portfolio Margin account information including equity and margin status",
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
    "pm_get_balance",
    "Get Portfolio Margin account balance across all asset types",
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

  // 3. Place UM order
  server.tool(
    "pm_place_um_order",
    "Place a USDS-M futures order via Portfolio Margin. \u26a0\ufe0f EXECUTES REAL TRADE",
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

  // 4. Place CM order
  server.tool(
    "pm_place_cm_order",
    "Place a Coin-M futures order via Portfolio Margin. \u26a0\ufe0f EXECUTES REAL TRADE",
    {
      symbol: z.string().describe("Trading pair symbol, e.g. BTCUSD_PERP"),
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
          "/papi/v1/cm/order",
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

  // 5. Cancel UM order
  server.tool(
    "pm_cancel_um_order",
    "Cancel an existing USDS-M futures order via Portfolio Margin",
    {
      symbol: z.string().describe("Trading pair symbol, e.g. BTCUSDT"),
      orderId: z.number().optional().describe("Order ID to cancel"),
      origClientOrderId: z
        .string()
        .optional()
        .describe("Original client order ID to cancel"),
    },
    async ({ symbol, orderId, origClientOrderId }) => {
      try {
        const data = await client.signedRequest(
          "DELETE",
          "/papi/v1/um/order",
          { symbol, orderId, origClientOrderId },
          "portfolio_margin"
        );
        return success(data);
      } catch (err) {
        return error(err);
      }
    }
  );

  // 6. Cancel CM order
  server.tool(
    "pm_cancel_cm_order",
    "Cancel an existing Coin-M futures order via Portfolio Margin",
    {
      symbol: z.string().describe("Trading pair symbol, e.g. BTCUSD_PERP"),
      orderId: z.number().optional().describe("Order ID to cancel"),
      origClientOrderId: z
        .string()
        .optional()
        .describe("Original client order ID to cancel"),
    },
    async ({ symbol, orderId, origClientOrderId }) => {
      try {
        const data = await client.signedRequest(
          "DELETE",
          "/papi/v1/cm/order",
          { symbol, orderId, origClientOrderId },
          "portfolio_margin"
        );
        return success(data);
      } catch (err) {
        return error(err);
      }
    }
  );

  // 7. Get UM positions
  server.tool(
    "pm_get_um_positions",
    "Get USDS-M futures position risk via Portfolio Margin, optionally filtered by symbol",
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

  // 8. Get CM positions
  server.tool(
    "pm_get_cm_positions",
    "Get Coin-M futures position risk via Portfolio Margin, optionally filtered by symbol",
    {
      symbol: z.string().optional().describe("Trading pair symbol, e.g. BTCUSD_PERP"),
    },
    async ({ symbol }) => {
      try {
        const data = await client.signedRequest(
          "GET",
          "/papi/v1/cm/positionRisk",
          { symbol },
          "portfolio_margin"
        );
        return success(data);
      } catch (err) {
        return error(err);
      }
    }
  );

  // 9. Set UM leverage
  server.tool(
    "pm_set_um_leverage",
    "Set leverage for a USDS-M futures symbol via Portfolio Margin",
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

  // 10. Get max borrowable
  server.tool(
    "pm_get_max_borrow",
    "Get maximum borrowable amount for an asset via Portfolio Margin",
    {
      asset: z.string().describe("Asset name, e.g. USDT, BTC"),
    },
    async ({ asset }) => {
      try {
        const data = await client.signedRequest(
          "GET",
          "/papi/v1/margin/maxBorrowable",
          { asset },
          "portfolio_margin"
        );
        return success(data);
      } catch (err) {
        return error(err);
      }
    }
  );
}
