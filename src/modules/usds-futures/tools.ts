import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { BinanceClient } from "../../core/client.js";
import { success, error } from "../../utils/formatting.js";

export function registerUsdsFuturesTools(
  server: McpServer,
  client: BinanceClient
): void {
  // 1. Get ticker price
  server.tool(
    "usds_futures_get_ticker_price",
    "Get latest price for a USDS-M futures symbol, or all symbols if omitted",
    { symbol: z.string().optional().describe("Trading pair symbol, e.g. BTCUSDT") },
    async ({ symbol }) => {
      try {
        const data = await client.publicRequest(
          "GET",
          "/fapi/v1/ticker/price",
          { symbol },
          "usds_futures"
        );
        return success(data);
      } catch (err) {
        return error(err);
      }
    }
  );

  // 2. Get 24h ticker stats
  server.tool(
    "usds_futures_get_ticker_24h",
    "Get 24-hour rolling window price change statistics for USDS-M futures",
    { symbol: z.string().optional().describe("Trading pair symbol, e.g. BTCUSDT") },
    async ({ symbol }) => {
      try {
        const data = await client.publicRequest(
          "GET",
          "/fapi/v1/ticker/24hr",
          { symbol },
          "usds_futures"
        );
        return success(data);
      } catch (err) {
        return error(err);
      }
    }
  );

  // 3. Get klines/candlestick data
  server.tool(
    "usds_futures_get_klines",
    "Get kline/candlestick data for a USDS-M futures symbol",
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
        .describe("Number of results (default 500, max 1500)"),
    },
    async ({ symbol, interval, limit }) => {
      try {
        const data = await client.publicRequest(
          "GET",
          "/fapi/v1/klines",
          { symbol, interval, limit },
          "usds_futures"
        );
        return success(data);
      } catch (err) {
        return error(err);
      }
    }
  );

  // 4. Place order
  server.tool(
    "usds_futures_place_order",
    "Place a new USDS-M futures order. \u26a0\ufe0f EXECUTES REAL TRADE",
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
          "/fapi/v1/order",
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
          "usds_futures"
        );
        return success(data);
      } catch (err) {
        return error(err);
      }
    }
  );

  // 5. Cancel order
  server.tool(
    "usds_futures_cancel_order",
    "Cancel an existing USDS-M futures order",
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
          "/fapi/v1/order",
          { symbol, orderId, origClientOrderId },
          "usds_futures"
        );
        return success(data);
      } catch (err) {
        return error(err);
      }
    }
  );

  // 6. Cancel all open orders
  server.tool(
    "usds_futures_cancel_all",
    "Cancel all open USDS-M futures orders for a symbol",
    {
      symbol: z.string().describe("Trading pair symbol, e.g. BTCUSDT"),
    },
    async ({ symbol }) => {
      try {
        const data = await client.signedRequest(
          "DELETE",
          "/fapi/v1/allOpenOrders",
          { symbol },
          "usds_futures"
        );
        return success(data);
      } catch (err) {
        return error(err);
      }
    }
  );

  // 7. Query order
  server.tool(
    "usds_futures_get_order",
    "Query a specific USDS-M futures order by orderId or origClientOrderId",
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
          "/fapi/v1/order",
          { symbol, orderId, origClientOrderId },
          "usds_futures"
        );
        return success(data);
      } catch (err) {
        return error(err);
      }
    }
  );

  // 8. Get open orders
  server.tool(
    "usds_futures_get_open_orders",
    "Get all open USDS-M futures orders, optionally filtered by symbol",
    {
      symbol: z.string().optional().describe("Trading pair symbol, e.g. BTCUSDT"),
    },
    async ({ symbol }) => {
      try {
        const data = await client.signedRequest(
          "GET",
          "/fapi/v1/openOrders",
          { symbol },
          "usds_futures"
        );
        return success(data);
      } catch (err) {
        return error(err);
      }
    }
  );

  // 9. Get all orders (history)
  server.tool(
    "usds_futures_get_all_orders",
    "Get all USDS-M futures orders (filled, cancelled, etc.) for a symbol",
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
          "/fapi/v1/allOrders",
          { symbol, orderId, startTime, endTime, limit },
          "usds_futures"
        );
        return success(data);
      } catch (err) {
        return error(err);
      }
    }
  );

  // 10. Get account information
  server.tool(
    "usds_futures_get_account",
    "Get current USDS-M futures account information including balances and positions",
    {},
    async () => {
      try {
        const data = await client.signedRequest(
          "GET",
          "/fapi/v2/account",
          {},
          "usds_futures"
        );
        return success(data);
      } catch (err) {
        return error(err);
      }
    }
  );

  // 11. Get balance
  server.tool(
    "usds_futures_get_balance",
    "Get USDS-M futures account balance",
    {},
    async () => {
      try {
        const data = await client.signedRequest(
          "GET",
          "/fapi/v2/balance",
          {},
          "usds_futures"
        );
        return success(data);
      } catch (err) {
        return error(err);
      }
    }
  );

  // 12. Get positions
  server.tool(
    "usds_futures_get_positions",
    "Get current USDS-M futures position information, optionally filtered by symbol",
    {
      symbol: z.string().optional().describe("Trading pair symbol, e.g. BTCUSDT"),
    },
    async ({ symbol }) => {
      try {
        const data = await client.signedRequest(
          "GET",
          "/fapi/v2/positionRisk",
          { symbol },
          "usds_futures"
        );
        return success(data);
      } catch (err) {
        return error(err);
      }
    }
  );

  // 13. Set leverage
  server.tool(
    "usds_futures_set_leverage",
    "Set leverage for a USDS-M futures symbol (1-125)",
    {
      symbol: z.string().describe("Trading pair symbol, e.g. BTCUSDT"),
      leverage: z.number().describe("Target leverage (1-125)"),
    },
    async ({ symbol, leverage }) => {
      try {
        const data = await client.signedRequest(
          "POST",
          "/fapi/v1/leverage",
          { symbol, leverage },
          "usds_futures"
        );
        return success(data);
      } catch (err) {
        return error(err);
      }
    }
  );

  // 14. Set margin type
  server.tool(
    "usds_futures_set_margin_type",
    "Set margin type (ISOLATED or CROSSED) for a USDS-M futures symbol",
    {
      symbol: z.string().describe("Trading pair symbol, e.g. BTCUSDT"),
      marginType: z
        .enum(["ISOLATED", "CROSSED"])
        .describe("Margin type: ISOLATED or CROSSED"),
    },
    async ({ symbol, marginType }) => {
      try {
        const data = await client.signedRequest(
          "POST",
          "/fapi/v1/marginType",
          { symbol, marginType },
          "usds_futures"
        );
        return success(data);
      } catch (err) {
        return error(err);
      }
    }
  );
}
