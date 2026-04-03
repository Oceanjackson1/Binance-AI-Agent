import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { BinanceClient } from "../../core/client.js";
import { success, error } from "../../utils/formatting.js";

export function registerAlgoTools(
  server: McpServer,
  client: BinanceClient
): void {
  // 1. Place spot TWAP order
  server.tool(
    "algo_spot_twap",
    "Place a spot TWAP (Time-Weighted Average Price) algo order. \u26a0\ufe0f EXECUTES REAL TRADE",
    {
      symbol: z.string().describe("Trading pair symbol, e.g. BTCUSDT"),
      side: z.enum(["BUY", "SELL"]).describe("Order side"),
      quantity: z.string().describe("Order quantity"),
      duration: z.number().describe("Duration in seconds (min 300, max 86400)"),
      clientAlgoId: z
        .string()
        .optional()
        .describe("Custom algo order ID"),
    },
    async ({ symbol, side, quantity, duration, clientAlgoId }) => {
      try {
        const data = await client.signedRequest(
          "POST",
          "/sapi/v1/algo/spot/newOrderTwap",
          { symbol, side, quantity, duration, clientAlgoId },
          "sapi"
        );
        return success(data);
      } catch (err) {
        return error(err);
      }
    }
  );

  // 2. Cancel spot algo order
  server.tool(
    "algo_spot_cancel",
    "Cancel an active spot algo order",
    {
      algoId: z.number().describe("Algo order ID to cancel"),
    },
    async ({ algoId }) => {
      try {
        const data = await client.signedRequest(
          "DELETE",
          "/sapi/v1/algo/spot/order",
          { algoId },
          "sapi"
        );
        return success(data);
      } catch (err) {
        return error(err);
      }
    }
  );

  // 3. Get spot algo open orders
  server.tool(
    "algo_spot_open_orders",
    "Get all active spot algo orders",
    {},
    async () => {
      try {
        const data = await client.signedRequest(
          "GET",
          "/sapi/v1/algo/spot/openOrders",
          {},
          "sapi"
        );
        return success(data);
      } catch (err) {
        return error(err);
      }
    }
  );

  // 4. Get spot algo order history
  server.tool(
    "algo_spot_history",
    "Get historical spot algo orders",
    {
      symbol: z.string().optional().describe("Filter by trading pair symbol"),
      side: z.enum(["BUY", "SELL"]).optional().describe("Filter by order side"),
      startTime: z.number().optional().describe("Start time in ms"),
      endTime: z.number().optional().describe("End time in ms"),
      page: z.number().optional().describe("Page number (default 1)"),
      pageSize: z
        .number()
        .optional()
        .describe("Results per page (default 100, max 100)"),
    },
    async ({ symbol, side, startTime, endTime, page, pageSize }) => {
      try {
        const data = await client.signedRequest(
          "GET",
          "/sapi/v1/algo/spot/historicalOrders",
          { symbol, side, startTime, endTime, page, pageSize },
          "sapi"
        );
        return success(data);
      } catch (err) {
        return error(err);
      }
    }
  );

  // 5. Get spot algo sub orders
  server.tool(
    "algo_spot_sub_orders",
    "Get sub orders of a spot algo order",
    {
      algoId: z.number().describe("Algo order ID"),
      page: z.number().optional().describe("Page number (default 1)"),
      pageSize: z
        .number()
        .optional()
        .describe("Results per page (default 100, max 100)"),
    },
    async ({ algoId, page, pageSize }) => {
      try {
        const data = await client.signedRequest(
          "GET",
          "/sapi/v1/algo/spot/subOrders",
          { algoId, page, pageSize },
          "sapi"
        );
        return success(data);
      } catch (err) {
        return error(err);
      }
    }
  );

  // 6. Place futures TWAP order
  server.tool(
    "algo_futures_twap",
    "Place a futures TWAP (Time-Weighted Average Price) algo order. \u26a0\ufe0f EXECUTES REAL TRADE",
    {
      symbol: z.string().describe("Trading pair symbol, e.g. BTCUSDT"),
      side: z.enum(["BUY", "SELL"]).describe("Order side"),
      quantity: z.string().describe("Order quantity"),
      duration: z.number().describe("Duration in seconds (min 300, max 86400)"),
      positionSide: z
        .enum(["BOTH", "LONG", "SHORT"])
        .optional()
        .describe("Position side for hedge mode"),
      clientAlgoId: z
        .string()
        .optional()
        .describe("Custom algo order ID"),
    },
    async ({ symbol, side, quantity, duration, positionSide, clientAlgoId }) => {
      try {
        const data = await client.signedRequest(
          "POST",
          "/sapi/v1/algo/futures/newOrderTwap",
          { symbol, side, quantity, duration, positionSide, clientAlgoId },
          "sapi"
        );
        return success(data);
      } catch (err) {
        return error(err);
      }
    }
  );

  // 7. Place futures VP order
  server.tool(
    "algo_futures_vp",
    "Place a futures VP (Volume Participation) algo order. \u26a0\ufe0f EXECUTES REAL TRADE",
    {
      symbol: z.string().describe("Trading pair symbol, e.g. BTCUSDT"),
      side: z.enum(["BUY", "SELL"]).describe("Order side"),
      quantity: z.string().describe("Order quantity"),
      urgency: z
        .enum(["LOW", "MEDIUM", "HIGH"])
        .describe("Execution urgency"),
      positionSide: z
        .enum(["BOTH", "LONG", "SHORT"])
        .optional()
        .describe("Position side for hedge mode"),
      clientAlgoId: z
        .string()
        .optional()
        .describe("Custom algo order ID"),
    },
    async ({ symbol, side, quantity, urgency, positionSide, clientAlgoId }) => {
      try {
        const data = await client.signedRequest(
          "POST",
          "/sapi/v1/algo/futures/newOrderVp",
          { symbol, side, quantity, urgency, positionSide, clientAlgoId },
          "sapi"
        );
        return success(data);
      } catch (err) {
        return error(err);
      }
    }
  );

  // 8. Cancel futures algo order
  server.tool(
    "algo_futures_cancel",
    "Cancel an active futures algo order",
    {
      algoId: z.number().describe("Algo order ID to cancel"),
    },
    async ({ algoId }) => {
      try {
        const data = await client.signedRequest(
          "DELETE",
          "/sapi/v1/algo/futures/order",
          { algoId },
          "sapi"
        );
        return success(data);
      } catch (err) {
        return error(err);
      }
    }
  );

  // 9. Get futures algo open orders
  server.tool(
    "algo_futures_open_orders",
    "Get all active futures algo orders",
    {},
    async () => {
      try {
        const data = await client.signedRequest(
          "GET",
          "/sapi/v1/algo/futures/openOrders",
          {},
          "sapi"
        );
        return success(data);
      } catch (err) {
        return error(err);
      }
    }
  );

  // 10. Get futures algo order history
  server.tool(
    "algo_futures_history",
    "Get historical futures algo orders",
    {
      symbol: z.string().optional().describe("Filter by trading pair symbol"),
      side: z.enum(["BUY", "SELL"]).optional().describe("Filter by order side"),
      startTime: z.number().optional().describe("Start time in ms"),
      endTime: z.number().optional().describe("End time in ms"),
      page: z.number().optional().describe("Page number (default 1)"),
      pageSize: z
        .number()
        .optional()
        .describe("Results per page (default 100, max 100)"),
    },
    async ({ symbol, side, startTime, endTime, page, pageSize }) => {
      try {
        const data = await client.signedRequest(
          "GET",
          "/sapi/v1/algo/futures/historicalOrders",
          { symbol, side, startTime, endTime, page, pageSize },
          "sapi"
        );
        return success(data);
      } catch (err) {
        return error(err);
      }
    }
  );
}
