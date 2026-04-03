import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

export function createServer(): McpServer {
  return new McpServer({
    name: "binance-skills-hub",
    version: "1.0.0",
  });
}
