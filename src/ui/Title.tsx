import type { ComponentProps } from "react";
import { Text } from "react-native";
import { tv } from "tailwind-variants";

export type TitleVariant = "default" | "lead" | "muted";

type NativeTextProps = ComponentProps<typeof Text>;

export type TitleProps = Omit<
  NativeTextProps,
  "className" | "selectionColorClassName"
> & {
  variant?: TitleVariant;
};

const TITLE_VARIANT_STYLES = {
  default: "text-2xl font-bold leading-8 text-foreground",
  lead: "text-4xl font-black leading-tight text-foreground",
  muted: "text-xl font-medium leading-7 text-muted-foreground",
} as const satisfies Record<TitleVariant, string>;

const titleVariants = tv({
  variants: {
    variant: TITLE_VARIANT_STYLES,
  },
  defaultVariants: {
    variant: "default",
  },
});

export function Title({ variant, ...textProps }: TitleProps) {
  const className = titleVariants({ variant });
  const uniwindTextProps = { ...textProps, className };

  return <Text {...uniwindTextProps} />;
}