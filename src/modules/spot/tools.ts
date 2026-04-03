import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { BinanceClient } from "../../core/client.js";
import { success, error } from "../../utils/formatting.js";

export function registerSpotTools(
  server: McpServer,
  client: BinanceClient
): void {
  // 1. Get ticker price
  server.tool(
    "spot_get_ticker_price",
    "Get current price for a symbol or all symbols",
    {
      symbol: z
        .string()
        .optional()
        .describe("Trading pair symbol, e.g. BTCUSDT"),
    },
    async ({ symbol }) => {
      try {
        const data = await client.publicRequest(
          "GET",
          "/api/v3/ticker/price",
          { symbol },
          "spot"
        );
        return success(data);
      } catch (err) {
        return error(err);
      }
    }
  );

  // 2. Get 24h ticker stats
  server.tool(
    "spot_get_ticker_24h",
    "Get 24-hour rolling window price change statistics for a symbol or all symbols",
    {
      symbol: z
        .string()
        .optional()
        .describe("Trading pair symbol, e.g. BTCUSDT"),
    },
    async ({ symbol }) => {
      try {
        const data = await client.publicRequest(
          "GET",
          "/api/v3/ticker/24hr",
          { symbol },
          "spot"
        );
        return success(data);
      } catch (err) {
        return error(err);
      }
    }
  );

  // 3. Get order book
  server.tool(
    "spot_get_orderbook",
    "Get order book depth for a symbol",
    {
      symbol: z.string().describe("Trading pair symbol, e.g. BTCUSDT"),
      limit: z
        .number()
        .optional()
        .describe(
          "Number of price levels (default 100, valid: 5, 10, 20, 50, 100, 500, 1000, 5000)"
        ),
    },
    async ({ symbol, limit }) => {
      try {
        const data = await client.publicRequest(
          "GET",
          "/api/v3/depth",
          { symbol, limit },
          "spot"
        );
        return success(data);
      } catch (err) {
        return error(err);
      }
    }
  );

  // 4. Get klines/candlestick data
  server.tool(
    "spot_get_klines",
    "Get kline/candlestick data for a symbol",
    {
      symbol: z.string().describe("Trading pair symbol, e.g. BTCUSDT"),
      interval: z
        .string()
        .describe(
          "Kline interval, e.g. 1m, 3m, 5m, 15m, 30m, 1h, 2h, 4h, 6h, 8h, 12h, 1d, 3d, 1w, 1M"
        ),
      limit: z
        .number()
        .optional()
        .describe("Number of results (default 500, max 1000)"),
    },
    async ({ symbol, interval, limit }) => {
      try {
        const data = await client.publicRequest(
          "GET",
          "/api/v3/klines",
          { symbol, interval, limit },
          "spot"
        );
        return success(data);
      } catch (err) {
        return error(err);
      }
    }
  );

  // 5. Get account information
  server.tool(
    "spot_get_account",
    "Get current spot account information including balances and permissions",
    {},
    async () => {
      try {
        const data = await client.signedRequest(
          "GET",
          "/api/v3/account",
          {},
          "spot"
        );
        return success(data);
      } catch (err) {
        return error(err);
      }
    }
  );

  // 6. Place order
  server.tool(
    "spot_place_order",
    "Place a new spot order. \u26a0\ufe0f EXECUTES REAL TRADE",
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
      timeInForce: z
        .enum(["GTC", "IOC", "FOK"])
        .optional()
        .describe("Time in force (required for LIMIT orders)"),
      quantity: z
        .string()
        .optional()
        .describe("Order quantity in base asset"),
      quoteOrderQty: z
        .string()
        .optional()
        .describe("Order quantity in quote asset (for MARKET orders)"),
      price: z
        .string()
        .optional()
        .describe("Order price (required for LIMIT orders)"),
      stopPrice: z
        .string()
        .optional()
        .describe("Stop price (required for STOP_LOSS/TAKE_PROFIT orders)"),
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
      quoteOrderQty,
      price,
      stopPrice,
      newClientOrderId,
    }) => {
      try {
        const data = await client.signedRequest(
          "POST",
          "/api/v3/order",
          {
            symbol,
            side,
            type,
            timeInForce,
            quantity,
            quoteOrderQty,
            price,
            stopPrice,
            newClientOrderId,
          },
          "spot"
        );
        return success(data);
      } catch (err) {
        return error(err);
      }
    }
  );

  // 7. Test order (no execution)
  server.tool(
    "spot_test_order",
    "Test a new spot order without executing it. \u26a0\ufe0f Does NOT place a real trade, used for validation only",
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
      timeInForce: z
        .enum(["GTC", "IOC", "FOK"])
        .optional()
        .describe("Time in force (required for LIMIT orders)"),
      quantity: z
        .string()
        .optional()
        .describe("Order quantity in base asset"),
      quoteOrderQty: z
        .string()
        .optional()
        .describe("Order quantity in quote asset (for MARKET orders)"),
      price: z
        .string()
        .optional()
        .describe("Order price (required for LIMIT orders)"),
      stopPrice: z
        .string()
        .optional()
        .describe("Stop price (required for STOP_LOSS/TAKE_PROFIT orders)"),
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
      quoteOrderQty,
      price,
      stopPrice,
      newClientOrderId,
    }) => {
      try {
        const data = await client.signedRequest(
          "POST",
          "/api/v3/order/test",
          {
            symbol,
            side,
            type,
            timeInForce,
            quantity,
            quoteOrderQty,
            price,
            stopPrice,
            newClientOrderId,
          },
          "spot"
        );
        return success(data);
      } catch (err) {
        return error(err);
      }
    }
  );

  // 8. Cancel order
  server.tool(
    "spot_cancel_order",
    "Cancel an existing spot order",
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
          "/api/v3/order",
          { symbol, orderId, origClientOrderId },
          "spot"
        );
        return success(data);
      } catch (err) {
        return error(err);
      }
    }
  );

  // 9. Cancel all open orders
  server.tool(
    "spot_cancel_all_orders",
    "Cancel all open spot orders for a symbol",
    {
      symbol: z.string().describe("Trading pair symbol, e.g. BTCUSDT"),
    },
    async ({ symbol }) => {
      try {
        const data = await client.signedRequest(
          "DELETE",
          "/api/v3/openOrders",
          { symbol },
          "spot"
        );
        return success(data);
      } catch (err) {
        return error(err);
      }
    }
  );

  // 10. Query order
  server.tool(
    "spot_get_order",
    "Query a specific spot order by orderId or origClientOrderId",
    {
      symbol: z.string().describe("Trading pair symbol, e.g. BTCUSDT"),
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
          "/api/v3/order",
          { symbol, orderId, origClientOrderId },
          "spot"
        );
        return success(data);
      } catch (err) {
        return error(err);
      }
    }
  );

  // 11. Get open orders
  server.tool(
    "spot_get_open_orders",
    "Get all open spot orders, optionally filtered by symbol",
    {
      symbol: z
        .string()
        .optional()
        .describe("Trading pair symbol, e.g. BTCUSDT"),
    },
    async ({ symbol }) => {
      try {
        const data = await client.signedRequest(
          "GET",
          "/api/v3/openOrders",
          { symbol },
          "spot"
        );
        return success(data);
      } catch (err) {
        return error(err);
      }
    }
  );

  // 12. Get all orders (history)
  server.tool(
    "spot_get_all_orders",
    "Get all spot orders (filled, cancelled, etc.) for a symbol",
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
        .describe("Number of results (default 500, max 1000)"),
    },
    async ({ symbol, orderId, startTime, endTime, limit }) => {
      try {
        const data = await client.signedRequest(
          "GET",
          "/api/v3/allOrders",
          { symbol, orderId, startTime, endTime, limit },
          "spot"
        );
        return success(data);
      } catch (err) {
        return error(err);
      }
    }
  );

  // 13. Get trade history
  server.tool(
    "spot_get_trades",
    "Get spot trade history for a symbol",
    {
      symbol: z.string().describe("Trading pair symbol, e.g. BTCUSDT"),
      orderId: z
        .number()
        .optional()
        .describe("Filter trades by order ID"),
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
          "/api/v3/myTrades",
          { symbol, orderId, startTime, endTime, limit },
          "spot"
        );
        return success(data);
      } catch (err) {
        return error(err);
      }
    }
  );

  // 14. Place OCO order
  server.tool(
    "spot_place_oco",
    "Place a new OCO (One-Cancels-the-Other) spot order. \u26a0\ufe0f EXECUTES REAL TRADE",
    {
      symbol: z.string().describe("Trading pair symbol, e.g. BTCUSDT"),
      side: z.enum(["BUY", "SELL"]).describe("Order side"),
      quantity: z.string().describe("Order quantity"),
      price: z
        .string()
        .describe("Price for the limit order leg"),
      stopPrice: z
        .string()
        .describe("Stop price for the stop-loss leg"),
      stopLimitPrice: z
        .string()
        .optional()
        .describe("Limit price for the stop-loss limit leg (turns stop-loss into stop-loss-limit)"),
      stopLimitTimeInForce: z
        .enum(["GTC", "FOK", "IOC"])
        .optional()
        .describe("Time in force for the stop-loss limit leg (required if stopLimitPrice is set)"),
    },
    async ({
      symbol,
      side,
      quantity,
      price,
      stopPrice,
      stopLimitPrice,
      stopLimitTimeInForce,
    }) => {
      try {
        const data = await client.signedRequest(
          "POST",
          "/api/v3/orderList/oco",
          {
            symbol,
            side,
            quantity,
            price,
            stopPrice,
            stopLimitPrice,
            stopLimitTimeInForce,
          },
          "spot"
        );
        return success(data);
      } catch (err) {
        return error(err);
      }
    }
  );

  // 15. Get exchange info
  server.tool(
    "spot_get_exchange_info",
    "Get exchange information including trading rules and symbol details",
    {
      symbol: z
        .string()
        .optional()
        .describe("Trading pair symbol, e.g. BTCUSDT. Returns all symbols if omitted"),
    },
    async ({ symbol }) => {
      try {
        const params: Record<string, string | undefined> = {};
        if (symbol) {
          params.symbol = symbol;
        }
        const data = await client.publicRequest(
          "GET",
          "/api/v3/exchangeInfo",
          params,
          "spot"
        );
        return success(data);
      } catch (err) {
        return error(err);
      }
    }
  );
}
