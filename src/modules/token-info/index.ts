import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { BinanceClient } from "../../core/client.js";
import { registerTokenInfoTools } from "./tools.js";

export function registerTokenInfoModule(
  server: McpServer,
  client: BinanceClient
): void {
  registerTokenInfoTools(server, client);
}
