import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { BinanceClient } from "../../core/client.js";
import { registerTokenAuditTools } from "./tools.js";

export function registerTokenAuditModule(
  server: McpServer,
  client: BinanceClient
): void {
  registerTokenAuditTools(server, client);
}
