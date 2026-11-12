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
    <input
      type="text"
      value={value}
      onChange={(event) => onChangeText(event.target.value)}
      placeholder={placeholder}
      disabled={disabled}
      className="w-80 rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground disabled:opacity-50"
    />
  );
}
