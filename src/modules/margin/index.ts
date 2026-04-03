import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { BinanceClient } from "../../core/client.js";
import { registerMarginTools } from "./tools.js";

export function registerMarginModule(
  server: McpServer,
  client: BinanceClient
): void {
  registerMarginTools(server, client);
}
