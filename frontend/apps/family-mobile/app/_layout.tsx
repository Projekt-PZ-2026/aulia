import "../global.css";
import { setBaseUrl } from "@aulia/api-client";
import { apiUrl } from "@aulia/ui-native";
import { Stack } from "expo-router";

setBaseUrl(apiUrl());

export default function RootLayout() {
  return <Stack screenOptions={{ headerShown: false }} />;
}
