import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { BinanceClient } from "../../core/client.js";
import { registerAddressInfoTools } from "./tools.js";

export function registerAddressInfoModule(
  server: McpServer,
  client: BinanceClient
): void {
  registerAddressInfoTools(server, client);
}
