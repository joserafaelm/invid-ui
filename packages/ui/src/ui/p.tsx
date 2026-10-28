import type { ComponentPropsWithRef } from "react";
import { Text } from "react-native";
import { tv } from "tailwind-variants";

export type PVariant = "default" | "lead" | "muted" | "label" | "danger";

const P_VARIANT_STYLES = {
  default: "text-base leading-6 text-foreground",
  lead: "text-lg leading-7 text-foreground",
  muted: "text-base leading-6 text-muted-foreground",
  label: "font-medium text-base leading-6 text-foreground",
  danger: "text-base leading-6 text-danger",
} as const satisfies Record<PVariant, string>;

const pVariants = tv({
  variants: {
    variant: P_VARIANT_STYLES,
  },
  defaultVariants: {
    variant: "default",
  },
});

type NativeTextProps = ComponentPropsWithRef<typeof Text>;

export type PProps = Omit<
  NativeTextProps,
  "className" | "selectionColorClassName"
> & {
  variant?: PVariant;
};

export function P({ variant, ...textProps }: PProps) {
  const className = pVariants({ variant });
  const uniwindTextProps = { ...textProps, className };

  return <Text {...uniwindTextProps} />;
}
