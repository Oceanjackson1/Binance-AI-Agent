export class BinanceSkillError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "BinanceSkillError";
  }
}

export class BinanceApiError extends BinanceSkillError {
  code: number;
  msg: string;
  httpStatus: number;

  constructor(code: number, msg: string, httpStatus: number) {
    super(`Binance API error ${code}: ${msg}`);
    this.name = "BinanceApiError";
    this.code = code;
    this.msg = msg;
    this.httpStatus = httpStatus;
  }
}

export class AuthenticationError extends BinanceSkillError {
  constructor(message: string = "Invalid API key or signature") {
    super(message);
    this.name = "AuthenticationError";
  }
}

export class RateLimitError extends BinanceSkillError {
  retryAfterMs: number;

  constructor(retryAfterMs: number) {
    super(`Rate limited. Retry after ${retryAfterMs}ms.`);
    this.name = "RateLimitError";
    this.retryAfterMs = retryAfterMs;
  }
}

export class ConfigurationError extends BinanceSkillError {
  constructor(message: string) {
    super(message);
    this.name = "ConfigurationError";
  }
}

export class ValidationError extends BinanceSkillError {
  constructor(message: string) {
    super(message);
    this.name = "ValidationError";
  }
}
