import * as api from "@aulia/api-client";

export type Announcement = api.Announcement;

export async function getAnnouncement(): Promise<Announcement | null> {
  const response = await api.getAnnouncement();
  return response.status === 200 ? response.data : null;
}

export async function saveAnnouncement(text: string): Promise<Announcement> {
  const response = await api.saveAnnouncement({ text });
  if (response.status !== 200) {
    throw new Error(`${response.status} saveAnnouncement`);
  }
  return response.data;
}
