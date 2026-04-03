export class RateLimiter {
  private usedWeight: number = 0;
  private weightLimit: number = 1200;
  private lastResetTime: number = Date.now();
  private resetIntervalMs: number = 60_000;

  updateFromHeaders(headers: Headers): void {
    const weight = headers.get("x-mbx-used-weight-1m");
    if (weight) {
      this.usedWeight = parseInt(weight, 10);
      this.lastResetTime = Date.now();
    }
  }

  canProceed(weight: number = 1): boolean {
    this.maybeReset();
    return this.usedWeight + weight <= this.weightLimit;
  }

  getWaitTimeMs(): number {
    if (this.canProceed()) return 0;
    const elapsed = Date.now() - this.lastResetTime;
    return Math.max(0, this.resetIntervalMs - elapsed);
  }

  private maybeReset(): void {
    if (Date.now() - this.lastResetTime >= this.resetIntervalMs) {
      this.usedWeight = 0;
      this.lastResetTime = Date.now();
    }
  }
}
