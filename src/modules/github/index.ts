import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { registerGitHubTools } from "./tools.js";

export function registerGitHubModule(server: McpServer) {
  registerGitHubTools(server);
}
