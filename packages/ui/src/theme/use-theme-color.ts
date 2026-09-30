import { useCSSVariable } from "uniwind";
import type { ThemeColor } from "#/theme/tokens";
import { THEME_COLOR_PREFIX } from "#/theme/tokens";

export type { ThemeColor } from "#/theme/tokens";

/**
 * Returns the current value of a theme color, following the active light or
 * dark appearance. Use it for surfaces the library does not render, such as
 * screen backgrounds or navigation headers.
 */
export function useThemeColor(color: ThemeColor): string {
  const value = useCSSVariable(`${THEME_COLOR_PREFIX}${color}`);

  if (typeof value !== "string") {
    throw new Error(
      `@invid/ui: theme color "${color}" is unavailable. Wrap the Metro config with withINVIDUI from "@invid/ui/metro" and render INVIDUIProvider at the app root.`,
    );
  }

  return value;
}
