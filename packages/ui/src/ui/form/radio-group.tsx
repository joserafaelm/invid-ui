import type { ComponentPropsWithRef } from "react";
import { View } from "react-native";
import type { ChoiceOption } from "#/internal/choice-option";
import { RadioOption } from "#/internal/radio-option";

export type RadioGroupOption = ChoiceOption;

type NativeViewProps = ComponentPropsWithRef<typeof View>;

export type RadioGroupProps = Omit<
  NativeViewProps,
  "accessibilityLabel" | "accessibilityRole" | "children" | "className"
> & {
  /** Names the group for screen readers, for example "Plan". */
  accessibilityLabel: string;
  options: readonly RadioGroupOption[];
  /** The selected option's `value`, or `undefined` when nothing is selected. */
  value: string | undefined;
  onValueChange: (value: string) => void;
  disabled?: boolean;
  /**
   * Draws the options in the danger color. Pair it with a visible error
   * message; color alone does not explain what is wrong.
   */
  invalid?: boolean;
};

const RADIO_GROUP_CLASS_NAME = "gap-1";

export function RadioGroup({
  accessibilityLabel,
  options,
  value,
  onValueChange,
  disabled = false,
  invalid = false,
  ...viewProps
}: RadioGroupProps) {
  const groupProps = {
    ...viewProps,
    accessibilityLabel,
    accessibilityRole: "radiogroup" as const,
    accessibilityState: { disabled },
    className: RADIO_GROUP_CLASS_NAME,
  };
  const radioOptions = options.map((option) => (
    <RadioOption
      checked={option.value === value}
      disabled={disabled}
      invalid={invalid}
      key={option.value}
      onSelect={onValueChange}
      option={option}
    />
  ));

  return <View {...groupProps}>{radioOptions}</View>;
}
