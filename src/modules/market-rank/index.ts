import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { BinanceClient } from "../../core/client.js";
import { registerMarketRankTools } from "./tools.js";

export function registerMarketRankModule(
  server: McpServer,
  client: BinanceClient
): void {
  registerMarketRankTools(server, client);
}
