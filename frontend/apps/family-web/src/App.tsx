import { getAnnouncement, ping } from "@aulia/core";
import { t } from "@aulia/i18n";
import { Button } from "@aulia/ui-web";
import { useEffect, useState } from "react";

async function announcementMessage() {
  try {
    const latest = await getAnnouncement();
    return latest
      ? t("announcement.current", { text: latest.text })
      : t("announcement.empty");
  } catch {
    return t("announcement.loadError");
  }
}

export default function App() {
  const [message, setMessage] = useState("");
  const [checking, setChecking] = useState(false);
  const [announcement, setAnnouncement] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    announcementMessage().then(setAnnouncement);
  }, []);

  async function checkConnection() {
    setChecking(true);
    try {
      const result = await ping();
      setMessage(
        t("ping.result", {
          status: result.status,
          ms: String(result.durationMs),
        }),
      );
    } catch {
      setMessage(t("ping.error"));
    } finally {
      setChecking(false);
    }
  }

  async function refresh() {
    setRefreshing(true);
    setAnnouncement(await announcementMessage());
    setRefreshing(false);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background text-foreground">
      <h1 className="text-2xl font-semibold">{t("family.title")}</h1>
      <Button
        title={t("ping.button")}
        onPress={checkConnection}
        disabled={checking}
      />
      <p className="text-muted-foreground">{message}</p>
      <p>{announcement}</p>
      <Button
        title={t("announcement.refresh")}
        onPress={refresh}
        disabled={refreshing}
      />
    </main>
  );
}
