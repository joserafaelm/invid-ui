import type { ComponentProps, Ref } from "react";
import { View } from "react-native";
import { tv } from "tailwind-variants";

export type ContainerVariant =
  | "default"
  | "centered"
  | "row"
  | "screen"
  | "section"
  | "card";

type NativeViewProps = ComponentProps<typeof View>;

const CONTAINER_VARIANT_STYLES = {
  default: "flex-col",
  centered: "items-center justify-center",
  row: "flex-row items-center",
  screen: "flex-1 gap-6 px-6 py-8",
  section: "gap-2",
  card: "gap-2 rounded-xl border border-muted-foreground/20 bg-background p-4",
} as const satisfies Record<ContainerVariant, string>;

const containerVariants = tv({
  variants: {
    variant: CONTAINER_VARIANT_STYLES,
  },
  defaultVariants: {
    variant: "default",
  },
});

export type ContainerProps = Omit<NativeViewProps, "className"> & {
  variant?: ContainerVariant;
  ref?: Ref<View>;
};

export function Container({ ref, variant, ...viewProps }: ContainerProps) {
  const className = containerVariants({ variant });
  const uniwindViewProps = { ...viewProps, className };

  return <View ref={ref} {...uniwindViewProps} />;
}
