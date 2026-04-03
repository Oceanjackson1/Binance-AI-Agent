import { buildSignedQuery } from "./auth.js";
import { getBaseUrl } from "./endpoints.js";
import {
  AuthenticationError,
  BinanceApiError,
  RateLimitError,
} from "./errors.js";
import { RateLimiter } from "./rate-limiter.js";
import type { BinanceConfig, ServiceType } from "./types.js";
import { logger } from "../utils/logger.js";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

export class BinanceClient {
  private config: BinanceConfig;
  private rateLimiters: Map<string, RateLimiter> = new Map();

  constructor(config: BinanceConfig) {
    this.config = config;
  }

  private getRateLimiter(service: ServiceType): RateLimiter {
    let limiter = this.rateLimiters.get(service);
    if (!limiter) {
      limiter = new RateLimiter();
      this.rateLimiters.set(service, limiter);
    }
    return limiter;
  }

  async publicRequest(
    method: HttpMethod,
    path: string,
    params: Record<string, string | number | boolean | undefined> = {},
    service: ServiceType = "spot"
  ): Promise<unknown> {
    const baseUrl = getBaseUrl(service, this.config.environment);
    const filtered: Record<string, string> = {};
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined) filtered[key] = String(value);
    }
    const query = new URLSearchParams(filtered).toString();
    const url = query ? `${baseUrl}${path}?${query}` : `${baseUrl}${path}`;

    return this.executeRequest(method, url, service);
  }

  async signedRequest(
    method: HttpMethod,
    path: string,
    params: Record<string, string | number | boolean | undefined> = {},
    service: ServiceType = "spot"
  ): Promise<unknown> {
    if (!this.config.apiKey || !this.config.apiSecret) {
      throw new AuthenticationError(
        "API key and secret are required for signed requests. Set BINANCE_API_KEY and BINANCE_API_SECRET."
      );
    }

    const baseUrl = getBaseUrl(service, this.config.environment);
    const signedQuery = buildSignedQuery(
      params,
      this.config.apiSecret,
      this.config.recvWindow
    );

    let url: string;
    let body: string | undefined;

    if (method === "GET" || method === "DELETE") {
      url = `${baseUrl}${path}?${signedQuery}`;
    } else {
      url = `${baseUrl}${path}`;
      body = signedQuery;
    }

    return this.executeRequest(method, url, service, body);
  }

  private async executeRequest(
    method: HttpMethod,
    url: string,
    service: ServiceType,
    body?: string,
    retries: number = 3
  ): Promise<unknown> {
    const limiter = this.getRateLimiter(service);
    if (!limiter.canProceed()) {
      const waitMs = limiter.getWaitTimeMs();
      throw new RateLimitError(waitMs);
    }

    const headers: Record<string, string> = {
      "User-Agent": "BinanceSkillsMCP/1.0",
    };
    if (this.config.apiKey) {
      headers["X-MBX-APIKEY"] = this.config.apiKey;
    }
    if (body) {
      headers["Content-Type"] = "application/x-www-form-urlencoded";
    }

    logger.debug(`${method} ${url}`);

    const response = await fetch(url, {
      method,
      headers,
      body,
    });

    limiter.updateFromHeaders(response.headers);

    if (response.status === 429) {
      const retryAfter = response.headers.get("retry-after");
      const waitMs = retryAfter ? parseInt(retryAfter, 10) * 1000 : 60_000;
      if (retries > 0) {
        await sleep(waitMs);
        return this.executeRequest(method, url, service, body, retries - 1);
      }
      throw new RateLimitError(waitMs);
    }

    if (response.status >= 500 && retries > 0) {
      const delay = (4 - retries) * 1000;
      await sleep(delay);
      return this.executeRequest(method, url, service, body, retries - 1);
    }

    const data = await response.json();

    if (!response.ok) {
      const apiData = data as { code?: number; msg?: string };
      const code = apiData.code ?? response.status;
      const msg = apiData.msg ?? response.statusText;

      if (response.status === 401 || code === -2015 || code === -2014) {
        throw new AuthenticationError(msg);
      }
      throw new BinanceApiError(code, msg, response.status);
    }

    return data;
  }
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
