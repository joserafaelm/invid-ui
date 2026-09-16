import type { ComponentProps } from "react";
import { Pressable } from "react-native";
import { tv } from "tailwind-variants";


export type ButtonVariant = "default" | "lead" | "muted";

type NativePressableProps = ComponentProps<typeof Pressable>;

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
  muted: "text-base leading-6 text-muted-foreground",
} as const satisfies Record<ButtonVariant, string>;

const buttonVariants = tv({
  variants: {
    variant: BUTTON_VARIANT_STYLES,
  },
  defaultVariants: {
    variant: "default",
  },
});

export function Button({ variant, title, ...pressableProps }: ButtonProps) {
  const className = buttonVariants({ variant });
  const unifiedPressableProps = { ...pressableProps, className };

  return <Pressable {...unifiedPressableProps}>{title}</Pressable>;
}

