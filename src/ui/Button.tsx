import type { ComponentProps } from "react";
import { Pressable, Text } from "react-native";
import { tv } from "tailwind-variants";

export type ButtonVariant = "default" | "lead" | "muted";

type NativePressableProps = ComponentProps<typeof Pressable>;

// Omit className, style, and children from the native Pressable props to avoid conflicts with our custom Button component.
export type ButtonProps = Omit<
  NativePressableProps,
  "className" | "style" | "children"
> & {
  variant?: ButtonVariant;
  title: string;
  onPress?: NativePressableProps["onPress"];
};

const BUTTON_VARIANT_STYLES = {
  default: "text-base leading-6 text-background",
  lead: "text-lg leading-7 text-background",
  muted: "text-base leading-6 text-foreground",
} as const satisfies Record<ButtonVariant, string>;

const BUTTON_SURFACE_STYLES = {
  default: "bg-foreground",
  lead: "bg-blue-600",
  muted: "bg-neutral-200 dark:bg-neutral-800",
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
  "min-h-12 items-center justify-center rounded-xl px-4 active:opacity-80";

export function Button({ variant, title, ...pressableProps }: ButtonProps) {
  const className = buttonVariants({ variant });
  const surfaceClassName = BUTTON_SURFACE_STYLES[variant ?? "default"];
  const textProps = { className, children: title };
  const unifiedPressableProps = {
    ...pressableProps,
    className: `${BUTTON_CLASS_NAME} ${surfaceClassName}`,
  };

  return (
    <Pressable {...unifiedPressableProps}>
      <Text {...textProps} />
    </Pressable>
  );
}
