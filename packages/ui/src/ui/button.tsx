import type { ComponentPropsWithRef, ReactNode } from "react";
import { Pressable, Text } from "react-native";
import { tv } from "tailwind-variants";

export type ButtonVariant = "default" | "primary" | "secondary" | "muted";

type NativePressableProps = ComponentPropsWithRef<typeof Pressable>;

export type ButtonProps = Omit<
  NativePressableProps,
  "accessibilityRole" | "children" | "className" | "role"
> & {
  variant?: ButtonVariant;
  title: string;
  icon?: ReactNode;
};

const BUTTON_VARIANT_STYLES = {
  default: {
    base: "bg-foreground",
    label: "text-base font-semibold text-background",
  },
  primary: {
    base: "bg-primary",
    label: "text-lg font-semibold text-primary-foreground",
  },
  secondary: {
    base: "bg-secondary",
    label: "text-base font-medium text-secondary-foreground",
  },
  muted: {
    base: "bg-muted-background",
    label: "text-base font-medium text-muted-foreground",
  },
} as const satisfies Record<ButtonVariant, { base: string; label: string }>;

const buttonVariants = tv({
  slots: {
    base: "min-h-12 flex-row items-center justify-center gap-2 rounded-xl px-4 active:opacity-80",
    label: "",
  },
  variants: {
    variant: BUTTON_VARIANT_STYLES,
    disabled: {
      true: { base: "opacity-50" },
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export function Button({
  variant,
  title,
  icon,
  disabled,
  ...pressableProps
}: ButtonProps) {
  const { base, label } = buttonVariants({
    variant,
    disabled: disabled === true,
  });
  const buttonProps = {
    ...pressableProps,
    accessibilityRole: "button" as const,
    className: base(),
    disabled,
  };
  const labelProps = { className: label(), children: title };

  return (
    <Pressable {...buttonProps}>
      {icon}
      <Text {...labelProps} />
    </Pressable>
  );
}
