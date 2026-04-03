import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { BinanceClient } from "../../core/client.js";
import { success, error } from "../../utils/formatting.js";

export function registerSubAccountTools(
  server: McpServer,
  client: BinanceClient
): void {
  // 1. Create virtual sub-account
  server.tool(
    "sub_account_create",
    "Create a new virtual sub-account",
    {
      subAccountString: z
        .string()
        .describe("Email alias for the sub-account (used to generate the sub-account email)"),
    },
    async ({ subAccountString }) => {
      try {
        const data = await client.signedRequest(
          "POST",
          "/sapi/v1/sub-account/virtualSubAccount",
          { subAccountString },
          "sapi"
        );
        return success(data);
      } catch (err) {
        return error(err);
      }
    }
  );

  // 2. List sub-accounts
  server.tool(
    "sub_account_list",
    "Get list of sub-accounts, optionally filtered by email or status",
    {
      email: z.string().optional().describe("Sub-account email to filter by"),
      page: z.number().optional().describe("Page number (default 1)"),
      limit: z.number().optional().describe("Results per page (default 1, max 200)"),
      status: z
        .string()
        .optional()
        .describe("Sub-account status to filter by, e.g. enabled, disabled"),
    },
    async ({ email, page, limit, status }) => {
      try {
        const data = await client.signedRequest(
          "GET",
          "/sapi/v1/sub-account/list",
          { email, page, limit, status },
          "sapi"
        );
        return success(data);
      } catch (err) {
        return error(err);
      }
    }
  );

  // 3. Get sub-account assets
  server.tool(
    "sub_account_get_assets",
    "Get asset balances for a specific sub-account",
    {
      email: z.string().describe("Sub-account email"),
    },
    async ({ email }) => {
      try {
        const data = await client.signedRequest(
          "GET",
          "/sapi/v3/sub-account/assets",
          { email },
          "sapi"
        );
        return success(data);
      } catch (err) {
        return error(err);
      }
    }
  );

  // 4. Universal transfer between master and sub-accounts
  server.tool(
    "sub_account_transfer",
    "Transfer assets between master and sub-accounts or between sub-accounts. \u26a0\ufe0f EXECUTES REAL TRANSFER",
    {
      fromEmail: z
        .string()
        .optional()
        .describe("Sender email. Required if transferring from a sub-account"),
      toEmail: z
        .string()
        .optional()
        .describe("Recipient email. Required if transferring to a sub-account"),
      fromAccountType: z
        .string()
        .describe("Sender account type: SPOT, USDT_FUTURE, COIN_FUTURE, MARGIN, ISOLATED_MARGIN"),
      toAccountType: z
        .string()
        .describe("Recipient account type: SPOT, USDT_FUTURE, COIN_FUTURE, MARGIN, ISOLATED_MARGIN"),
      clientTranId: z
        .string()
        .optional()
        .describe("Unique client transfer ID"),
      asset: z.string().describe("Asset symbol, e.g. USDT"),
      amount: z.string().describe("Transfer amount"),
    },
    async ({
      fromEmail,
      toEmail,
      fromAccountType,
      toAccountType,
      clientTranId,
      asset,
      amount,
    }) => {
      try {
        const data = await client.signedRequest(
          "POST",
          "/sapi/v1/sub-account/universalTransfer",
          {
            fromEmail,
            toEmail,
            fromAccountType,
            toAccountType,
            clientTranId,
            asset,
            amount,
          },
          "sapi"
        );
        return success(data);
      } catch (err) {
        return error(err);
      }
    }
  );

  // 5. Get universal transfer history
  server.tool(
    "sub_account_get_transfer_history",
    "Get universal transfer history between master and sub-accounts",
    {
      fromEmail: z.string().optional().describe("Sender email"),
      toEmail: z.string().optional().describe("Recipient email"),
      startTime: z.number().optional().describe("Start time in ms"),
      endTime: z.number().optional().describe("End time in ms"),
      page: z.number().optional().describe("Page number (default 1)"),
      limit: z
        .number()
        .optional()
        .describe("Results per page (default 500, max 500)"),
    },
    async ({ fromEmail, toEmail, startTime, endTime, page, limit }) => {
      try {
        const data = await client.signedRequest(
          "GET",
          "/sapi/v1/sub-account/universalTransfer",
          { fromEmail, toEmail, startTime, endTime, page, limit },
          "sapi"
        );
        return success(data);
      } catch (err) {
        return error(err);
      }
    }
  );

  // 6. Enable futures for sub-account
  server.tool(
    "sub_account_enable_futures",
    "Enable futures trading for a sub-account",
    {
      email: z.string().describe("Sub-account email"),
    },
    async ({ email }) => {
      try {
        const data = await client.signedRequest(
          "POST",
          "/sapi/v1/sub-account/futures/enable",
          { email },
          "sapi"
        );
        return success(data);
      } catch (err) {
        return error(err);
      }
    }
  );

  // 7. Enable margin for sub-account
  server.tool(
    "sub_account_enable_margin",
    "Enable margin trading for a sub-account",
    {
      email: z.string().describe("Sub-account email"),
    },
    async ({ email }) => {
      try {
        const data = await client.signedRequest(
          "POST",
          "/sapi/v1/sub-account/margin/enable",
          { email },
          "sapi"
        );
        return success(data);
      } catch (err) {
        return error(err);
      }
    }
  );

  // 8. Get sub-account status
  server.tool(
    "sub_account_get_status",
    "Get status details for sub-accounts (margin, futures enabled, etc.)",
    {
      email: z.string().optional().describe("Sub-account email. If omitted, returns all sub-accounts"),
    },
    async ({ email }) => {
      try {
        const data = await client.signedRequest(
          "GET",
          "/sapi/v1/sub-account/status",
          { email },
          "sapi"
        );
        return success(data);
      } catch (err) {
        return error(err);
      }
    }
  );
}
