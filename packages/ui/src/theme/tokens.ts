export const THEME_SCHEMES = ["light", "dark"] as const;

export type ThemeScheme = (typeof THEME_SCHEMES)[number];

type ThemeColorDefinition = Readonly<
  Record<ThemeScheme, string> & { engineVariable: `--${string}` }
>;

export const THEME_COLORS = {
  background: {
    engineVariable: "--background",
    light: "#F2F4F5",
    dark: "#F2F4F5",
  },
  foreground: {
    engineVariable: "--foreground",
    light: "#171717",
    dark: "#171717",
  },
  "muted-foreground": {
    engineVariable: "--muted",
    light: "#646464",
    dark: "#646464",
  },
  "muted-background": {
    engineVariable: "--muted-background",
    light: "#E3F2FD",
    dark: "#E3F2FD",
  },
  primary: {
    engineVariable: "--primary",
    light: "#00728f",
    dark: "#00728f",
  },
  "primary-foreground": {
    engineVariable: "--primary-foreground",
    light: "#f8fbfc",
    dark: "#f8fbfc",
  },
  secondary: {
    engineVariable: "--secondary",
    light: "#0E3052",
    dark: "#0E3052",
  },
  "secondary-foreground": {
    engineVariable: "--secondary-foreground",
    light: "#0f172a",
    dark: "#0f172a",
  },
  accent: {
    engineVariable: "--accent",
    light: "#00AECC",
    dark: "#00AECC",
  },
  text: {
    engineVariable: "--text",
    light: "#00AECC",
    dark: "#00AECC",
  },
  soporte: {
    engineVariable: "--soporte",
    light: "#0085AA",
    dark: "#0085AA",
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
