import "#/internal/styles";

import type { HeroUINativeConfigRaw } from "heroui-native/provider-raw";
import { HeroUINativeProviderRaw } from "heroui-native/provider-raw";
import type { ReactNode } from "react";
import { useLayoutEffect, useRef } from "react";
import { StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Uniwind } from "uniwind";
import type { ThemeColor, ThemeScheme } from "#/theme/tokens";
import {
  isThemeColor,
  THEME_COLORS,
  THEME_SCHEMES,
  themeColorNames,
} from "#/theme/tokens";

const ENGINE_CONFIG = {
  devInfo: { stylingPrinciples: false },
} as const satisfies HeroUINativeConfigRaw;

const styles = StyleSheet.create({
  root: { flex: 1 },
});

/**
 * Color overrides for the light and dark appearance. Colors left out keep
 * their default value.
 */
export type INVIDUITheme = Readonly<
  Partial<Record<ThemeScheme, Readonly<Partial<Record<ThemeColor, string>>>>>
>;

export type INVIDUIProviderProps = {
  children: ReactNode;
  /**
   * Define the theme outside the component so its identity stays stable
   * between renders.
   */
  theme?: INVIDUITheme;
};

function isThemeScheme(name: string): name is ThemeScheme {
  return THEME_SCHEMES.some((scheme) => scheme === name);
}

function assertValidTheme(theme: INVIDUITheme) {
  for (const [scheme, colors] of Object.entries(theme)) {
    if (!isThemeScheme(scheme)) {
      throw new Error(
        `@invid/ui: unknown theme scheme "${scheme}". Supported schemes: ${THEME_SCHEMES.join(", ")}.`,
      );
    }
    for (const [color, value] of Object.entries(colors)) {
      if (!isThemeColor(color) || typeof value !== "string") {
        throw new Error(
          `@invid/ui: invalid theme color "${color}" in the ${scheme} scheme. Supported colors, each a color string: ${themeColorNames().join(", ")}.`,
        );
      }
    }
  }
}

function resolveEngineVariables(
  theme: INVIDUITheme,
  scheme: ThemeScheme,
): Record<string, string> {
  const overrides = theme[scheme];
  return Object.fromEntries(
    themeColorNames().map((color) => [
      THEME_COLORS[color].engineVariable,
      overrides?.[color] ?? THEME_COLORS[color][scheme],
    ]),
  );
}

const DEFAULT_THEME: INVIDUITheme = {};

/**
 * Root provider for `@invid/ui`. Render it once, as the outermost element of
 * the app.
 */
export function INVIDUIProvider({
  children,
  theme = DEFAULT_THEME,
}: INVIDUIProviderProps) {
  const appliedSignature = useRef<string | undefined>(undefined);

  useLayoutEffect(() => {
    assertValidTheme(theme);

    const activeScheme = Uniwind.currentTheme;
    const schemes = [...THEME_SCHEMES].sort(
      (first, second) =>
        Number(first === activeScheme) - Number(second === activeScheme),
    );
    const variables = schemes.map(
      (scheme) => [scheme, resolveEngineVariables(theme, scheme)] as const,
    );
    const signature = JSON.stringify(variables);
    if (signature === appliedSignature.current) {
      return;
    }

    for (const [scheme, schemeVariables] of variables) {
      Uniwind.updateCSSVariables(scheme, schemeVariables);
    }
    appliedSignature.current = signature;
  }, [theme]);

  return (
    <GestureHandlerRootView style={styles.root}>
      <HeroUINativeProviderRaw config={ENGINE_CONFIG}>
        {children}
      </HeroUINativeProviderRaw>
    </GestureHandlerRootView>
  );
}
