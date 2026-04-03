import { createHmac } from "node:crypto";

export function generateSignature(queryString: string, secret: string): string {
  return createHmac("sha256", secret).update(queryString).digest("hex");
}

export function buildSignedQuery(
  params: Record<string, string | number | boolean | undefined>,
  secret: string,
  recvWindow: number
): string {
  const filtered: Record<string, string> = {};
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined) {
      filtered[key] = String(value);
    }
  }
  filtered.timestamp = String(Date.now());
  filtered.recvWindow = String(recvWindow);

  const queryString = new URLSearchParams(filtered).toString();
  const signature = generateSignature(queryString, secret);
  return `${queryString}&signature=${signature}`;
}
