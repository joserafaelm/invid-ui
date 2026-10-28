import type { ComponentProps, ReactNode } from "react";
import { Text, View } from "react-native";
import { tv } from "tailwind-variants";

export type BadgeVariant =
  | "default"
  | "primary"
  | "secondary"
  | "muted"
  | "success"
  | "warning"
  | "danger"
  | "info";

export type BadgeSize = "sm" | "md";

type NativeViewProps = ComponentProps<typeof View>;

const BADGE_VARIANT_STYLES = {
  default: "bg-foreground/10 text-foreground",
  primary: "bg-primary/10 text-primary",
  secondary: "bg-secondary/10 text-secondary",
  muted: "bg-muted-background text-muted-foreground",
  success: "bg-success/10 text-success",
  warning: "bg-warning/10 text-warning",
  danger: "bg-danger/10 text-danger",
  info: "bg-info/10 text-info",
} as const satisfies Record<BadgeVariant, string>;

const BADGE_LABEL_VARIANT_STYLES = {
  default: "text-foreground",
  primary: "text-primary",
  secondary: "text-secondary",
  muted: "text-muted-foreground",
  success: "text-success",
  warning: "text-warning",
  danger: "text-danger",
  info: "text-info",
} as const satisfies Record<BadgeVariant, string>;

const BADGE_SIZE_STYLES = {
  sm: "gap-space-1 rounded-md px-space-2 py-space-1",
  md: "gap-space-2 rounded-lg px-space-3 py-space-2",
} as const satisfies Record<BadgeSize, string>;

const BADGE_LABEL_SIZE_STYLES = {
  sm: "text-xs font-medium",
  md: "text-sm font-medium",
} as const satisfies Record<BadgeSize, string>;

const badgeVariants = tv({
  variants: {
    variant: BADGE_VARIANT_STYLES,
    size: BADGE_SIZE_STYLES,
  },
  defaultVariants: {
    variant: "default",
    size: "md",
  },
});

export type BadgeProps = Omit<
  NativeViewProps,
  "accessibilityRole" | "children" | "className"
> & {
  label: string;
  variant?: BadgeVariant;
  size?: BadgeSize;
  icon?: ReactNode;
};

export function Badge({
  label,
  variant = "default",
  size = "md",
  icon,
  ...viewProps
}: BadgeProps) {
  const className = badgeVariants({ variant, size });
  const labelClassName = `${BADGE_LABEL_VARIANT_STYLES[variant]} ${BADGE_LABEL_SIZE_STYLES[size]}`;
  const badgeProps = {
    ...viewProps,
    accessibilityRole: "text" as const,
    className: `flex-row items-center self-start ${className}`,
  };
  const labelProps = { className: labelClassName, children: label };

  return (
    <View {...badgeProps}>
      {icon}
      <Text {...labelProps} />
    </View>
  );
}
