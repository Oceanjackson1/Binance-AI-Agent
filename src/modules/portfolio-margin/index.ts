import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { BinanceClient } from "../../core/client.js";
import { registerPortfolioMarginTools } from "./tools.js";

export function registerPortfolioMarginModule(
  server: McpServer,
  client: BinanceClient
): void {
  registerPortfolioMarginTools(server, client);
}
