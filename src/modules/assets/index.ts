import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { BinanceClient } from "../../core/client.js";
import { registerAssetsTools } from "./tools.js";

export function registerAssetsModule(
  server: McpServer,
  client: BinanceClient
): void {
  registerAssetsTools(server, client);
}
