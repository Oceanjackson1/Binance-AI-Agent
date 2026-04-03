import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { BinanceClient } from "../../core/client.js";
import { registerSquarePostTools } from "./tools.js";

export function registerSquarePostModule(
  server: McpServer,
  client: BinanceClient
): void {
  registerSquarePostTools(server, client);
}
