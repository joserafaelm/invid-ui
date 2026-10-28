import { tv } from "tailwind-variants";

export type TextInputVariant = "default" | "lead" | "muted";

const TEXT_INPUT_VARIANT_STYLES = {
  default: "border-muted-foreground/20 text-base leading-6 text-foreground",
  lead: "border-primary text-lg leading-7 text-foreground",
  muted: "border-muted-foreground/20 text-base leading-6 text-muted-foreground",
} as const satisfies Record<TextInputVariant, string>;

export const textInputVariants = tv({
  base: "rounded-xl border bg-background px-4 py-3",
  variants: {
    variant: TEXT_INPUT_VARIANT_STYLES,
    multiline: {
      true: "min-h-30",
    },
    invalid: {
      true: "border-danger",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});
