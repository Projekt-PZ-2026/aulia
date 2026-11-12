import { ping } from "@aulia/core";
import { t } from "@aulia/i18n";
import { Button } from "@aulia/ui-native";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Text, View } from "react-native";

export default function HomeScreen() {
  const [message, setMessage] = useState("");
  const [checking, setChecking] = useState(false);

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
      <StatusBar style="auto" />
    </View>
  );
}
