import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { BinanceClient } from "../../core/client.js";
import { registerSimpleEarnTools } from "./tools.js";

export function registerSimpleEarnModule(
  server: McpServer,
  client: BinanceClient
): void {
  registerSimpleEarnTools(server, client);
}
