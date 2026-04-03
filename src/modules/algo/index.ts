import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { BinanceClient } from "../../core/client.js";
import { registerAlgoTools } from "./tools.js";

export function registerAlgoModule(
  server: McpServer,
  client: BinanceClient
): void {
  registerAlgoTools(server, client);
}
