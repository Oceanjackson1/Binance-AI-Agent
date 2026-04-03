import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { BinanceClient } from "../../core/client.js";
import { registerTradingSignalTools } from "./tools.js";

export function registerTradingSignalModule(
  server: McpServer,
  client: BinanceClient
): void {
  registerTradingSignalTools(server, client);
}
