import { pl } from "./pl";

export type MessageKey = keyof typeof pl;

export function t(
  key: MessageKey,
  values: Record<string, string> = {},
): string {
  return pl[key].replace(
    /\{\{(\w+)\}\}/g,
    (_, placeholder: string) => values[placeholder] ?? "",
  );
}
