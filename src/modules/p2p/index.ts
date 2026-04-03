import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { BinanceClient } from "../../core/client.js";
import { registerP2pTools } from "./tools.js";

export function registerP2pModule(
  server: McpServer,
  client: BinanceClient
): void {
  registerP2pTools(server, client);
}
