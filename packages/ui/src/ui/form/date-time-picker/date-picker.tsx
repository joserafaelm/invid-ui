import type {
  NativePickerOptions,
  PickerFieldProps,
  PickerVariant,
} from "#/ui/form/date-time-picker/date-time-field";
import { DateTimeField } from "#/ui/form/date-time-picker/date-time-field";

export type DateTimePickerVariant = PickerVariant;

export type DatePickerProps = PickerFieldProps &
  Pick<NativePickerOptions, "maximumDate" | "minimumDate">;

const DATE_PLACEHOLDER = "Select a date";

const DATE_FORMAT_OPTIONS = {
  dateStyle: "medium",
} as const satisfies Intl.DateTimeFormatOptions;

export function DatePicker({
  placeholder = DATE_PLACEHOLDER,
  ...pickerProps
}: DatePickerProps) {
  return (
    <DateTimeField
      {...pickerProps}
      formatOptions={DATE_FORMAT_OPTIONS}
      mode="date"
      placeholder={placeholder}
    />
  );
}
