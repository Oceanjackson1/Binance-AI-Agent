import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { BinanceClient } from "../../core/client.js";
import { registerPortfolioMarginProTools } from "./tools.js";

export function registerPortfolioMarginProModule(
  server: McpServer,
  client: BinanceClient
): void {
  registerPortfolioMarginProTools(server, client);
}
