import { useThemeColor } from "#/theme/use-theme-color";
import DateTimePicker, {
  DateTimePickerAndroid,
} from "@react-native-community/datetimepicker";
import { useState } from "react";
import { Platform } from "react-native";
import type {
  PickerFieldAccessibilityProps,
  PickerVariant,
} from "./picker-field";
import { PickerField } from "./picker-field";

export type TimePickerVariant = PickerVariant;

export type TimePickerProps = PickerFieldAccessibilityProps & {
  value: Date | null;
  onChange: (value: Date) => void;
  placeholder?: string;
  variant?: TimePickerVariant;
  disabled?: boolean;
  is24Hour?: boolean;
  minuteInterval?: 1 | 2 | 3 | 4 | 5 | 6 | 10 | 12 | 15 | 20 | 30;
};

export function TimePicker({
  value,
  onChange,
  placeholder = "Select a time",
  variant,
  disabled,
  is24Hour,
  minuteInterval,
  accessibilityHint,
  accessibilityLabel,
  style,
  testID,
}: TimePickerProps) {
  const [visible, setVisible] = useState(false);
  const [draftValue, setDraftValue] = useState(value ?? new Date());
  const foregroundColor = useThemeColor("foreground");
  const primaryColor = useThemeColor("primary");
  const formattedValue = value
    ? new Intl.DateTimeFormat(undefined, {
        hour: "numeric",
        minute: "2-digit",
      }).format(value)
    : null;

  const openPicker = () => {
    const initialValue = value ?? new Date();

    if (Platform.OS === "android") {
      DateTimePickerAndroid.open({
        mode: "time",
        value: initialValue,
        display: "default",
        ...(is24Hour === undefined ? {} : { is24Hour }),
        ...(minuteInterval === undefined ? {} : { minuteInterval }),
        onValueChange: (_event, selectedValue) => onChange(selectedValue),
      });
      return;
    }

    setDraftValue(initialValue);
    setVisible(true);
  };

  const confirmPicker = () => {
    onChange(draftValue);
    setVisible(false);
  };
  const pickerProps = {
    accentColor: primaryColor,
    display: "spinner" as const,
    mode: "time" as const,
    onValueChange: (_event: unknown, selectedValue: Date) =>
      setDraftValue(selectedValue),
    textColor: foregroundColor,
    value: draftValue,
    ...(is24Hour === undefined ? {} : { is24Hour }),
    ...(minuteInterval === undefined ? {} : { minuteInterval }),
  };

  return (
    <PickerField
      accessibilityHint={accessibilityHint}
      accessibilityLabel={accessibilityLabel}
      disabled={disabled ?? false}
      onCancel={() => setVisible(false)}
      onConfirm={confirmPicker}
      onOpen={openPicker}
      placeholder={placeholder}
      style={style}
      testID={testID}
      value={formattedValue}
      variant={variant ?? "default"}
      visible={visible}
    >
      <DateTimePicker {...pickerProps} />
    </PickerField>
  );
}