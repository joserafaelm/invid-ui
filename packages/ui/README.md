# @invid/ui

React Native UI components for iOS and Android. Web is not supported.

## Requirements

| Dependency                     | Supported range    | Tested version |
| ------------------------------ | ------------------ | -------------- |
| React                          | `>=19.1.0 <20.0.0` | `19.2.3`       |
| React Native                   | `>=0.82.0 <0.87.0` | `0.86.3`       |
| react-native-gesture-handler   | `^2.28.0`          | `2.32.0`       |
| react-native-reanimated        | `^4.1.1`           | `4.5.1`        |
| react-native-safe-area-context | `^5.6.0`           | `5.7.0`        |
| react-native-svg               | `^15.12.1`         | `15.15.4`      |
| react-native-worklets          | `>=0.5.1`          | `0.10.1`       |

The library is tested with Expo SDK 57, where Expo Go includes all of the native
packages above. It needs Node.js 20.19+ or 22.12+ (the same minimum as Expo),
and is published as ES modules only.

## Install and set up

1. Install the package and the native packages it needs. In an Expo app:

   ```sh
   npx expo install @invid/ui react-native-gesture-handler react-native-reanimated react-native-safe-area-context react-native-svg react-native-worklets
   ```

2. Wrap your Metro config with `withINVIDUI`. It must be the outermost wrapper.

   ```js
   // metro.config.js
   const { getDefaultConfig } = require("expo/metro-config");
   const { withINVIDUI } = require("@invid/ui/metro");

   module.exports = withINVIDUI(getDefaultConfig(__dirname));
   ```

3. Render `INVIDUIProvider` once, as the outermost element of the app.

   ```tsx
   import { INVIDUIProvider } from "@invid/ui/provider";

   export default function App() {
     return <INVIDUIProvider>{/* your app */}</INVIDUIProvider>;
   }
   ```

4. Let the app follow the system appearance, so dark mode works. In `app.json`:

   ```json
   { "expo": { "userInterfaceStyle": "automatic" } }
   ```

5. Restart Metro.

That is the whole setup. There is no styling library to install or configure.
`withINVIDUI` writes generated files to a `.invid-ui/` folder in your project;
the folder ignores itself in git.

If your project uses ES modules (`"type": "module"`), write the Metro config
with imports instead:

```js
// metro.config.js
import { withINVIDUI } from "@invid/ui/metro";
import { getDefaultConfig } from "expo/metro-config.js";

export default withINVIDUI(getDefaultConfig(import.meta.dirname));
```

## Theming

Colors follow the system light and dark appearance. To change them, pass a
`theme` to the provider. Colors you leave out keep their default value, and
edits apply on save without restarting Metro.

```tsx
import type { INVIDUITheme } from "@invid/ui/provider";
import { INVIDUIProvider } from "@invid/ui/provider";

const theme: INVIDUITheme = {
  light: {
    background: "#ffffff",
    foreground: "#171717",
    "muted-foreground": "#646464",
  },
  dark: {
    background: "#0a0a0a",
    foreground: "#fafafa",
    "muted-foreground": "#a3a3a3",
  },
};

export default function App() {
  return <INVIDUIProvider theme={theme}>{/* your app */}</INVIDUIProvider>;
}
```

The values shown are the defaults, and these three colors are the full list
today. Define the theme outside the component so it is not recreated on every
render. An unknown color name is a type error, and throws at runtime in plain
JavaScript. The theme applies to the whole app, so render one provider with one
theme.

Read a theme color in your own code with `useThemeColor`, for example to paint a
screen background or a navigation header:

```tsx
import { useThemeColor } from "@invid/ui/theme";

const backgroundColor = useThemeColor("background");
```

## Usage

Each component has its own import path; there is no root import.

```tsx
import { P } from "@invid/ui/p";

<P>Paragraph text</P>;
<P variant="lead">Introductory paragraph text</P>;
<P variant="muted" numberOfLines={2}>
  Secondary paragraph text
</P>;
```

`P` has `default`, `lead`, and `muted` variants and accepts every React Native
`Text` prop. Components are styled through variants, not class names; the native
`style` prop remains available as the final override for layout adjustments.

## Troubleshooting

| Symptom                                   | Fix                                                                                  |
| ----------------------------------------- | ------------------------------------------------------------------------------------ |
| Error: `styles are not configured`        | Wrap the Metro config with `withINVIDUI`, then restart Metro.                         |
| Error: `theme color "…" is unavailable`   | Render `INVIDUIProvider` above the component, and check the Metro config is wrapped. |
| Components render unstyled after an upgrade | Start Metro once with a clean cache: `npx expo start --clear`.                      |
| Dark mode never activates                 | Set `"userInterfaceStyle": "automatic"` in `app.json`.                                |

## Development

See the [repository README](../../README.md) for the monorepo workflow.
