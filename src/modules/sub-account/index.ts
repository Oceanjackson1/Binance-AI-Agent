import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { BinanceClient } from "../../core/client.js";
import { registerSubAccountTools } from "./tools.js";

export function registerSubAccountModule(
  server: McpServer,
  client: BinanceClient
): void {
  registerSubAccountTools(server, client);
}
