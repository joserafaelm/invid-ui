export const THEME_SCHEMES = ["light", "dark"] as const;

export type ThemeScheme = (typeof THEME_SCHEMES)[number];

type ThemeColorDefinition = Readonly<
  Record<ThemeScheme, string> & { engineVariable: `--${string}` }
>;

export const THEME_COLORS = {
  background: {
    engineVariable: "--background",
    light: "#ffffff",
    dark: "#0a0a0a",
  },
  foreground: {
    engineVariable: "--foreground",
    light: "#171717",
    dark: "#fafafa",
  },
  "muted-foreground": {
    engineVariable: "--muted",
    light: "#646464",
    dark: "#a3a3a3",
  },
} as const satisfies Record<string, ThemeColorDefinition>;

export type ThemeColor = keyof typeof THEME_COLORS;

export const THEME_COLOR_PREFIX = "--color-";

export function isThemeColor(name: string): name is ThemeColor {
  return Object.hasOwn(THEME_COLORS, name);
}

export function themeColorNames(): ThemeColor[] {
  return Object.keys(THEME_COLORS).filter(isThemeColor);
}
