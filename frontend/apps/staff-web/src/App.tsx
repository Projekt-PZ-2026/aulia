import { ping, saveAnnouncement } from "@aulia/core";
import { t } from "@aulia/i18n";
import { Button, TextField } from "@aulia/ui-web";
import { useState } from "react";

export default function App() {
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
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background text-foreground">
      <h1 className="text-2xl font-semibold">{t("staff.title")}</h1>
      <Button
        title={t("ping.button")}
        onPress={checkConnection}
        disabled={checking}
      />
      <p className="text-muted-foreground">{message}</p>
      <TextField
        value={text}
        onChangeText={setText}
        placeholder={t("announcement.placeholder")}
        disabled={saving}
      />
      <Button title={t("announcement.save")} onPress={save} disabled={saving} />
      <p className="text-muted-foreground">{saveMessage}</p>
      <p>{currentText}</p>
    </main>
  );
}
