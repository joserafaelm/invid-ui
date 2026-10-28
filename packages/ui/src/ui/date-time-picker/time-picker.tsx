import type {
  NativePickerOptions,
  PickerFieldProps,
  PickerVariant,
} from "#/ui/date-time-picker/date-time-field";
import { DateTimeField } from "#/ui/date-time-picker/date-time-field";

export type TimePickerVariant = PickerVariant;

export type TimePickerProps = PickerFieldProps &
  Pick<NativePickerOptions, "is24Hour" | "minuteInterval">;

const TIME_PLACEHOLDER = "Select a time";

const TIME_FORMAT_OPTIONS = {
  hour: "numeric",
  minute: "2-digit",
} as const satisfies Intl.DateTimeFormatOptions;

export function TimePicker({
  placeholder = TIME_PLACEHOLDER,
  ...pickerProps
}: TimePickerProps) {
  return (
    <DateTimeField
      {...pickerProps}
      formatOptions={TIME_FORMAT_OPTIONS}
      mode="time"
      placeholder={placeholder}
    />
  );
}
