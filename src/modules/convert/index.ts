import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { BinanceClient } from "../../core/client.js";
import { registerConvertTools } from "./tools.js";

export function registerConvertModule(
  server: McpServer,
  client: BinanceClient
): void {
  registerConvertTools(server, client);
}
