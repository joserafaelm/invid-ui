import type { ThemeColor } from "#/theme/tokens";
import { useThemeColor } from "#/theme/use-theme-color";
import type { ForwardRefExoticComponent } from "react";
import type { SvgProps } from "react-native-svg";

type NativeIconProps = SvgProps & {
  size?: number | string;
  strokeWidth?: number | string;
  title?: string;
};
export type TablerIconComponent =
  ForwardRefExoticComponent<NativeIconProps>;

export type IconVariant = "primary" | "secondary" | "muted";

const ICON_VARIANT_COLORS = {
  primary: "primary",
  secondary: "secondary",
  muted: "muted-foreground",
} as const satisfies Record<IconVariant, ThemeColor>;

export type IconProps = Omit<
  NativeIconProps,
  "children" | "color"
> & {
  variant?: IconVariant;
  color?: string;
  icon: TablerIconComponent;
};

export function Icon({
  icon,
  variant = "primary",
  color,
  ...props
}: IconProps) {
  const variantColor = useThemeColor(ICON_VARIANT_COLORS[variant]);
  const iconProps = { ...props, color: color ?? variantColor };

const IconComponent = icon;

return <IconComponent {...iconProps} />;
}
