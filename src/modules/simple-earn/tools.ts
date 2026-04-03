import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { BinanceClient } from "../../core/client.js";
import { success, error } from "../../utils/formatting.js";

export function registerSimpleEarnTools(
  server: McpServer,
  client: BinanceClient
): void {
  // 1. Get flexible product list
  server.tool(
    "simple_earn_get_flexible_list",
    "Get available Simple Earn flexible products list",
    {
      asset: z.string().optional().describe("Filter by asset, e.g. BTC"),
      current: z.number().optional().describe("Current page (default 1)"),
      size: z.number().optional().describe("Page size (default 10, max 100)"),
    },
    async ({ asset, current, size }) => {
      try {
        const data = await client.signedRequest(
          "GET",
          "/sapi/v1/simple-earn/flexible/list",
          { asset, current, size },
          "sapi"
        );
        return success(data);
      } catch (err) {
        return error(err);
      }
    }
  );

  // 2. Get locked product list
  server.tool(
    "simple_earn_get_locked_list",
    "Get available Simple Earn locked products list",
    {
      asset: z.string().optional().describe("Filter by asset, e.g. BTC"),
      current: z.number().optional().describe("Current page (default 1)"),
      size: z.number().optional().describe("Page size (default 10, max 100)"),
    },
    async ({ asset, current, size }) => {
      try {
        const data = await client.signedRequest(
          "GET",
          "/sapi/v1/simple-earn/locked/list",
          { asset, current, size },
          "sapi"
        );
        return success(data);
      } catch (err) {
        return error(err);
      }
    }
  );

  // 3. Subscribe to flexible product
  server.tool(
    "simple_earn_subscribe_flexible",
    "\u26a0\ufe0f EXECUTES REAL SUBSCRIPTION - Subscribe to a Simple Earn flexible product",
    {
      productId: z.string().describe("Flexible product ID"),
      amount: z.string().describe("Subscription amount"),
      autoSubscribe: z
        .boolean()
        .optional()
        .describe("Enable auto-subscribe (default true)"),
    },
    async ({ productId, amount, autoSubscribe }) => {
      try {
        const data = await client.signedRequest(
          "POST",
          "/sapi/v1/simple-earn/flexible/subscribe",
          { productId, amount, autoSubscribe },
          "sapi"
        );
        return success(data);
      } catch (err) {
        return error(err);
      }
    }
  );

  // 4. Subscribe to locked product
  server.tool(
    "simple_earn_subscribe_locked",
    "\u26a0\ufe0f EXECUTES REAL SUBSCRIPTION - Subscribe to a Simple Earn locked product",
    {
      projectId: z.string().describe("Locked product project ID"),
      amount: z.string().describe("Subscription amount"),
      autoSubscribe: z
        .boolean()
        .optional()
        .describe("Enable auto-subscribe (default true)"),
    },
    async ({ projectId, amount, autoSubscribe }) => {
      try {
        const data = await client.signedRequest(
          "POST",
          "/sapi/v1/simple-earn/locked/subscribe",
          { projectId, amount, autoSubscribe },
          "sapi"
        );
        return success(data);
      } catch (err) {
        return error(err);
      }
    }
  );

  // 5. Redeem flexible product
  server.tool(
    "simple_earn_redeem_flexible",
    "\u26a0\ufe0f EXECUTES REAL REDEMPTION - Redeem from a Simple Earn flexible product",
    {
      productId: z.string().describe("Flexible product ID"),
      amount: z
        .string()
        .optional()
        .describe("Redemption amount (required if redeemAll is false)"),
      redeemAll: z
        .boolean()
        .optional()
        .describe("Redeem all holdings (default false)"),
    },
    async ({ productId, amount, redeemAll }) => {
      try {
        const data = await client.signedRequest(
          "POST",
          "/sapi/v1/simple-earn/flexible/redeem",
          { productId, amount, redeemAll },
          "sapi"
        );
        return success(data);
      } catch (err) {
        return error(err);
      }
    }
  );

  // 6. Get flexible position
  server.tool(
    "simple_earn_get_flexible_position",
    "Get Simple Earn flexible product position",
    {
      asset: z.string().optional().describe("Filter by asset, e.g. BTC"),
      current: z.number().optional().describe("Current page (default 1)"),
      size: z.number().optional().describe("Page size (default 10, max 100)"),
    },
    async ({ asset, current, size }) => {
      try {
        const data = await client.signedRequest(
          "GET",
          "/sapi/v1/simple-earn/flexible/position",
          { asset, current, size },
          "sapi"
        );
        return success(data);
      } catch (err) {
        return error(err);
      }
    }
  );

  // 7. Get locked position
  server.tool(
    "simple_earn_get_locked_position",
    "Get Simple Earn locked product position",
    {
      asset: z.string().optional().describe("Filter by asset, e.g. BTC"),
      current: z.number().optional().describe("Current page (default 1)"),
      size: z.number().optional().describe("Page size (default 10, max 100)"),
    },
    async ({ asset, current, size }) => {
      try {
        const data = await client.signedRequest(
          "GET",
          "/sapi/v1/simple-earn/locked/position",
          { asset, current, size },
          "sapi"
        );
        return success(data);
      } catch (err) {
        return error(err);
      }
    }
  );

  // 8. Get rewards history
  server.tool(
    "simple_earn_get_rewards",
    "Get Simple Earn flexible rewards history",
    {
      type: z
        .string()
        .optional()
        .describe("Reward type, e.g. BONUS, REALTIME, REWARDS"),
      asset: z.string().optional().describe("Filter by asset, e.g. BTC"),
      startTime: z.number().optional().describe("Start time in ms"),
      endTime: z.number().optional().describe("End time in ms"),
    },
    async ({ type, asset, startTime, endTime }) => {
      try {
        const data = await client.signedRequest(
          "GET",
          "/sapi/v1/simple-earn/flexible/history/rewardsRecord",
          { type, asset, startTime, endTime },
          "sapi"
        );
        return success(data);
      } catch (err) {
        return error(err);
      }
    }
  );
}
