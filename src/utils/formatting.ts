import type { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { BinanceSkillError, RateLimitError, BinanceApiError } from "../core/errors.js";

export function success(data: unknown): CallToolResult {
  return {
    content: [
      {
        type: "text",
        text: typeof data === "string" ? data : JSON.stringify(data, null, 2),
      },
    ],
  };
}

export function error(err: unknown): CallToolResult {
  let message: string;
  if (err instanceof RateLimitError) {
    message = `Rate limited. Retry after ${err.retryAfterMs}ms.`;
  } else if (err instanceof BinanceApiError) {
    message = `Binance API error ${err.code}: ${err.msg}`;
  } else if (err instanceof BinanceSkillError) {
    message = err.message;
  } else if (err instanceof Error) {
    message = err.message;
  } else {
    message = String(err);
  }

  return {
    content: [{ type: "text", text: message }],
    isError: true,
  };
}
