# @invid/ui

React Native UI components for iOS and Android. Web is not supported.

## Requirements

| Dependency | Supported range | Tested version |
| --- | --- | --- |
| React | `>=19.1.0 <20.0.0` | `19.3.0` |
| React Native | `>=0.82.0 <0.89.0` | `0.88.0` |
| react-native-gesture-handler | `^2.28.0 \|\| ^3.0.0` | `3.3.0` |
| react-native-reanimated | `^4.1.1` | `4.7.1` |
| react-native-safe-area-context | `^5.6.0` | `5.10.1` |
| react-native-svg | `^15.12.1` | `15.16.0` |
| react-native-worklets | `>=0.5.1` | `0.13.0` |

Install these only if you use the components that need them:

| Dependency | Needed for | Supported range | Tested version |
| --- | --- | --- | --- |
| `@react-native-community/datetimepicker` | `@invid/ui/date-picker`, `@invid/ui/time-picker` | `^9.1.0` | `9.2.1` |
| `@tanstack/react-form` | `@invid/ui/form-fields` | `^1.33.5` | `1.33.5` |
| `lucide-react-native` | `@invid/ui/icons`, `@invid/ui/avatar` | `^1.57.0` | `1.63.0` |

The library is tested with Expo SDK 58, where Expo Go includes all of the native
packages above. It needs Node.js 22.13+, 24.3+, or 26+ (the same minimum as
Expo SDK 58), and is published as ES modules only.

## Install and set up

1. Install the package and the native packages it needs. In an Expo app:

   ```sh
   npx expo install @invid/ui react-native-gesture-handler react-native-reanimated react-native-safe-area-context react-native-svg react-native-worklets
   ```

   Add `lucide-react-native`, `@react-native-community/datetimepicker`, or
   `@tanstack/react-form` to that command if you use the components that need
   them.

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
import { getDefaultConfig } from "expo/metro-config";

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
  light: { primary: "#0057b8", background: "#ffffff" },
  dark: { primary: "#4da3ff", background: "#0a0a0a" },
};

export default function App() {
  return <INVIDUIProvider theme={theme}>{/* your app */}</INVIDUIProvider>;
}
```

These are the colors you can set, with their defaults:

| Color | Light default | Dark default |
| --- | --- | --- |
| `background` | `#F2F4F5` | `#F2F4F5` |
| `foreground` | `#171717` | `#171717` |
| `muted-foreground` | `#646464` | `#646464` |
| `muted-background` | `#E3F2FD` | `#E3F2FD` |
| `primary` | `#00728f` | `#00728f` |
| `primary-foreground` | `#f8fbfc` | `#f8fbfc` |
| `secondary` | `#0E3052` | `#0E3052` |
| `secondary-foreground` | `#0f172a` | `#0f172a` |
| `accent` | `#00AECC` | `#00AECC` |
| `text` | `#00AECC` | `#00AECC` |
| `soporte` | `#0085AA` | `#0085AA` |

Define the theme outside the component so it is not recreated on every render.
An unknown color name is a type error, and throws at runtime in plain
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

| Import path              | Exports                                                   |
| ------------------------ | --------------------------------------------------------- |
| `@invid/ui/p`            | `P` (paragraph text)                                      |
| `@invid/ui/title`        | `Title` (heading, announced as a header)                  |
| `@invid/ui/button`       | `Button`                                                  |
| `@invid/ui/text-input`   | `TextInput`                                               |
| `@invid/ui/number-input` | `NumberInput` (decimal keyboard, sanitized input)         |
| `@invid/ui/date-picker`  | `DatePicker`                                              |
| `@invid/ui/time-picker`  | `TimePicker`                                              |
| `@invid/ui/form-fields`  | `useAppForm` with `TextField`, `NumberField`, `SubmitButton` |
| `@invid/ui/container`    | `Container` (layout variants)                             |
| `@invid/ui/icons`        | `Icon`                                                    |
| `@invid/ui/avatar`       | `Avatar`                                                  |

```tsx
import { P } from "@invid/ui/p";

<P>Paragraph text</P>;
<P variant="lead">Introductory paragraph text</P>;
<P variant="muted" numberOfLines={2}>
  Secondary paragraph text
</P>;
```

Components are styled through named variants, not class names. Each accepts the
props of the React Native element it renders, including `ref`, and the native
`style` prop remains available as the final override for layout adjustments.
`NumberInput` takes either `value` (controlled) or `defaultValue`
(uncontrolled), not both. The date and time pickers need
`@react-native-community/datetimepicker` installed in the app.

## Troubleshooting

| Symptom                                   | Fix                                                                                  |
| ----------------------------------------- | ------------------------------------------------------------------------------------ |
| Error: `styles are not configured`        | Wrap the Metro config with `withINVIDUI`, then restart Metro.                         |
| Error: `theme color "…" is unavailable`   | Render `INVIDUIProvider` above the component, and check the Metro config is wrapped. |
| Components render unstyled after an upgrade | Start Metro once with a clean cache: `npx expo start --clear`.                      |
| Dark mode never activates                 | Set `"userInterfaceStyle": "automatic"` in `app.json`.                                |

## Development

See the [repository README](../../README.md) for the monorepo workflow.