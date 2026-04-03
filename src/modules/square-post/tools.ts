import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { BinanceClient } from "../../core/client.js";
import { success, error } from "../../utils/formatting.js";

export function registerSquarePostTools(
  server: McpServer,
  client: BinanceClient
): void {
  // 1. Create a square post
  server.tool(
    "square_post_create",
    "\u26a0\ufe0f CREATES REAL CONTENT - Create a new post on Binance Square",
    {
      content: z.string().describe("Post content text"),
      tags: z
        .array(z.string())
        .optional()
        .describe("Tags for the post, e.g. ['BTC', 'Trading']"),
    },
    async ({ content, tags }) => {
      try {
        const data = await client.signedRequest(
          "POST",
          "/bapi/composite/v1/market/square/post",
          { content, tags: tags?.join(",") },
          "spot"
        );
        return success(data);
      } catch (err) {
        return error(err);
      }
    }
  );

  // 2. Get square feed
  server.tool(
    "square_post_get_feed",
    "Get the Binance Square content feed",
    {
      page: z
        .number()
        .optional()
        .describe("Page number (default 1)"),
      size: z
        .number()
        .optional()
        .describe("Number of results per page"),
      tag: z
        .string()
        .optional()
        .describe("Filter by tag, e.g. BTC"),
    },
    async ({ page, size, tag }) => {
      try {
        const data = await client.publicRequest(
          "GET",
          "/bapi/composite/v1/public/market/square/feed",
          { page, size, tag },
          "spot"
        );
        return success(data);
      } catch (err) {
        return error(err);
      }
    }
  );

  // 3. Get trending posts
  server.tool(
    "square_post_get_trending",
    "Get trending posts on Binance Square",
    {
      limit: z
        .number()
        .optional()
        .describe("Number of results to return"),
    },
    async ({ limit }) => {
      try {
        const data = await client.publicRequest(
          "GET",
          "/bapi/composite/v1/public/market/square/trending",
          { limit },
          "spot"
        );
        return success(data);
      } catch (err) {
        return error(err);
      }
    }
  );

  // 4. Get user's own posts
  server.tool(
    "square_post_get_user_posts",
    "Get your own Binance Square posts",
    {
      page: z
        .number()
        .optional()
        .describe("Page number (default 1)"),
      size: z
        .number()
        .optional()
        .describe("Number of results per page"),
    },
    async ({ page, size }) => {
      try {
        const data = await client.signedRequest(
          "GET",
          "/bapi/composite/v1/market/square/user-posts",
          { page, size },
          "spot"
        );
        return success(data);
      } catch (err) {
        return error(err);
      }
    }
  );
}
