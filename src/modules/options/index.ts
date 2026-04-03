import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { BinanceClient } from "../../core/client.js";
import { registerOptionsTools } from "./tools.js";

export function registerOptionsModule(
  server: McpServer,
  client: BinanceClient
): void {
  registerOptionsTools(server, client);
}
