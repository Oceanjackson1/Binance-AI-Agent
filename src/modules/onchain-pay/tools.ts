import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { BinanceClient } from "../../core/client.js";
import { success, error } from "../../utils/formatting.js";

export function registerOnchainPayTools(
  server: McpServer,
  client: BinanceClient
): void {
  // 1. Get available payment methods
  server.tool(
    "onchain_pay_get_payment_methods",
    "Get available on-chain payment methods",
    {},
    async () => {
      try {
        const data = await client.signedRequest(
          "GET",
          "/sapi/v1/onchain-pay/payment-method-list",
          {},
          "sapi"
        );
        return success(data);
      } catch (err) {
        return error(err);
      }
    }
  );

  // 2. Get trading pairs
  server.tool(
    "onchain_pay_get_trading_pairs",
    "Get available on-chain pay trading pairs",
    {
      fiat: z
        .string()
        .optional()
        .describe("Fiat currency filter, e.g. USD"),
      crypto: z
        .string()
        .optional()
        .describe("Crypto currency filter, e.g. BTC"),
    },
    async ({ fiat, crypto }) => {
      try {
        const data = await client.signedRequest(
          "GET",
          "/sapi/v1/onchain-pay/trading-pairs",
          { fiat, crypto },
          "sapi"
        );
        return success(data);
      } catch (err) {
        return error(err);
      }
    }
  );

  // 3. Get estimated quote
  server.tool(
    "onchain_pay_get_quote",
    "\u26a0\ufe0f REQUESTS A REAL QUOTE - Get an estimated quote for on-chain pay conversion",
    {
      fiat: z.string().describe("Fiat currency, e.g. USD"),
      crypto: z.string().describe("Crypto currency, e.g. BTC"),
      fiatAmount: z
        .string()
        .optional()
        .describe("Fiat amount (either fiatAmount or cryptoAmount required)"),
      cryptoAmount: z
        .string()
        .optional()
        .describe("Crypto amount (either fiatAmount or cryptoAmount required)"),
      paymentMethod: z
        .string()
        .optional()
        .describe("Payment method to use"),
    },
    async ({ fiat, crypto, fiatAmount, cryptoAmount, paymentMethod }) => {
      try {
        const data = await client.signedRequest(
          "POST",
          "/sapi/v1/onchain-pay/estimated-quote",
          { fiat, crypto, fiatAmount, cryptoAmount, paymentMethod },
          "sapi"
        );
        return success(data);
      } catch (err) {
        return error(err);
      }
    }
  );

  // 4. Create order from quote
  server.tool(
    "onchain_pay_create_order",
    "\u26a0\ufe0f EXECUTES REAL PAYMENT - Create an on-chain pay order from a quote",
    {
      quoteId: z.string().describe("Quote ID from onchain_pay_get_quote"),
    },
    async ({ quoteId }) => {
      try {
        const data = await client.signedRequest(
          "POST",
          "/sapi/v1/onchain-pay/pre-order",
          { quoteId },
          "sapi"
        );
        return success(data);
      } catch (err) {
        return error(err);
      }
    }
  );
}
