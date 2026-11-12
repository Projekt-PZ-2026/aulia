import { Pressable, Text } from "react-native";

type ButtonProps = {
  title: string;
  onPress: () => void;
  disabled?: boolean;
};

export function Button({ title, onPress, disabled }: ButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      className="rounded-md bg-primary px-4 py-2 active:opacity-90 disabled:opacity-50"
    >
      <Text className="text-sm font-medium text-primary-foreground">
        {title}
      </Text>
    </Pressable>
  );
}
