import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { BinanceClient } from "../../core/client.js";
import { success, error } from "../../utils/formatting.js";

export function registerMarginTools(
  server: McpServer,
  client: BinanceClient
): void {
  // 1. Place margin order
  server.tool(
    "margin_place_order",
    "Place a new margin order. \u26a0\ufe0f EXECUTES REAL TRADE",
    {
      symbol: z.string().describe("Trading pair symbol, e.g. BTCUSDT"),
      side: z.enum(["BUY", "SELL"]).describe("Order side"),
      type: z
        .enum([
          "LIMIT",
          "MARKET",
          "STOP_LOSS",
          "STOP_LOSS_LIMIT",
          "TAKE_PROFIT",
          "TAKE_PROFIT_LIMIT",
          "LIMIT_MAKER",
        ])
        .describe("Order type"),
      quantity: z.string().optional().describe("Order quantity"),
      price: z.string().optional().describe("Order price (required for LIMIT orders)"),
      timeInForce: z
        .enum(["GTC", "IOC", "FOK"])
        .optional()
        .describe("Time in force (required for LIMIT orders)"),
      isIsolated: z
        .enum(["TRUE", "FALSE"])
        .optional()
        .describe("TRUE for isolated margin, FALSE for cross margin"),
      sideEffectType: z
        .enum(["NO_SIDE_EFFECT", "MARGIN_BUY", "AUTO_REPAY", "AUTO_BORROW_REPAY"])
        .optional()
        .describe("Side effect type for margin order"),
      quoteOrderQty: z
        .string()
        .optional()
        .describe("Quote order quantity for MARKET orders"),
    },
    async ({
      symbol,
      side,
      type,
      quantity,
      price,
      timeInForce,
      isIsolated,
      sideEffectType,
      quoteOrderQty,
    }) => {
      try {
        const data = await client.signedRequest(
          "POST",
          "/sapi/v1/margin/order",
          {
            symbol,
            side,
            type,
            quantity,
            price,
            timeInForce,
            isIsolated,
            sideEffectType,
            quoteOrderQty,
          },
          "sapi"
        );
        return success(data);
      } catch (err) {
        return error(err);
      }
    }
  );

  // 2. Cancel margin order
  server.tool(
    "margin_cancel_order",
    "Cancel an existing margin order",
    {
      symbol: z.string().describe("Trading pair symbol, e.g. BTCUSDT"),
      orderId: z.number().optional().describe("Order ID to cancel"),
      origClientOrderId: z
        .string()
        .optional()
        .describe("Original client order ID to cancel"),
      isIsolated: z
        .enum(["TRUE", "FALSE"])
        .optional()
        .describe("TRUE for isolated margin, FALSE for cross margin"),
    },
    async ({ symbol, orderId, origClientOrderId, isIsolated }) => {
      try {
        const data = await client.signedRequest(
          "DELETE",
          "/sapi/v1/margin/order",
          { symbol, orderId, origClientOrderId, isIsolated },
          "sapi"
        );
        return success(data);
      } catch (err) {
        return error(err);
      }
    }
  );

  // 3. Get margin order
  server.tool(
    "margin_get_order",
    "Query a specific margin order by orderId or origClientOrderId",
    {
      symbol: z.string().describe("Trading pair symbol, e.g. BTCUSDT"),
      orderId: z.number().optional().describe("Order ID"),
      origClientOrderId: z
        .string()
        .optional()
        .describe("Original client order ID"),
      isIsolated: z
        .enum(["TRUE", "FALSE"])
        .optional()
        .describe("TRUE for isolated margin, FALSE for cross margin"),
    },
    async ({ symbol, orderId, origClientOrderId, isIsolated }) => {
      try {
        const data = await client.signedRequest(
          "GET",
          "/sapi/v1/margin/order",
          { symbol, orderId, origClientOrderId, isIsolated },
          "sapi"
        );
        return success(data);
      } catch (err) {
        return error(err);
      }
    }
  );

  // 4. Get open margin orders
  server.tool(
    "margin_get_open_orders",
    "Get all open margin orders, optionally filtered by symbol",
    {
      symbol: z.string().optional().describe("Trading pair symbol, e.g. BTCUSDT"),
      isIsolated: z
        .enum(["TRUE", "FALSE"])
        .optional()
        .describe("TRUE for isolated margin, FALSE for cross margin"),
    },
    async ({ symbol, isIsolated }) => {
      try {
        const data = await client.signedRequest(
          "GET",
          "/sapi/v1/margin/openOrders",
          { symbol, isIsolated },
          "sapi"
        );
        return success(data);
      } catch (err) {
        return error(err);
      }
    }
  );

  // 5. Get all margin orders
  server.tool(
    "margin_get_all_orders",
    "Get all margin orders (filled, cancelled, etc.) for a symbol",
    {
      symbol: z.string().describe("Trading pair symbol, e.g. BTCUSDT"),
      orderId: z
        .number()
        .optional()
        .describe("Return orders starting from this orderId"),
      startTime: z.number().optional().describe("Start time in ms"),
      endTime: z.number().optional().describe("End time in ms"),
      limit: z
        .number()
        .optional()
        .describe("Number of results (default 500, max 500)"),
      isIsolated: z
        .enum(["TRUE", "FALSE"])
        .optional()
        .describe("TRUE for isolated margin, FALSE for cross margin"),
    },
    async ({ symbol, orderId, startTime, endTime, limit, isIsolated }) => {
      try {
        const data = await client.signedRequest(
          "GET",
          "/sapi/v1/margin/allOrders",
          { symbol, orderId, startTime, endTime, limit, isIsolated },
          "sapi"
        );
        return success(data);
      } catch (err) {
        return error(err);
      }
    }
  );

  // 6. Get margin trades
  server.tool(
    "margin_get_trades",
    "Get margin account trade history for a symbol",
    {
      symbol: z.string().describe("Trading pair symbol, e.g. BTCUSDT"),
      orderId: z.number().optional().describe("Filter by order ID"),
      startTime: z.number().optional().describe("Start time in ms"),
      endTime: z.number().optional().describe("End time in ms"),
      limit: z
        .number()
        .optional()
        .describe("Number of results (default 500, max 1000)"),
      isIsolated: z
        .enum(["TRUE", "FALSE"])
        .optional()
        .describe("TRUE for isolated margin, FALSE for cross margin"),
    },
    async ({ symbol, orderId, startTime, endTime, limit, isIsolated }) => {
      try {
        const data = await client.signedRequest(
          "GET",
          "/sapi/v1/margin/myTrades",
          { symbol, orderId, startTime, endTime, limit, isIsolated },
          "sapi"
        );
        return success(data);
      } catch (err) {
        return error(err);
      }
    }
  );

  // 7. Borrow margin asset
  server.tool(
    "margin_borrow",
    "Borrow an asset in margin account. \u26a0\ufe0f EXECUTES REAL TRADE",
    {
      asset: z.string().describe("Asset to borrow, e.g. BTC"),
      amount: z.string().describe("Amount to borrow"),
      isIsolated: z
        .enum(["TRUE", "FALSE"])
        .optional()
        .describe("TRUE for isolated margin, FALSE for cross margin"),
      symbol: z
        .string()
        .optional()
        .describe("Isolated margin trading pair (required if isIsolated=TRUE)"),
    },
    async ({ asset, amount, isIsolated, symbol }) => {
      try {
        const data = await client.signedRequest(
          "POST",
          "/sapi/v1/margin/borrow-repay",
          { asset, amount, type: "BORROW", isIsolated, symbol },
          "sapi"
        );
        return success(data);
      } catch (err) {
        return error(err);
      }
    }
  );

  // 8. Repay margin asset
  server.tool(
    "margin_repay",
    "Repay a borrowed asset in margin account. \u26a0\ufe0f EXECUTES REAL TRADE",
    {
      asset: z.string().describe("Asset to repay, e.g. BTC"),
      amount: z.string().describe("Amount to repay"),
      isIsolated: z
        .enum(["TRUE", "FALSE"])
        .optional()
        .describe("TRUE for isolated margin, FALSE for cross margin"),
      symbol: z
        .string()
        .optional()
        .describe("Isolated margin trading pair (required if isIsolated=TRUE)"),
    },
    async ({ asset, amount, isIsolated, symbol }) => {
      try {
        const data = await client.signedRequest(
          "POST",
          "/sapi/v1/margin/borrow-repay",
          { asset, amount, type: "REPAY", isIsolated, symbol },
          "sapi"
        );
        return success(data);
      } catch (err) {
        return error(err);
      }
    }
  );

  // 9. Get margin account info
  server.tool(
    "margin_get_account",
    "Get current cross-margin account information including balances and margin level",
    {},
    async () => {
      try {
        const data = await client.signedRequest(
          "GET",
          "/sapi/v1/margin/account",
          {},
          "sapi"
        );
        return success(data);
      } catch (err) {
        return error(err);
      }
    }
  );

  // 10. Get max borrowable
  server.tool(
    "margin_get_max_borrow",
    "Get maximum borrowable amount for an asset in margin account",
    {
      asset: z.string().describe("Asset symbol, e.g. BTC"),
      isolatedSymbol: z
        .string()
        .optional()
        .describe("Isolated margin trading pair, e.g. BTCUSDT"),
    },
    async ({ asset, isolatedSymbol }) => {
      try {
        const data = await client.signedRequest(
          "GET",
          "/sapi/v1/margin/maxBorrowable",
          { asset, isolatedSymbol },
          "sapi"
        );
        return success(data);
      } catch (err) {
        return error(err);
      }
    }
  );

  // 11. Get max transferable
  server.tool(
    "margin_get_max_transfer",
    "Get maximum transferable amount for an asset out of margin account",
    {
      asset: z.string().describe("Asset symbol, e.g. BTC"),
      isolatedSymbol: z
        .string()
        .optional()
        .describe("Isolated margin trading pair, e.g. BTCUSDT"),
    },
    async ({ asset, isolatedSymbol }) => {
      try {
        const data = await client.signedRequest(
          "GET",
          "/sapi/v1/margin/maxTransferable",
          { asset, isolatedSymbol },
          "sapi"
        );
        return success(data);
      } catch (err) {
        return error(err);
      }
    }
  );

  // 12. Get interest history
  server.tool(
    "margin_get_interest_history",
    "Get margin account interest history",
    {
      asset: z.string().optional().describe("Asset symbol, e.g. BTC"),
      isolatedSymbol: z
        .string()
        .optional()
        .describe("Isolated margin trading pair, e.g. BTCUSDT"),
      startTime: z.number().optional().describe("Start time in ms"),
      endTime: z.number().optional().describe("End time in ms"),
      size: z
        .number()
        .optional()
        .describe("Number of results (default 10, max 100)"),
    },
    async ({ asset, isolatedSymbol, startTime, endTime, size }) => {
      try {
        const data = await client.signedRequest(
          "GET",
          "/sapi/v1/margin/interestHistory",
          { asset, isolatedSymbol, startTime, endTime, size },
          "sapi"
        );
        return success(data);
      } catch (err) {
        return error(err);
      }
    }
  );
}
