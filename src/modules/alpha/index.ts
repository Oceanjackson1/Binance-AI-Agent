import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { BinanceClient } from "../../core/client.js";
import { registerAlphaTools } from "./tools.js";

export function registerAlphaModule(
  server: McpServer,
  client: BinanceClient
): void {
  registerAlphaTools(server, client);
}
