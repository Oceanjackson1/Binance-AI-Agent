import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { BinanceClient } from "../../core/client.js";
import { success, error } from "../../utils/formatting.js";

export function registerAssetsTools(
  server: McpServer,
  client: BinanceClient
): void {
  // 1. Get user asset balances
  server.tool(
    "assets_get_balances",
    "Get balances for all assets or a specific asset in the spot account",
    {
      asset: z
        .string()
        .optional()
        .describe("Asset symbol, e.g. BTC. If omitted, returns all assets with non-zero balance"),
    },
    async ({ asset }) => {
      try {
        const data = await client.signedRequest(
          "POST",
          "/sapi/v3/asset/getUserAsset",
          { asset },
          "sapi"
        );
        return success(data);
      } catch (err) {
        return error(err);
      }
    }
  );

  // 2. Get wallet balance
  server.tool(
    "assets_get_wallet_balance",
    "Get balance for each wallet (spot, funding, etc.) with BTC valuation",
    {},
    async () => {
      try {
        const data = await client.signedRequest(
          "GET",
          "/sapi/v1/asset/wallet/balance",
          {},
          "sapi"
        );
        return success(data);
      } catch (err) {
        return error(err);
      }
    }
  );

  // 3. Get asset detail
  server.tool(
    "assets_get_detail",
    "Get details for all assets or a specific asset (min withdraw amount, deposit/withdraw status, fees)",
    {
      asset: z
        .string()
        .optional()
        .describe("Asset symbol, e.g. BTC. If omitted, returns details for all assets"),
    },
    async ({ asset }) => {
      try {
        const data = await client.signedRequest(
          "GET",
          "/sapi/v1/asset/assetDetail",
          { asset },
          "sapi"
        );
        return success(data);
      } catch (err) {
        return error(err);
      }
    }
  );

  // 4. Transfer between wallets
  server.tool(
    "assets_transfer",
    "Transfer assets between wallets (e.g. spot to futures). \u26a0\ufe0f EXECUTES REAL TRANSFER",
    {
      type: z
        .string()
        .describe(
          "Transfer type, e.g. MAIN_UMFUTURE, UMFUTURE_MAIN, MAIN_CMFUTURE, CMFUTURE_MAIN, MAIN_MARGIN, MARGIN_MAIN, MAIN_FUNDING, FUNDING_MAIN, etc."
        ),
      asset: z.string().describe("Asset symbol, e.g. USDT"),
      amount: z.string().describe("Transfer amount"),
    },
    async ({ type, asset, amount }) => {
      try {
        const data = await client.signedRequest(
          "POST",
          "/sapi/v1/asset/transfer",
          { type, asset, amount },
          "sapi"
        );
        return success(data);
      } catch (err) {
        return error(err);
      }
    }
  );

  // 5. Get transfer history
  server.tool(
    "assets_get_transfer_history",
    "Get transfer history between wallets",
    {
      type: z
        .string()
        .describe(
          "Transfer type, e.g. MAIN_UMFUTURE, UMFUTURE_MAIN, MAIN_CMFUTURE, CMFUTURE_MAIN, MAIN_MARGIN, MARGIN_MAIN, MAIN_FUNDING, FUNDING_MAIN, etc."
        ),
      startTime: z.number().optional().describe("Start time in ms"),
      endTime: z.number().optional().describe("End time in ms"),
      current: z.number().optional().describe("Current page (default 1)"),
      size: z.number().optional().describe("Page size (default 10, max 100)"),
    },
    async ({ type, startTime, endTime, current, size }) => {
      try {
        const data = await client.signedRequest(
          "GET",
          "/sapi/v1/asset/transfer",
          { type, startTime, endTime, current, size },
          "sapi"
        );
        return success(data);
      } catch (err) {
        return error(err);
      }
    }
  );

  // 6. Get deposit history
  server.tool(
    "assets_get_deposit_history",
    "Get deposit history, optionally filtered by coin and status",
    {
      coin: z.string().optional().describe("Coin symbol, e.g. BTC"),
      status: z
        .number()
        .optional()
        .describe("Deposit status: 0 = pending, 6 = credited, 1 = success"),
      startTime: z.number().optional().describe("Start time in ms"),
      endTime: z.number().optional().describe("End time in ms"),
      limit: z
        .number()
        .optional()
        .describe("Number of results (default 1000, max 1000)"),
    },
    async ({ coin, status, startTime, endTime, limit }) => {
      try {
        const data = await client.signedRequest(
          "GET",
          "/sapi/v1/capital/deposit/hisrec",
          { coin, status, startTime, endTime, limit },
          "sapi"
        );
        return success(data);
      } catch (err) {
        return error(err);
      }
    }
  );

  // 7. Get withdraw history
  server.tool(
    "assets_get_withdraw_history",
    "Get withdraw history, optionally filtered by coin and status",
    {
      coin: z.string().optional().describe("Coin symbol, e.g. BTC"),
      status: z
        .number()
        .optional()
        .describe(
          "Withdraw status: 0 = email sent, 1 = cancelled, 2 = awaiting approval, 3 = rejected, 4 = processing, 5 = failure, 6 = completed"
        ),
      startTime: z.number().optional().describe("Start time in ms"),
      endTime: z.number().optional().describe("End time in ms"),
      limit: z
        .number()
        .optional()
        .describe("Number of results (default 1000, max 1000)"),
    },
    async ({ coin, status, startTime, endTime, limit }) => {
      try {
        const data = await client.signedRequest(
          "GET",
          "/sapi/v1/capital/withdraw/history",
          { coin, status, startTime, endTime, limit },
          "sapi"
        );
        return success(data);
      } catch (err) {
        return error(err);
      }
    }
  );

  // 8. Withdraw
  server.tool(
    "assets_withdraw",
    "Submit a withdraw request. \u26a0\ufe0f EXECUTES REAL TRANSFER",
    {
      coin: z.string().describe("Coin symbol, e.g. BTC"),
      address: z.string().describe("Destination wallet address"),
      amount: z.string().describe("Withdraw amount"),
      network: z
        .string()
        .optional()
        .describe("Network to use, e.g. ETH, BSC, BTC. Required if coin supports multiple networks"),
      addressTag: z
        .string()
        .optional()
        .describe("Secondary address identifier (memo/tag) for coins like XRP, BNB"),
      name: z.string().optional().describe("Description of the address (address book label)"),
    },
    async ({ coin, address, amount, network, addressTag, name }) => {
      try {
        const data = await client.signedRequest(
          "POST",
          "/sapi/v1/capital/withdraw/apply",
          { coin, address, amount, network, addressTag, name },
          "sapi"
        );
        return success(data);
      } catch (err) {
        return error(err);
      }
    }
  );

  // 9. Get deposit address
  server.tool(
    "assets_get_deposit_address",
    "Get deposit address for a specific coin and optional network",
    {
      coin: z.string().describe("Coin symbol, e.g. BTC"),
      network: z
        .string()
        .optional()
        .describe("Network to use, e.g. ETH, BSC, BTC"),
    },
    async ({ coin, network }) => {
      try {
        const data = await client.signedRequest(
          "GET",
          "/sapi/v1/capital/deposit/address",
          { coin, network },
          "sapi"
        );
        return success(data);
      } catch (err) {
        return error(err);
      }
    }
  );

  // 10. Dust transfer (convert small balances to BNB)
  server.tool(
    "assets_dust_transfer",
    "Convert dust (small balances) to BNB. \u26a0\ufe0f EXECUTES REAL TRANSFER",
    {
      asset: z
        .string()
        .describe("Comma-separated list of asset symbols to convert, e.g. ADA,XRP,DOT"),
    },
    async ({ asset }) => {
      try {
        const data = await client.signedRequest(
          "POST",
          "/sapi/v1/asset/dust",
          { asset },
          "sapi"
        );
        return success(data);
      } catch (err) {
        return error(err);
      }
    }
  );
}
