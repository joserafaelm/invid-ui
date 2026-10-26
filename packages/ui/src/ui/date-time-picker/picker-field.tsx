import type { ComponentProps, ReactNode } from "react";
import { Modal, Pressable } from "react-native";
import { Button } from "../button";
import { Container } from "../container";
import { TextInput } from "../text-input";

export type PickerVariant = "default" | "lead" | "muted";

export type PickerFieldAccessibilityProps = Pick<
  ComponentProps<typeof TextInput>,
  "accessibilityHint" | "accessibilityLabel" | "testID"
> & {
  style?: ComponentProps<typeof TextInput>["style"];
};

type PickerFieldProps = PickerFieldAccessibilityProps & {
  value: string | null;
  placeholder: string;
  variant: PickerVariant;
  disabled: boolean;
  visible: boolean;
  onOpen: () => void;
  onCancel: () => void;
  onConfirm: () => void;
  children: ReactNode;
};

export function PickerField({
  value,
  placeholder,
  variant,
  disabled,
  visible,
  onOpen,
  onCancel,
  onConfirm,
  children,
  style,
  ...textInputProps
}: PickerFieldProps) {
  const inputProps = {
    ...textInputProps,
    accessibilityLabel:
      textInputProps.accessibilityLabel ?? value ?? placeholder,
    accessible: false,
    editable: false,
    pointerEvents: "none" as const,
    placeholder,
    style,
    value: value ?? "",
    variant,
  };
  const fieldPressableProps = {
    accessibilityHint: textInputProps.accessibilityHint,
    accessibilityLabel:
      textInputProps.accessibilityLabel ?? value ?? placeholder,
    accessibilityRole: "button" as const,
    disabled,
    onPress: onOpen,
    testID: textInputProps.testID,
  };

  return (
    <>
      <Pressable {...fieldPressableProps}>
        <TextInput {...inputProps} />
      </Pressable>
      <Modal
        animationType="slide"
        onRequestClose={onCancel}
        transparent={false}
        visible={visible}
      >
        <Container variant="screen">
          <Container variant="card">
            <Container variant="row">
              <Button onPress={onCancel} title="Cancel" variant="muted" />
              <Button onPress={onConfirm} title="Done" variant="primary" />
            </Container>
            {visible && children}
          </Container>
        </Container>
      </Modal>
    </>
  );
}
