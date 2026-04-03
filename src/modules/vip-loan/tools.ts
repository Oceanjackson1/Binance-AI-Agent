import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { BinanceClient } from "../../core/client.js";
import { success, error } from "../../utils/formatting.js";

export function registerVipLoanTools(
  server: McpServer,
  client: BinanceClient
): void {
  // 1. Borrow VIP loan
  server.tool(
    "vip_loan_borrow",
    "\u26a0\ufe0f EXECUTES REAL LOAN BORROW - Borrow a VIP loan with collateral",
    {
      loanAccountId: z.string().describe("Loan account ID"),
      loanCoin: z.string().describe("Coin to borrow, e.g. USDT"),
      loanAmount: z.string().describe("Amount to borrow"),
      collateralAccountId: z.string().describe("Collateral account ID"),
      collateralCoin: z.string().describe("Collateral coin, e.g. BTC"),
      isFlexibleRate: z
        .boolean()
        .optional()
        .describe("Use flexible rate (default false for fixed rate)"),
    },
    async ({
      loanAccountId,
      loanCoin,
      loanAmount,
      collateralAccountId,
      collateralCoin,
      isFlexibleRate,
    }) => {
      try {
        const data = await client.signedRequest(
          "POST",
          "/sapi/v1/loan/vip/borrow",
          {
            loanAccountId,
            loanCoin,
            loanAmount,
            collateralAccountId,
            collateralCoin,
            isFlexibleRate,
          },
          "sapi"
        );
        return success(data);
      } catch (err) {
        return error(err);
      }
    }
  );

  // 2. Repay VIP loan
  server.tool(
    "vip_loan_repay",
    "\u26a0\ufe0f EXECUTES REAL LOAN REPAYMENT - Repay a VIP loan",
    {
      orderId: z.number().describe("Loan order ID to repay"),
      amount: z.string().describe("Repayment amount"),
    },
    async ({ orderId, amount }) => {
      try {
        const data = await client.signedRequest(
          "POST",
          "/sapi/v1/loan/vip/repay",
          { orderId, amount },
          "sapi"
        );
        return success(data);
      } catch (err) {
        return error(err);
      }
    }
  );

  // 3. Renew VIP loan
  server.tool(
    "vip_loan_renew",
    "\u26a0\ufe0f EXECUTES REAL LOAN RENEWAL - Renew an existing VIP loan",
    {
      orderId: z.number().describe("Loan order ID to renew"),
      loanTerm: z
        .number()
        .optional()
        .describe("New loan term in days"),
    },
    async ({ orderId, loanTerm }) => {
      try {
        const data = await client.signedRequest(
          "POST",
          "/sapi/v1/loan/vip/renew",
          { orderId, loanTerm },
          "sapi"
        );
        return success(data);
      } catch (err) {
        return error(err);
      }
    }
  );

  // 4. Get ongoing loan orders
  server.tool(
    "vip_loan_get_orders",
    "Get ongoing VIP loan orders",
    {
      orderId: z.number().optional().describe("Filter by order ID"),
      collateralAccountId: z
        .string()
        .optional()
        .describe("Filter by collateral account ID"),
      loanCoin: z.string().optional().describe("Filter by loan coin, e.g. USDT"),
      collateralCoin: z
        .string()
        .optional()
        .describe("Filter by collateral coin, e.g. BTC"),
      current: z.number().optional().describe("Current page (default 1)"),
      limit: z.number().optional().describe("Page size (default 10, max 100)"),
    },
    async ({
      orderId,
      collateralAccountId,
      loanCoin,
      collateralCoin,
      current,
      limit,
    }) => {
      try {
        const data = await client.signedRequest(
          "GET",
          "/sapi/v1/loan/vip/ongoing/orders",
          {
            orderId,
            collateralAccountId,
            loanCoin,
            collateralCoin,
            current,
            limit,
          },
          "sapi"
        );
        return success(data);
      } catch (err) {
        return error(err);
      }
    }
  );

  // 5. Get repay history
  server.tool(
    "vip_loan_get_repay_history",
    "Get VIP loan repayment history",
    {
      orderId: z.number().optional().describe("Filter by order ID"),
      loanCoin: z.string().optional().describe("Filter by loan coin, e.g. USDT"),
      startTime: z.number().optional().describe("Start time in ms"),
      endTime: z.number().optional().describe("End time in ms"),
      current: z.number().optional().describe("Current page (default 1)"),
      limit: z.number().optional().describe("Page size (default 10, max 100)"),
    },
    async ({ orderId, loanCoin, startTime, endTime, current, limit }) => {
      try {
        const data = await client.signedRequest(
          "GET",
          "/sapi/v1/loan/vip/repay/history",
          { orderId, loanCoin, startTime, endTime, current, limit },
          "sapi"
        );
        return success(data);
      } catch (err) {
        return error(err);
      }
    }
  );

  // 6. Get collateral account
  server.tool(
    "vip_loan_get_collateral",
    "Get VIP loan collateral account details",
    {
      orderId: z.number().optional().describe("Filter by order ID"),
    },
    async ({ orderId }) => {
      try {
        const data = await client.signedRequest(
          "GET",
          "/sapi/v1/loan/vip/collateral/account",
          { orderId },
          "sapi"
        );
        return success(data);
      } catch (err) {
        return error(err);
      }
    }
  );

  // 7. Get loanable assets data
  server.tool(
    "vip_loan_get_loanable",
    "Get VIP loan loanable assets and interest rate data",
    {
      loanCoin: z.string().optional().describe("Filter by loan coin, e.g. USDT"),
      vipLevel: z.number().optional().describe("VIP level (default current level)"),
    },
    async ({ loanCoin, vipLevel }) => {
      try {
        const data = await client.signedRequest(
          "GET",
          "/sapi/v1/loan/vip/loanable/data",
          { loanCoin, vipLevel },
          "sapi"
        );
        return success(data);
      } catch (err) {
        return error(err);
      }
    }
  );

  // 8. Get interest rate
  server.tool(
    "vip_loan_get_interest_rate",
    "Get VIP loan interest rate for a specific coin",
    {
      loanCoin: z.string().describe("Loan coin, e.g. USDT"),
      isFlexibleRate: z
        .boolean()
        .optional()
        .describe("Query flexible rate (default false for fixed rate)"),
    },
    async ({ loanCoin, isFlexibleRate }) => {
      try {
        const data = await client.signedRequest(
          "GET",
          "/sapi/v1/loan/vip/request/interestRate",
          { loanCoin, isFlexibleRate },
          "sapi"
        );
        return success(data);
      } catch (err) {
        return error(err);
      }
    }
  );
}
