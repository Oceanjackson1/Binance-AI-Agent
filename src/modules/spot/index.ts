import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { BinanceClient } from "../../core/client.js";
import { registerSpotTools } from "./tools.js";

export function registerSpotModule(
  server: McpServer,
  client: BinanceClient
): void {
  registerSpotTools(server, client);
}
