import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { BinanceClient } from "../../core/client.js";
import { success, error } from "../../utils/formatting.js";

export function registerMemeRushTools(
  server: McpServer,
  client: BinanceClient
): void {
  // 1. Get trending meme tokens
  server.tool(
    "meme_rush_get_trending",
    "Get currently trending meme tokens",
    {
      chain: z
        .string()
        .optional()
        .describe("Blockchain network filter, e.g. ETH, BSC, SOL"),
      limit: z
        .number()
        .optional()
        .describe("Number of results to return"),
    },
    async ({ chain, limit }) => {
      try {
        const data = await client.publicRequest(
          "GET",
          "/bapi/composite/v1/public/market/meme/trending",
          { chain, limit },
          "spot"
        );
        return success(data);
      } catch (err) {
        return error(err);
      }
    }
  );

  // 2. Get meme token detail
  server.tool(
    "meme_rush_get_token_detail",
    "Get detailed information about a specific meme token",
    {
      contractAddress: z.string().describe("Meme token contract address"),
      chain: z.string().describe("Blockchain network, e.g. ETH, BSC, SOL"),
    },
    async ({ contractAddress, chain }) => {
      try {
        const data = await client.publicRequest(
          "GET",
          "/bapi/composite/v1/public/market/meme/detail",
          { contractAddress, chain },
          "spot"
        );
        return success(data);
      } catch (err) {
        return error(err);
      }
    }
  );

  // 3. Buy meme token
  server.tool(
    "meme_rush_buy",
    "\u26a0\ufe0f EXECUTES REAL TRADE - Buy a meme token on-chain",
    {
      contractAddress: z.string().describe("Meme token contract address to buy"),
      chain: z.string().describe("Blockchain network, e.g. ETH, BSC, SOL"),
      amount: z.string().describe("Amount to spend (in native token or quote currency)"),
      slippage: z
        .string()
        .optional()
        .describe("Slippage tolerance percentage, e.g. 5 for 5%"),
    },
    async ({ contractAddress, chain, amount, slippage }) => {
      try {
        const data = await client.signedRequest(
          "POST",
          "/bapi/composite/v1/market/meme/buy",
          { contractAddress, chain, amount, slippage },
          "spot"
        );
        return success(data);
      } catch (err) {
        return error(err);
      }
    }
  );

  // 4. Sell meme token
  server.tool(
    "meme_rush_sell",
    "\u26a0\ufe0f EXECUTES REAL TRADE - Sell a meme token on-chain",
    {
      contractAddress: z.string().describe("Meme token contract address to sell"),
      chain: z.string().describe("Blockchain network, e.g. ETH, BSC, SOL"),
      amount: z.string().describe("Amount of the meme token to sell"),
      slippage: z
        .string()
        .optional()
        .describe("Slippage tolerance percentage, e.g. 5 for 5%"),
    },
    async ({ contractAddress, chain, amount, slippage }) => {
      try {
        const data = await client.signedRequest(
          "POST",
          "/bapi/composite/v1/market/meme/sell",
          { contractAddress, chain, amount, slippage },
          "spot"
        );
        return success(data);
      } catch (err) {
        return error(err);
      }
    }
  );

  // 5. Get meme token portfolio
  server.tool(
    "meme_rush_get_portfolio",
    "Get your meme token portfolio holdings and P&L",
    {
      chain: z
        .string()
        .optional()
        .describe("Blockchain network filter, e.g. ETH, BSC, SOL"),
    },
    async ({ chain }) => {
      try {
        const data = await client.signedRequest(
          "GET",
          "/bapi/composite/v1/market/meme/portfolio",
          { chain },
          "spot"
        );
        return success(data);
      } catch (err) {
        return error(err);
      }
    }
  );
}
