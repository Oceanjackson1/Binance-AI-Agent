import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { BinanceClient } from "../../core/client.js";
import { success, error } from "../../utils/formatting.js";

export function registerTokenAuditTools(
  server: McpServer,
  client: BinanceClient
): void {
  // 1. Scan token contract for security issues
  server.tool(
    "token_audit_scan",
    "Scan a token contract for security issues and risks",
    {
      contractAddress: z.string().describe("Token contract address to audit"),
      chain: z.string().describe("Blockchain network, e.g. ETH, BSC, SOL"),
    },
    async ({ contractAddress, chain }) => {
      try {
        const data = await client.publicRequest(
          "GET",
          "/bapi/composite/v1/public/market/token/audit",
          { contractAddress, chain },
          "spot"
        );
        return success(data);
      } catch (err) {
        return error(err);
      }
    }
  );

  // 2. Check if token is a honeypot
  server.tool(
    "token_audit_check_honeypot",
    "Check if a token contract is a honeypot (unable to sell after buying)",
    {
      contractAddress: z.string().describe("Token contract address to check"),
      chain: z.string().describe("Blockchain network, e.g. ETH, BSC, SOL"),
    },
    async ({ contractAddress, chain }) => {
      try {
        const data = await client.publicRequest(
          "GET",
          "/bapi/composite/v1/public/market/token/honeypot",
          { contractAddress, chain },
          "spot"
        );
        return success(data);
      } catch (err) {
        return error(err);
      }
    }
  );

  // 3. Get full audit report
  server.tool(
    "token_audit_get_report",
    "Get a comprehensive audit report for a token contract",
    {
      contractAddress: z.string().describe("Token contract address"),
      chain: z.string().describe("Blockchain network, e.g. ETH, BSC, SOL"),
    },
    async ({ contractAddress, chain }) => {
      try {
        const data = await client.publicRequest(
          "GET",
          "/bapi/composite/v1/public/market/token/audit/report",
          { contractAddress, chain },
          "spot"
        );
        return success(data);
      } catch (err) {
        return error(err);
      }
    }
  );
}
