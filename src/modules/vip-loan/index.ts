import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { BinanceClient } from "../../core/client.js";
import { registerVipLoanTools } from "./tools.js";

export function registerVipLoanModule(
  server: McpServer,
  client: BinanceClient
): void {
  registerVipLoanTools(server, client);
}
