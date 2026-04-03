import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { BinanceClient } from "../../core/client.js";
import { success, error } from "../../utils/formatting.js";

export function registerFiatTools(
  server: McpServer,
  client: BinanceClient
): void {
  // 1. Get fiat deposit/withdraw order history
  server.tool(
    "fiat_get_orders",
    "Get fiat deposit and withdrawal order history",
    {
      transactionType: z
        .string()
        .describe("Transaction type: 0 = deposit, 1 = withdraw"),
      beginTime: z
        .number()
        .optional()
        .describe("Start time in ms"),
      endTime: z
        .number()
        .optional()
        .describe("End time in ms"),
      page: z
        .number()
        .optional()
        .describe("Page number (default 1)"),
      rows: z
        .number()
        .optional()
        .describe("Number of rows per page (default 100, max 500)"),
    },
    async ({ transactionType, beginTime, endTime, page, rows }) => {
      try {
        const data = await client.signedRequest(
          "GET",
          "/sapi/v1/fiat/orders",
          { transactionType, beginTime, endTime, page, rows },
          "sapi"
        );
        return success(data);
      } catch (err) {
        return error(err);
      }
    }
  );

  // 2. Get fiat buy/sell payment history
  server.tool(
    "fiat_get_payments",
    "Get fiat buy/sell payment history",
    {
      transactionType: z
        .string()
        .describe("Transaction type: 0 = buy, 1 = sell"),
      beginTime: z
        .number()
        .optional()
        .describe("Start time in ms"),
      endTime: z
        .number()
        .optional()
        .describe("End time in ms"),
      page: z
        .number()
        .optional()
        .describe("Page number (default 1)"),
      rows: z
        .number()
        .optional()
        .describe("Number of rows per page (default 100, max 500)"),
    },
    async ({ transactionType, beginTime, endTime, page, rows }) => {
      try {
        const data = await client.signedRequest(
          "GET",
          "/sapi/v1/fiat/payments",
          { transactionType, beginTime, endTime, page, rows },
          "sapi"
        );
        return success(data);
      } catch (err) {
        return error(err);
      }
    }
  );
}
