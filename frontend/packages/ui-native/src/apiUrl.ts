import Constants from "expo-constants";

export function apiUrl() {
  if (process.env.EXPO_PUBLIC_API_URL) {
    return process.env.EXPO_PUBLIC_API_URL;
  }
  const devServerHost = Constants.expoConfig?.hostUri?.split(":")[0];
  if (devServerHost) {
    return `http://${devServerHost}:8080`;
  }
  return "http://localhost:8080";
}
