import type { ComponentPropsWithRef, ComponentRef, RefObject } from "react";
import { useEffect, useRef, useState } from "react";
import type { ListRenderItemInfo, ModalProps } from "react-native";
import {
  AccessibilityInfo,
  FlatList,
  Modal,
  Platform,
  Pressable,
  View,
} from "react-native";
import { tv } from "tailwind-variants";
import type { ChoiceOption } from "#/internal/choice-option";
import { RadioOption } from "#/internal/radio-option";
import type { TextInputProps } from "#/ui/form/text-input";
import { TextInput } from "#/ui/form/text-input";
import { P } from "#/ui/p";

export type SelectOption = ChoiceOption;

type NativePressableProps = ComponentPropsWithRef<typeof Pressable>;

export type SelectProps = Pick<
  NativePressableProps,
  "accessibilityHint" | "testID"
> & {
  /** Names the select for screen readers and titles its list of options. */
  accessibilityLabel: string;
  options: readonly SelectOption[];
  /** The selected option's `value`, or `undefined` when nothing is selected. */
  value: string | undefined;
  onValueChange: (value: string) => void;
  /** Called with `true` when the list of options opens and `false` when it closes. */
  onOpenChange?: (open: boolean) => void;
  placeholder?: string;
  disabled?: boolean;
  /**
   * Draws the select in the danger color. Pair it with a visible error
   * message; color alone does not explain what is wrong.
   */
  invalid?: boolean;
  style?: TextInputProps["style"];
};

const SELECT_PLACEHOLDER = "Select an option";
const CLOSE_LABEL = "Close";
const IS_ANDROID = Platform.OS === "android";
const SUPPORTED_ORIENTATIONS = [
  "portrait",
  "portrait-upside-down",
  "landscape",
  "landscape-left",
  "landscape-right",
] as const satisfies ModalProps["supportedOrientations"];

const selectVariants = tv({
  slots: {
    trigger: "",
    overlay: "flex-1 items-center justify-center p-6",
    backdrop: "absolute inset-0 bg-foreground/40",
    dialog:
      "max-h-[70%] w-full max-w-md gap-2 rounded-2xl bg-background px-6 py-4",
  },
  variants: {
    disabled: {
      true: { trigger: "opacity-50" },
    },
  },
});

type TriggerRef = RefObject<ComponentRef<typeof Pressable> | null>;

function restoreTriggerFocus(pending: RefObject<boolean>, trigger: TriggerRef) {
  if (!pending.current) {
    return;
  }
  pending.current = false;
  if (trigger.current) {
    AccessibilityInfo.sendAccessibilityEvent(trigger.current, "focus");
  }
}

function getOptionKey(option: SelectOption) {
  return option.value;
}

export function Select({
  accessibilityHint,
  accessibilityLabel,
  options,
  value,
  onValueChange,
  onOpenChange,
  placeholder = SELECT_PLACEHOLDER,
  disabled = false,
  invalid = false,
  style,
  testID,
}: SelectProps) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<ComponentRef<typeof Pressable>>(null);
  const focusPending = useRef(false);
  const selectedLabel = options.find((option) => option.value === value)?.label;

  useEffect(() => {
    if (IS_ANDROID && !open) {
      restoreTriggerFocus(focusPending, triggerRef);
    }
  }, [open]);

  function changeOpen(nextOpen: boolean) {
    setOpen(nextOpen);
    onOpenChange?.(nextOpen);
  }

  function openOptions() {
    changeOpen(true);
  }

  function closeOptions() {
    focusPending.current = true;
    changeOpen(false);
  }

  function handleSelect(nextValue: string) {
    onValueChange(nextValue);
    closeOptions();
  }

  function handleDismiss() {
    restoreTriggerFocus(focusPending, triggerRef);
  }

  function renderOption({ item }: ListRenderItemInfo<SelectOption>) {
    return (
      <RadioOption
        checked={item.value === value}
        disabled={false}
        invalid={false}
        onSelect={handleSelect}
        option={item}
      />
    );
  }

  const { trigger, overlay, backdrop, dialog } = selectVariants({ disabled });
  const triggerProps = {
    accessibilityHint,
    accessibilityLabel,
    accessibilityRole: "button" as const,
    accessibilityState: { disabled, expanded: open },
    accessibilityValue: { text: selectedLabel ?? placeholder },
    className: trigger(),
    disabled,
    onPress: openOptions,
    ref: triggerRef,
    testID,
  };
  const inputProps = {
    accessible: false,
    editable: false,
    invalid,
    placeholder,
    pointerEvents: "none" as const,
    style,
    value: selectedLabel ?? "",
  };
  const overlayProps = { className: overlay() };
  const backdropProps = {
    accessibilityLabel: CLOSE_LABEL,
    accessibilityRole: "button" as const,
    className: backdrop(),
    onPress: closeOptions,
  };
  const dialogProps = {
    accessibilityViewIsModal: true,
    className: dialog(),
    onAccessibilityEscape: closeOptions,
  };

  return (
    <>
      <Pressable {...triggerProps}>
        <TextInput {...inputProps} />
      </Pressable>
      <Modal
        animationType="fade"
        navigationBarTranslucent={true}
        onDismiss={handleDismiss}
        onRequestClose={closeOptions}
        statusBarTranslucent={true}
        supportedOrientations={SUPPORTED_ORIENTATIONS}
        transparent={true}
        visible={open}
      >
        <View {...overlayProps}>
          <Pressable {...backdropProps} />
          <View {...dialogProps}>
            <P accessibilityRole="header" variant="label">
              {accessibilityLabel}
            </P>
            <FlatList
              accessibilityLabel={accessibilityLabel}
              accessibilityRole="radiogroup"
              data={options}
              keyExtractor={getOptionKey}
              renderItem={renderOption}
            />
          </View>
        </View>
      </Modal>
    </>
  );
}
