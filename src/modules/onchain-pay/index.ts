import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { BinanceClient } from "../../core/client.js";
import { registerOnchainPayTools } from "./tools.js";

export function registerOnchainPayModule(
  server: McpServer,
  client: BinanceClient
): void {
  registerOnchainPayTools(server, client);
}
