import { TextInput } from "react-native";

type TextFieldProps = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  disabled?: boolean;
};

export function TextField({
  value,
  onChangeText,
  placeholder,
  disabled,
}: TextFieldProps) {
  return (
    <TextInput
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      editable={!disabled}
      className={`w-80 rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground ${disabled ? "opacity-50" : ""}`}
    />
  );
}
