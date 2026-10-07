import type { ComponentProps, ReactNode } from "react";
import { Pressable, Text } from "react-native";
import { tv } from "tailwind-variants";

export type ButtonVariant = "default" | "primary" | "secondary" | "muted";

type NativePressableProps = ComponentProps<typeof Pressable>;


export type ButtonProps = Omit<
  NativePressableProps,
  "className" | "children"
> & {
  variant?: ButtonVariant;
  title: string;
  icon?: ReactNode;
  onPress?: NativePressableProps["onPress"];
  style?: NativePressableProps["style"];
};

const BUTTON_VARIANT_STYLES = {
  default: "text-base font-semibold text-background",
  primary: "text-lg font-semibold text-primary-foreground",
  secondary: "text-base font-medium text-secondary-foreground",
  muted: "text-base font-medium text-muted-foreground",
} as const satisfies Record<ButtonVariant, string>;

const BUTTON_SURFACE_STYLES = {
  default: "bg-foreground",
  primary: "bg-primary",
  secondary: "bg-secondary",
  muted: "bg-muted-background",
} as const satisfies Record<ButtonVariant, string>;

const buttonVariants = tv({
  variants: {
    variant: BUTTON_VARIANT_STYLES,
  },
  defaultVariants: {
    variant: "default",
  },
});

const BUTTON_CLASS_NAME =
  "min-h-12 flex-row items-center justify-center gap-2 rounded-xl px-4 active:opacity-80";

export function Button({
  variant,
  title,
  icon,
  style,
  ...pressableProps
}: ButtonProps) {
  const className = buttonVariants({ variant });
  const surfaceClassName = BUTTON_SURFACE_STYLES[variant ?? "default"];
  const textProps = { className, children: title };
  const unifiedPressableProps = {
    ...pressableProps,
    className: `${BUTTON_CLASS_NAME} ${surfaceClassName}`,
    style,
  };

  return (
    <Pressable {...unifiedPressableProps}>
      {icon}
      <Text {...textProps} />
    </Pressable>
  );
}
