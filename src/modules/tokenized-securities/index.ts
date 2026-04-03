import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { BinanceClient } from "../../core/client.js";
import { registerTokenizedSecuritiesTools } from "./tools.js";

export function registerTokenizedSecuritiesModule(
  server: McpServer,
  client: BinanceClient
): void {
  registerTokenizedSecuritiesTools(server, client);
}
