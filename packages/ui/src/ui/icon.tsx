import { useThemeColor } from "#/theme/use-theme-color";
import type { ForwardRefExoticComponent } from "react";
import { View, type StyleProp, type ViewStyle } from "react-native";
import type { SvgProps } from "react-native-svg";

type NativeIconProps = SvgProps & {
  size?: number | string;
  strokeWidth?: number | string;
  title?: string;
};
export type TablerIconComponent =
  ForwardRefExoticComponent<NativeIconProps>;

type IconSize = "sm" | "md" | "lg";
type IconStroke = "sm" | "md" | "lg";
type IconAlign = "start" | "center" | "end";
export type IconVariant = "primary" | "secondary";

const ICON_VARIANT_COLORS = {
  primary: "primary",
  secondary: "secondary",
} as const satisfies Record<IconVariant, IconVariant>;

const ICON_SIZES = { sm: 16, md: 20, lg: 24 } as const satisfies Record<
  IconSize,
  number
>;
const ICON_STROKES = { sm: 1.5, md: 2, lg: 2.5 } as const satisfies Record<
  IconStroke,
  number
>;
const ICON_ALIGNMENTS = {
  start: "flex-start",
  center: "center",
  end: "flex-end",
} as const satisfies Record<IconAlign, NonNullable<ViewStyle["alignSelf"]>>;

export type IconProps = Omit<
  NativeIconProps,
  "children" | "color" | "size" | "strokeWidth"
> & {
  variant?: IconVariant;
  size?: IconSize | number;
  color?: string;
  stroke?: IconStroke | number;
  align?: IconAlign;
  containerStyle?: StyleProp<ViewStyle>;
  icon: TablerIconComponent;
};

export function Icon({
  icon,
  variant = "primary",
  size = "md",
  color,
  stroke = "md",
  align = "center",
  containerStyle,
  style,
  ...props
}: IconProps) {
  const IconComponent = icon;
  const themeColor = useThemeColor(ICON_VARIANT_COLORS[variant]);
  const iconProps = {
    ...props,
    size: typeof size === "number" ? size : ICON_SIZES[size],
    color: color ?? themeColor,
    strokeWidth: typeof stroke === "number" ? stroke : ICON_STROKES[stroke],
    style,
  };
  const containerStyles: StyleProp<ViewStyle> = [
    { alignSelf: ICON_ALIGNMENTS[align] },
    containerStyle,
  ];

  return (
    <View style={containerStyles}>
      <IconComponent {...iconProps} />
    </View>
  );
}
