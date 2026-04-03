import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { BinanceClient } from "../../core/client.js";
import { registerFiatTools } from "./tools.js";

export function registerFiatModule(
  server: McpServer,
  client: BinanceClient
): void {
  registerFiatTools(server, client);
}
