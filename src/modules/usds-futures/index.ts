import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { BinanceClient } from "../../core/client.js";
import { registerUsdsFuturesTools } from "./tools.js";

export function registerUsdsFuturesModule(
  server: McpServer,
  client: BinanceClient
): void {
  registerUsdsFuturesTools(server, client);
}
