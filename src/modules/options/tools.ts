import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { BinanceClient } from "../../core/client.js";
import { success, error } from "../../utils/formatting.js";

export function registerOptionsTools(
  server: McpServer,
  client: BinanceClient
): void {
  // 1. Place order
  server.tool(
    "options_place_order",
    "Place a new options order. \u26a0\ufe0f EXECUTES REAL TRADE",
    {
      symbol: z.string().describe("Options trading pair symbol, e.g. BTC-250630-100000-C"),
      side: z.enum(["BUY", "SELL"]).describe("Order side"),
      type: z
        .enum(["LIMIT", "MARKET"])
        .describe("Order type"),
      quantity: z.string().describe("Order quantity"),
      price: z.string().optional().describe("Order price (required for LIMIT orders)"),
      timeInForce: z
        .enum(["GTC", "IOC", "FOK"])
        .optional()
        .describe("Time in force (required for LIMIT orders)"),
      reduceOnly: z
        .boolean()
        .optional()
        .describe("Reduce-only order flag"),
      newClientOrderId: z
        .string()
        .optional()
        .describe("Unique client order ID"),
      clientOrderId: z
        .string()
        .optional()
        .describe("Client order ID for identification"),
    },
    async ({
      symbol,
      side,
      type,
      quantity,
      price,
      timeInForce,
      reduceOnly,
      newClientOrderId,
      clientOrderId,
    }) => {
      try {
        const data = await client.signedRequest(
          "POST",
          "/eapi/v1/order",
          {
            symbol,
            side,
            type,
            quantity,
            price,
            timeInForce,
            reduceOnly,
            newClientOrderId,
            clientOrderId,
          },
          "options"
        );
        return success(data);
      } catch (err) {
        return error(err);
      }
    }
  );

  // 2. Cancel order
  server.tool(
    "options_cancel_order",
    "Cancel an existing options order",
    {
      symbol: z.string().describe("Options trading pair symbol, e.g. BTC-250630-100000-C"),
      orderId: z.number().optional().describe("Order ID to cancel"),
      clientOrderId: z
        .string()
        .optional()
        .describe("Client order ID to cancel"),
    },
    async ({ symbol, orderId, clientOrderId }) => {
      try {
        const data = await client.signedRequest(
          "DELETE",
          "/eapi/v1/order",
          { symbol, orderId, clientOrderId },
          "options"
        );
        return success(data);
      } catch (err) {
        return error(err);
      }
    }
  );

  // 3. Cancel all open orders
  server.tool(
    "options_cancel_all",
    "Cancel all open options orders for a symbol",
    {
      symbol: z.string().describe("Options trading pair symbol, e.g. BTC-250630-100000-C"),
    },
    async ({ symbol }) => {
      try {
        const data = await client.signedRequest(
          "DELETE",
          "/eapi/v1/allOpenOrders",
          { symbol },
          "options"
        );
        return success(data);
      } catch (err) {
        return error(err);
      }
    }
  );

  // 4. Query order
  server.tool(
    "options_get_order",
    "Query a specific options order by orderId or clientOrderId",
    {
      symbol: z.string().describe("Options trading pair symbol, e.g. BTC-250630-100000-C"),
      orderId: z.number().optional().describe("Order ID"),
      clientOrderId: z
        .string()
        .optional()
        .describe("Client order ID"),
    },
    async ({ symbol, orderId, clientOrderId }) => {
      try {
        const data = await client.signedRequest(
          "GET",
          "/eapi/v1/order",
          { symbol, orderId, clientOrderId },
          "options"
        );
        return success(data);
      } catch (err) {
        return error(err);
      }
    }
  );

  // 5. Get open orders
  server.tool(
    "options_get_open_orders",
    "Get all open options orders, optionally filtered by symbol",
    {
      symbol: z.string().optional().describe("Options trading pair symbol, e.g. BTC-250630-100000-C"),
    },
    async ({ symbol }) => {
      try {
        const data = await client.signedRequest(
          "GET",
          "/eapi/v1/openOrders",
          { symbol },
          "options"
        );
        return success(data);
      } catch (err) {
        return error(err);
      }
    }
  );

  // 6. Get positions
  server.tool(
    "options_get_positions",
    "Get current options position information, optionally filtered by symbol",
    {
      symbol: z.string().optional().describe("Options trading pair symbol, e.g. BTC-250630-100000-C"),
    },
    async ({ symbol }) => {
      try {
        const data = await client.signedRequest(
          "GET",
          "/eapi/v1/position",
          { symbol },
          "options"
        );
        return success(data);
      } catch (err) {
        return error(err);
      }
    }
  );

  // 7. Get account information
  server.tool(
    "options_get_account",
    "Get current options account information including balances",
    {},
    async () => {
      try {
        const data = await client.signedRequest(
          "GET",
          "/eapi/v1/account",
          {},
          "options"
        );
        return success(data);
      } catch (err) {
        return error(err);
      }
    }
  );

  // 8. Get user trades
  server.tool(
    "options_get_trades",
    "Get options trade history, optionally filtered by symbol, orderId, or time range",
    {
      symbol: z.string().optional().describe("Options trading pair symbol, e.g. BTC-250630-100000-C"),
      orderId: z.number().optional().describe("Filter trades by order ID"),
      startTime: z.number().optional().describe("Start time in ms"),
      endTime: z.number().optional().describe("End time in ms"),
      limit: z
        .number()
        .optional()
        .describe("Number of results (default 100, max 1000)"),
    },
    async ({ symbol, orderId, startTime, endTime, limit }) => {
      try {
        const data = await client.signedRequest(
          "GET",
          "/eapi/v1/userTrades",
          { symbol, orderId, startTime, endTime, limit },
          "options"
        );
        return success(data);
      } catch (err) {
        return error(err);
      }
    }
  );
}
