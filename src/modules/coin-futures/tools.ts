import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { BinanceClient } from "../../core/client.js";
import { success, error } from "../../utils/formatting.js";

export function registerCoinFuturesTools(
  server: McpServer,
  client: BinanceClient
): void {
  // 1. Get ticker price
  server.tool(
    "coin_futures_get_ticker_price",
    "Get latest price for a Coin-M futures symbol, or all symbols if omitted",
    { symbol: z.string().optional().describe("Trading pair symbol, e.g. BTCUSD_PERP") },
    async ({ symbol }) => {
      try {
        const data = await client.publicRequest(
          "GET",
          "/dapi/v1/ticker/price",
          { symbol },
          "coin_futures"
        );
        return success(data);
      } catch (err) {
        return error(err);
      }
    }
  );

  // 2. Get 24h ticker stats
  server.tool(
    "coin_futures_get_ticker_24h",
    "Get 24-hour rolling window price change statistics for Coin-M futures",
    { symbol: z.string().optional().describe("Trading pair symbol, e.g. BTCUSD_PERP") },
    async ({ symbol }) => {
      try {
        const data = await client.publicRequest(
          "GET",
          "/dapi/v1/ticker/24hr",
          { symbol },
          "coin_futures"
        );
        return success(data);
      } catch (err) {
        return error(err);
      }
    }
  );

  // 3. Place order
  server.tool(
    "coin_futures_place_order",
    "Place a new Coin-M futures order. \u26a0\ufe0f EXECUTES REAL TRADE",
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
      timeInForce: z
        .enum(["GTC", "IOC", "FOK", "GTX", "GTD"])
        .optional()
        .describe("Time in force (required for LIMIT orders)"),
      quantity: z.string().optional().describe("Order quantity"),
      price: z.string().optional().describe("Order price (required for LIMIT orders)"),
      stopPrice: z
        .string()
        .optional()
        .describe("Stop price (required for STOP/TAKE_PROFIT orders)"),
      positionSide: z
        .enum(["BOTH", "LONG", "SHORT"])
        .optional()
        .describe("Position side for hedge mode"),
      reduceOnly: z
        .boolean()
        .optional()
        .describe("Reduce-only order flag"),
      newClientOrderId: z
        .string()
        .optional()
        .describe("Unique client order ID"),
    },
    async ({
      symbol,
      side,
      type,
      timeInForce,
      quantity,
      price,
      stopPrice,
      positionSide,
      reduceOnly,
      newClientOrderId,
    }) => {
      try {
        const data = await client.signedRequest(
          "POST",
          "/dapi/v1/order",
          {
            symbol,
            side,
            type,
            timeInForce,
            quantity,
            price,
            stopPrice,
            positionSide,
            reduceOnly,
            newClientOrderId,
          },
          "coin_futures"
        );
        return success(data);
      } catch (err) {
        return error(err);
      }
    }
  );

  // 4. Cancel order
  server.tool(
    "coin_futures_cancel_order",
    "Cancel an existing Coin-M futures order",
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
          "/dapi/v1/order",
          { symbol, orderId, origClientOrderId },
          "coin_futures"
        );
        return success(data);
      } catch (err) {
        return error(err);
      }
    }
  );

  // 5. Cancel all open orders
  server.tool(
    "coin_futures_cancel_all",
    "Cancel all open Coin-M futures orders for a symbol",
    {
      symbol: z.string().describe("Trading pair symbol, e.g. BTCUSD_PERP"),
    },
    async ({ symbol }) => {
      try {
        const data = await client.signedRequest(
          "DELETE",
          "/dapi/v1/allOpenOrders",
          { symbol },
          "coin_futures"
        );
        return success(data);
      } catch (err) {
        return error(err);
      }
    }
  );

  // 6. Query order
  server.tool(
    "coin_futures_get_order",
    "Query a specific Coin-M futures order by orderId or origClientOrderId",
    {
      symbol: z.string().describe("Trading pair symbol, e.g. BTCUSD_PERP"),
      orderId: z.number().optional().describe("Order ID"),
      origClientOrderId: z
        .string()
        .optional()
        .describe("Original client order ID"),
    },
    async ({ symbol, orderId, origClientOrderId }) => {
      try {
        const data = await client.signedRequest(
          "GET",
          "/dapi/v1/order",
          { symbol, orderId, origClientOrderId },
          "coin_futures"
        );
        return success(data);
      } catch (err) {
        return error(err);
      }
    }
  );

  // 7. Get open orders
  server.tool(
    "coin_futures_get_open_orders",
    "Get all open Coin-M futures orders, optionally filtered by symbol",
    {
      symbol: z.string().optional().describe("Trading pair symbol, e.g. BTCUSD_PERP"),
    },
    async ({ symbol }) => {
      try {
        const data = await client.signedRequest(
          "GET",
          "/dapi/v1/openOrders",
          { symbol },
          "coin_futures"
        );
        return success(data);
      } catch (err) {
        return error(err);
      }
    }
  );

  // 8. Get all orders (history)
  server.tool(
    "coin_futures_get_all_orders",
    "Get all Coin-M futures orders (filled, cancelled, etc.) for a symbol",
    {
      symbol: z.string().describe("Trading pair symbol, e.g. BTCUSD_PERP"),
      orderId: z
        .number()
        .optional()
        .describe("Return orders starting from this orderId"),
      startTime: z.number().optional().describe("Start time in ms"),
      endTime: z.number().optional().describe("End time in ms"),
      limit: z
        .number()
        .optional()
        .describe("Number of results (default 500, max 1000)"),
    },
    async ({ symbol, orderId, startTime, endTime, limit }) => {
      try {
        const data = await client.signedRequest(
          "GET",
          "/dapi/v1/allOrders",
          { symbol, orderId, startTime, endTime, limit },
          "coin_futures"
        );
        return success(data);
      } catch (err) {
        return error(err);
      }
    }
  );

  // 9. Get account information
  server.tool(
    "coin_futures_get_account",
    "Get current Coin-M futures account information including balances and positions",
    {},
    async () => {
      try {
        const data = await client.signedRequest(
          "GET",
          "/dapi/v1/account",
          {},
          "coin_futures"
        );
        return success(data);
      } catch (err) {
        return error(err);
      }
    }
  );

  // 10. Get balance
  server.tool(
    "coin_futures_get_balance",
    "Get Coin-M futures account balance",
    {},
    async () => {
      try {
        const data = await client.signedRequest(
          "GET",
          "/dapi/v1/balance",
          {},
          "coin_futures"
        );
        return success(data);
      } catch (err) {
        return error(err);
      }
    }
  );

  // 11. Get positions
  server.tool(
    "coin_futures_get_positions",
    "Get current Coin-M futures position information, optionally filtered by symbol",
    {
      symbol: z.string().optional().describe("Trading pair symbol, e.g. BTCUSD_PERP"),
    },
    async ({ symbol }) => {
      try {
        const data = await client.signedRequest(
          "GET",
          "/dapi/v1/positionRisk",
          { symbol },
          "coin_futures"
        );
        return success(data);
      } catch (err) {
        return error(err);
      }
    }
  );

  // 12. Set leverage
  server.tool(
    "coin_futures_set_leverage",
    "Set leverage for a Coin-M futures symbol (1-125)",
    {
      symbol: z.string().describe("Trading pair symbol, e.g. BTCUSD_PERP"),
      leverage: z.number().describe("Target leverage (1-125)"),
    },
    async ({ symbol, leverage }) => {
      try {
        const data = await client.signedRequest(
          "POST",
          "/dapi/v1/leverage",
          { symbol, leverage },
          "coin_futures"
        );
        return success(data);
      } catch (err) {
        return error(err);
      }
    }
  );
}
