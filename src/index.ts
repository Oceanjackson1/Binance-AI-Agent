import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { BinanceClient } from "./core/client.js";
import { loadConfig } from "./core/config.js";
import { createServer } from "./server.js";
import { registerAllModules } from "./modules/index.js";
import { logger } from "./utils/logger.js";

async function main() {
  const config = loadConfig();
  const client = new BinanceClient(config);
  const server = createServer();

  registerAllModules(server, client);

  const transport = new StdioServerTransport();
  await server.connect(transport);

  logger.info(
    `Binance Skills Hub MCP Server started (env: ${config.environment})`
  );
}

main().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
