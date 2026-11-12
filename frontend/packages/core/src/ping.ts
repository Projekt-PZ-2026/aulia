import { getPing } from "@aulia/api-client";

export type PingResult = {
  status: string;
  time: string;
  durationMs: number;
};

export async function ping(): Promise<PingResult> {
  const startedAt = Date.now();
  const response = await getPing();
  return { ...response.data, durationMs: Date.now() - startedAt };
}
