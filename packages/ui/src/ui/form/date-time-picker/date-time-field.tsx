import type { AndroidNativeProps } from "@react-native-community/datetimepicker";
import DateTimePicker, {
  DateTimePickerAndroid,
} from "@react-native-community/datetimepicker";
import { useState } from "react";
import { Modal, Platform, Pressable } from "react-native";
import { useThemeColor } from "#/theme/use-theme-color";
import { Button } from "#/ui/button";
import { Container } from "#/ui/container";
import type { TextInputProps, TextInputVariant } from "#/ui/form/text-input";
import { TextInput } from "#/ui/form/text-input";

export type PickerVariant = TextInputVariant;

export type PickerFieldProps = Pick<
  TextInputProps,
  "accessibilityHint" | "accessibilityLabel" | "style" | "testID"
> & {
  value: Date | null;
  onChange: (value: Date) => void;
  placeholder?: string;
  variant?: PickerVariant;
  disabled?: boolean;
};

export type NativePickerOptions = Pick<
  AndroidNativeProps,
  "is24Hour" | "maximumDate" | "minimumDate" | "minuteInterval"
>;

type DateTimeFieldProps = PickerFieldProps &
  NativePickerOptions & {
    mode: "date" | "time";
    formatOptions: Intl.DateTimeFormatOptions;
    placeholder: string;
  };

const CANCEL_LABEL = "Cancel";
const CONFIRM_LABEL = "Done";
const DISABLED_CLASS_NAME = "opacity-50";

export function DateTimeField({
  mode,
  formatOptions,
  value,
  onChange,
  placeholder,
  variant = "default",
  disabled = false,
  accessibilityHint,
  accessibilityLabel,
  style,
  testID,
  ...nativeOptions
}: DateTimeFieldProps) {
  const [visible, setVisible] = useState(false);
  const [draftValue, setDraftValue] = useState(() => value ?? new Date());
  const foregroundColor = useThemeColor("foreground");
  const primaryColor = useThemeColor("primary");
  const displayValue = value
    ? new Intl.DateTimeFormat(undefined, formatOptions).format(value)
    : null;

  function handleDraftChange(_event: unknown, selectedValue: Date) {
    setDraftValue(selectedValue);
  }

  function handleAndroidChange(_event: unknown, selectedValue: Date) {
    onChange(selectedValue);
  }

  function openPicker() {
    const initialValue = value ?? new Date();

    if (Platform.OS === "android") {
      DateTimePickerAndroid.open({
        ...nativeOptions,
        display: "default",
        mode,
        onValueChange: handleAndroidChange,
        value: initialValue,
      });
      return;
    }

    setDraftValue(initialValue);
    setVisible(true);
  }

  function closePicker() {
    setVisible(false);
  }

  function confirmPicker() {
    onChange(draftValue);
    setVisible(false);
  }

  const fieldProps = {
    accessibilityHint,
    accessibilityLabel: accessibilityLabel ?? displayValue ?? placeholder,
    accessibilityRole: "button" as const,
    className: disabled ? DISABLED_CLASS_NAME : undefined,
    disabled,
    onPress: openPicker,
    testID,
  };
  const inputProps = {
    accessible: false,
    editable: false,
    placeholder,
    pointerEvents: "none" as const,
    style,
    value: displayValue ?? "",
    variant,
  };
  const pickerProps = {
    ...nativeOptions,
    accentColor: primaryColor,
    display: "spinner" as const,
    mode,
    onValueChange: handleDraftChange,
    textColor: foregroundColor,
    value: draftValue,
  };

  return (
    <>
      <Pressable {...fieldProps}>
        <TextInput {...inputProps} />
      </Pressable>
      <Modal
        animationType="slide"
        onRequestClose={closePicker}
        transparent={false}
        visible={visible}
      >
        <Container variant="screen">
          <Container variant="card">
            <Container variant="row">
              <Button
                onPress={closePicker}
                title={CANCEL_LABEL}
                variant="muted"
              />
              <Button
                onPress={confirmPicker}
                title={CONFIRM_LABEL}
                variant="primary"
              />
            </Container>
            {visible ? <DateTimePicker {...pickerProps} /> : null}
          </Container>
        </Container>
      </Modal>
    </>
  );
}
