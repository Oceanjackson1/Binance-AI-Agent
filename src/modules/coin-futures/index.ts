import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { BinanceClient } from "../../core/client.js";
import { registerCoinFuturesTools } from "./tools.js";

export function registerCoinFuturesModule(
  server: McpServer,
  client: BinanceClient
): void {
  registerCoinFuturesTools(server, client);
}
