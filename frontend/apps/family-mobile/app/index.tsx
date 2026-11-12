import { getAnnouncement, ping } from "@aulia/core";
import { t } from "@aulia/i18n";
import { Button } from "@aulia/ui-native";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

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

export default function HomeScreen() {
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
    <View className="flex-1 items-center justify-center gap-4 bg-background">
      <Text className="text-2xl font-semibold text-foreground">
        {t("family.title")}
      </Text>
      <Button
        title={t("ping.button")}
        onPress={checkConnection}
        disabled={checking}
      />
      <Text className="text-muted-foreground">{message}</Text>
      <Text className="text-foreground">{announcement}</Text>
      <Button
        title={t("announcement.refresh")}
        onPress={refresh}
        disabled={refreshing}
      />
      <StatusBar style="auto" />
    </View>
  );
}
