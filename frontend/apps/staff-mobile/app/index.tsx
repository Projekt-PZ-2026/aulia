import { ping, saveAnnouncement } from "@aulia/core";
import { t } from "@aulia/i18n";
import { Button, TextField } from "@aulia/ui-native";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Text, View } from "react-native";

export default function HomeScreen() {
  const [message, setMessage] = useState("");
  const [checking, setChecking] = useState(false);
  const [text, setText] = useState("");
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");
  const [currentText, setCurrentText] = useState("");

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

  async function save() {
    setSaving(true);
    try {
      const saved = await saveAnnouncement(text);
      setSaveMessage(t("announcement.saved"));
      setCurrentText(t("announcement.current", { text: saved.text }));
    } catch {
      setSaveMessage(t("announcement.saveError"));
    } finally {
      setSaving(false);
    }
  }

  return (
    <View className="flex-1 items-center justify-center gap-4 bg-background">
      <Text className="text-2xl font-semibold text-foreground">
        {t("staff.title")}
      </Text>
      <Button
        title={t("ping.button")}
        onPress={checkConnection}
        disabled={checking}
      />
      <Text className="text-muted-foreground">{message}</Text>
      <TextField
        value={text}
        onChangeText={setText}
        placeholder={t("announcement.placeholder")}
        disabled={saving}
      />
      <Button title={t("announcement.save")} onPress={save} disabled={saving} />
      <Text className="text-muted-foreground">{saveMessage}</Text>
      <Text className="text-foreground">{currentText}</Text>
      <StatusBar style="auto" />
    </View>
  );
}
