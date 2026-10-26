import DateTimePicker, {
  DateTimePickerAndroid,
} from "@react-native-community/datetimepicker";
import { useState } from "react";
import { Platform } from "react-native";
import { useThemeColor } from "#/theme/use-theme-color";
import type {
  PickerFieldAccessibilityProps,
  PickerVariant,
} from "./picker-field";
import { PickerField } from "./picker-field";

export type DateTimePickerVariant = PickerVariant;

export type DatePickerProps = PickerFieldAccessibilityProps & {
  value: Date | null;
  onChange: (value: Date) => void;
  placeholder?: string;
  variant?: DateTimePickerVariant;
  disabled?: boolean;
  minimumDate?: Date;
  maximumDate?: Date;
};

export function DatePicker({
  value,
  onChange,
  placeholder = "Select a date",
  variant,
  disabled,
  minimumDate,
  maximumDate,
  accessibilityHint,
  accessibilityLabel,
  style,
  testID,
}: DatePickerProps) {
  const [visible, setVisible] = useState(false);
  const [draftValue, setDraftValue] = useState(value ?? new Date());
  const foregroundColor = useThemeColor("foreground");
  const primaryColor = useThemeColor("primary");
  const formattedValue = value
    ? new Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(value)
    : null;

  const openPicker = () => {
    const initialValue = value ?? new Date();

    if (Platform.OS === "android") {
      DateTimePickerAndroid.open({
        mode: "date",
        value: initialValue,
        display: "default",
        ...(minimumDate === undefined ? {} : { minimumDate }),
        ...(maximumDate === undefined ? {} : { maximumDate }),
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
    mode: "date" as const,
    onValueChange: (_event: unknown, selectedValue: Date) =>
      setDraftValue(selectedValue),
    textColor: foregroundColor,
    value: draftValue,
    ...(maximumDate === undefined ? {} : { maximumDate }),
    ...(minimumDate === undefined ? {} : { minimumDate }),
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
