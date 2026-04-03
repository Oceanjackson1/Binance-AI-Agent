import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { BinanceClient } from "../../core/client.js";
import { registerMemeRushTools } from "./tools.js";

export function registerMemeRushModule(
  server: McpServer,
  client: BinanceClient
): void {
  registerMemeRushTools(server, client);
}
