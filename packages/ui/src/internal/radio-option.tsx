import { Pressable, View } from "react-native";
import { tv } from "tailwind-variants";
import type { ChoiceOption } from "#/internal/choice-option";
import { P } from "#/ui/p";

const radioOptionVariants = tv({
  slots: {
    base: "min-h-12 flex-row items-center gap-3 py-2 active:opacity-80",
    indicator:
      "size-6 items-center justify-center rounded-full border-2 border-muted-foreground",
    dot: "size-3 rounded-full bg-primary",
    label: "flex-1",
  },
  variants: {
    checked: {
      true: { indicator: "border-primary" },
    },
    invalid: {
      true: { indicator: "border-danger" },
    },
    disabled: {
      true: { base: "opacity-50" },
    },
  },
});

type RadioOptionProps = {
  option: ChoiceOption;
  checked: boolean;
  disabled: boolean;
  invalid: boolean;
  onSelect: (value: string) => void;
};

export function RadioOption({
  option,
  checked,
  disabled,
  invalid,
  onSelect,
}: RadioOptionProps) {
  const isDisabled = disabled || option.disabled === true;
  const { base, indicator, dot, label } = radioOptionVariants({
    checked,
    disabled: isDisabled,
    invalid,
  });

  function handlePress() {
    onSelect(option.value);
  }

  const pressableProps = {
    accessibilityLabel: option.label,
    accessibilityRole: "radio" as const,
    accessibilityState: { checked, disabled: isDisabled },
    className: base(),
    disabled: isDisabled,
    onPress: handlePress,
  };
  const indicatorProps = { className: indicator() };
  const dotProps = { accessible: false, className: dot() };
  const labelProps = { className: label() };
  const checkedDot = checked ? <View {...dotProps} /> : null;

  return (
    <Pressable {...pressableProps}>
      <View {...indicatorProps}>{checkedDot}</View>
      <View {...labelProps}>
        <P>{option.label}</P>
      </View>
    </Pressable>
  );
}
