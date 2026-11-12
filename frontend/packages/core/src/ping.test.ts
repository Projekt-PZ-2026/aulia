import { afterEach, expect, it, vi } from "vitest";
import { ping } from "./ping";

afterEach(() => {
  vi.unstubAllGlobals();
});

it("returns the backend answer with the request duration", async () => {
  const fetchMock = vi
    .fn()
    .mockResolvedValue(
      Response.json({ status: "ok", time: "2026-11-11T12:00:00Z" }),
    );
  vi.stubGlobal("fetch", fetchMock);

  const result = await ping();

  expect(fetchMock).toHaveBeenCalledWith(
    "http://localhost:8080/api/ping",
    expect.anything(),
  );
  expect(result.status).toBe("ok");
  expect(result.durationMs).toBeGreaterThanOrEqual(0);
});
