import { afterEach, expect, it, vi } from "vitest";
import { getAnnouncement, saveAnnouncement } from "./announcement";

const announcement = {
  id: 1,
  text: "Jutro wycieczka do muzeum",
  createdAt: "2026-11-12T08:00:00Z",
};

afterEach(() => {
  vi.unstubAllGlobals();
});

it("returns the latest announcement", async () => {
  vi.stubGlobal(
    "fetch",
    vi.fn().mockResolvedValue(Response.json(announcement)),
  );

  expect(await getAnnouncement()).toEqual(announcement);
});

it("returns null when there is no announcement", async () => {
  vi.stubGlobal(
    "fetch",
    vi.fn().mockResolvedValue(new Response(null, { status: 204 })),
  );

  expect(await getAnnouncement()).toBeNull();
});

it("sends the text to the staff endpoint", async () => {
  const fetchMock = vi.fn().mockResolvedValue(Response.json(announcement));
  vi.stubGlobal("fetch", fetchMock);

  const saved = await saveAnnouncement(announcement.text);

  expect(fetchMock).toHaveBeenCalledWith(
    "http://localhost:8080/api/staff/announcement",
    expect.objectContaining({
      method: "PUT",
      body: JSON.stringify({ text: announcement.text }),
    }),
  );
  expect(saved).toEqual(announcement);
});
