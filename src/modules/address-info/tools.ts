import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { BinanceClient } from "../../core/client.js";
import { success, error } from "../../utils/formatting.js";

export function registerAddressInfoTools(
  server: McpServer,
  client: BinanceClient
): void {
  // 1. Get address portfolio
  server.tool(
    "address_info_get_portfolio",
    "Get the token portfolio/holdings for a blockchain address",
    {
      address: z.string().describe("Blockchain address to look up"),
      chain: z
        .string()
        .optional()
        .describe("Blockchain network, e.g. ETH, BSC, SOL"),
    },
    async ({ address, chain }) => {
      try {
        const data = await client.publicRequest(
          "GET",
          "/bapi/composite/v1/public/market/address/portfolio",
          { address, chain },
          "spot"
        );
        return success(data);
      } catch (err) {
        return error(err);
      }
    }
  );

  // 2. Get address transactions
  server.tool(
    "address_info_get_transactions",
    "Get transaction history for a blockchain address",
    {
      address: z.string().describe("Blockchain address to look up"),
      chain: z
        .string()
        .optional()
        .describe("Blockchain network, e.g. ETH, BSC, SOL"),
      page: z
        .number()
        .optional()
        .describe("Page number (default 1)"),
      size: z
        .number()
        .optional()
        .describe("Number of results per page"),
    },
    async ({ address, chain, page, size }) => {
      try {
        const data = await client.publicRequest(
          "GET",
          "/bapi/composite/v1/public/market/address/transactions",
          { address, chain, page, size },
          "spot"
        );
        return success(data);
      } catch (err) {
        return error(err);
      }
    }
  );

  // 3. Analyze address
  server.tool(
    "address_info_analyze",
    "Analyze a blockchain address for risk assessment and labeling",
    {
      address: z.string().describe("Blockchain address to analyze"),
      chain: z
        .string()
        .optional()
        .describe("Blockchain network, e.g. ETH, BSC, SOL"),
    },
    async ({ address, chain }) => {
      try {
        const data = await client.publicRequest(
          "GET",
          "/bapi/composite/v1/public/market/address/analyze",
          { address, chain },
          "spot"
        );
        return success(data);
      } catch (err) {
        return error(err);
      }
    }
  );
}
