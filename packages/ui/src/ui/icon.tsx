import type { ThemeColor } from "#/theme/tokens";
import { useThemeColor } from "#/theme/use-theme-color";
import type { ComponentProps } from "react";
import { type IconName, ICON } from "./icon-registry";

export type { IconName } from "./icon-registry";

type NativeIconProps = ComponentProps<(typeof ICON)[IconName]>;

export type IconVariant = "primary" | "secondary" | "muted";

const ICON_VARIANT_COLORS = {
  primary: "primary",
  secondary: "secondary",
  muted: "muted-foreground",
} as const satisfies Record<IconVariant, ThemeColor>;

export type IconProps = Omit<NativeIconProps, "color"> & {
  variant?: IconVariant;
  color?: string;
  name: IconName;
};

export function Icon({
  name,
  variant = "primary",
  color,
  ...props
}: IconProps) {
  const IconComponent = ICON[name];
  const variantColor = useThemeColor(ICON_VARIANT_COLORS[variant]);
  const iconProps = { ...props, color: color ?? variantColor };

  return <IconComponent {...iconProps} />;
}
