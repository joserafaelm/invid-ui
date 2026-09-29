# React Native Storybook Best Practices

Agent reference for implementing and maintaining Storybook in React Native and Expo.

**Verified:** 2026-09-26. **Baseline:** Storybook React Native 10.6; entry-point swapping requires 10.4+. Latest release observed: 10.6.0. Recheck releases and installed package APIs before upgrades. Examples are implementation patterns, not a dependency compatibility guarantee. [1]

The supplied introductory guides remain useful background, but their setup examples predate this baseline. [27][28]

## 1. Establish the project constraints

- Inspect `package.json`, the lockfile, app entry point, Metro/Babel configuration, existing stories, and CI. Identify Expo SDK, React Native, React, Node, Storybook, package manager, platforms, and whether Expo Router is used.
- Preserve working repository conventions. Use documentation matching the installed version; do not silently upgrade the app or replace its bundler configuration to add Storybook.
- Keep Storybook core, renderer, and on-device addons on mutually compatible versions. Check peer dependencies rather than independently installing each package's latest version. Commit the lockfile. Migrate existing installations through supported version steps. Storybook 10's documented Node minimum is 20.19+ or 22.12+; choose a supported Node release satisfying **all** project engines. [1][2]
- In Expo, install native peers with `npx expo install` so Expo can select compatible versions. Check the initializer's changes and run `npx expo-doctor`. Reuse the project's native-library configuration; do not paste historical Reanimated/Babel recipes. [3]
- Use a development build when the components or dependencies require native code unavailable in Expo Go. Rebuild that client after changing native dependencies. Storybook does not remove native-module requirements. [3][4]

## 2. Choose one integration

| Need                                                          | Integration                                                                         |
| ------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| Default for new native setups, including Expo Router projects | Entry-point swapping with `@storybook/react-native/withStorybook` (10.4+).          |
| Explicit requirement to open Storybook inside app navigation  | In-app integration with `@storybook/react-native/metro/withStorybook`.              |
| Browser documentation and browser-based component testing     | Optional, separate `@storybook/react-native-web-vite` configuration. See section 7. |

These two native wrappers have different behavior despite sharing the name `withStorybook`. Do not combine their setup instructions. [5][6]

### Default: entry-point swapping

For a new installation, run `npm create storybook@latest` (or the project's package-manager equivalent), select React Native, and review the generated changes. Verify that the selected release fits the project first. For an existing installation, follow its migration guide instead of rerunning initialization. [5]

Minimal Expo configuration for the baseline:

```js
// metro.config.js — preserve existing configuration and wrappers.
const { getDefaultConfig } = require("expo/metro-config");
const { withStorybook } = require("@storybook/react-native/withStorybook");

const metroConfig = getDefaultConfig(__dirname);
module.exports = withStorybook(metroConfig);
```

`STORYBOOK_ENABLED=true` selects Storybook at bundle time. Otherwise this wrapper is a no-op. Keep the normal app entry, including `expo-router/entry`, intact and keep Storybook imports out of the application dependency graph. Compose existing Metro customizations, such as NativeWind, rather than overwriting them; validate wrapper order. [5][6]

Use explicit scripts; install `cross-env` as a development dependency if using these portable examples:

```json
{
  "scripts": {
    "storybook": "cross-env STORYBOOK_ENABLED=true expo start",
    "storybook:ios": "cross-env STORYBOOK_ENABLED=true expo start --ios",
    "storybook:android": "cross-env STORYBOOK_ENABLED=true expo start --android"
  }
}
```

Restart Metro when switching bundle modes. The flag belongs to the bundler process; this approach needs no `EXPO_PUBLIC_` flag or application switcher. [7]

### Configuration responsibilities

Use `.rnstorybook/` for native configuration. Keep discovery narrow and relative to `main.ts`:

```ts
// .rnstorybook/main.ts
import type { StorybookConfig } from "@storybook/react-native";

const config: StorybookConfig = {
  framework: "@storybook/react-native",
  stories: ["../src/components/**/*.stories.@(ts|tsx)"],
  deviceAddons: ["@storybook/addon-ondevice-controls", "@storybook/addon-ondevice-actions"],
};

export default config;
```

Adapt the glob to actual source directories. Put on-device addons in `deviceAddons`, not web addon presets. Install only the selected addons and their required peers. [8][9]

```ts
// .rnstorybook/preview.tsx
import type { Preview } from "@storybook/react-native";

const preview: Preview = {};
export default preview;
```

Add shared decorators and parameters here as needed; section 5 defines their scope. [8]

The swapped entry must **register** a root component. A default export alone is insufficient. This minimal Expo example intentionally disables selection persistence: [10][29]

```tsx
// .rnstorybook/index.tsx — entry-point swapping only.
import { registerRootComponent } from "expo";
import { view } from "./storybook.requires";

const CatalogRoot = view.getStorybookUI({ shouldPersistSelection: false });
registerRootComponent(CatalogRoot);
```

Retain the initializer's storage adapter if persistence is desired. For React Native CLI without Expo, retain its Metro base configuration and use `AppRegistry.registerComponent` with the app's actual registered name. Do not add Expo merely to copy this example. [8][10][11]

`storybook.requires.ts` is generated: never edit it manually. The wrapper generates story imports; restart Metro after discovery/configuration changes. If CI needs this file before Metro runs, use the installed package's `sb-rn-get-stories` command. Follow the repository's generated-file policy and ensure a clean checkout works. [8]

### Alternative: an in-app Expo Router route

Use this only when navigation integration is required. Replace the wrapper import with the Metro-specific path and explicitly control inclusion:

```js
const { withStorybook } = require("@storybook/react-native/metro/withStorybook");

module.exports = withStorybook(metroConfig, {
  enabled: process.env.EXPO_PUBLIC_STORYBOOK_ENABLED === "true",
});
```

Set that same flag in the launch/build environment. Guard the route and its navigation links with `process.env.EXPO_PUBLIC_STORYBOOK_ENABLED === 'true'`; use `Stack.Protected` when supported by the installed Router version. Hide the route's header. Export a Storybook UI component from a dedicated module and render it in the route; **do not import the root-registering entry above**. Adjust relative paths for `app/` versus `src/app/`. [6][12]

Route guards control navigation; they do not remove dependencies. The Metro-specific wrapper must also be disabled for customer builds. Public Expo variables are inlined, require static dot notation, and cannot hold secrets. Do not use `NODE_ENV` as the Storybook selector. [6][13]

## 3. Keep stories close to components

- Colocate `Component.stories.tsx` with reusable components and screen views, outside Expo Router's `app/` or `src/app/` route tree. Keep route files thin and story the extracted view. Router treats files inside its route directory as routes. [14][15]
- Never export stories, fixtures, or Storybook helpers through production barrels. Production components must not import their own stories.
- Use stable titles and named story exports. Renaming them can change story IDs used by automation and review links.
- Keep fixtures in small shared modules when reused. Avoid generating a second component implementation solely for Storybook.

## 4. Write typed, state-focused stories

Prefer stable CSF object stories. Import native story types from `@storybook/react-native`, use `satisfies Meta<typeof Component>`, and derive `StoryObj<typeof meta>`. Avoid legacy `storiesOf`, Knobs, and unnecessary template/bind boilerplate. Do not adopt experimental CSF APIs without checking native support. [2][14][16]

This self-contained example uses React Native's `Button`; substitute the actual application component and its props:

```tsx
// src/components/Button.stories.tsx
import { Button } from "react-native";
import type { Meta, StoryObj } from "@storybook/react-native";
import { fn } from "storybook/test";

const meta = {
  title: "Primitives/Button",
  component: Button,
  args: { title: "Continue", onPress: fn() },
  argTypes: { onPress: { control: false } },
  parameters: { layout: "centered" },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Disabled: Story = { args: { disabled: true } };
export const LongLabel: Story = {
  args: { title: "Continue to delivery preferences" },
};
```

- Put shared defaults in `meta.args`; each story supplies only its differences. Args are shallowly overridden: explicitly merge nested objects when needed. Keep editable data serializable; use mappings or render logic for complex values. [17]
- Use explicit callback spies such as `fn()` for observable interactions. `argTypes.action` can log events, but inferred actions are not a substitute for spies in assertions. [16][18]
- Prefer default rendering. Add `render` only for composition or a stateful harness, and forward args. Put React hooks in a named React component; do not call hooks at module scope. For controlled inputs, wire value and change handlers so typing works; synchronize with Controls when that is part of the story's purpose.
- Cover meaningful states: default, loading, empty, error, disabled, selected, and important content extremes where applicable. Avoid every possible prop permutation. Add variants for themes, text scaling, RTL, or platform differences when behavior changes.
- Keep `argTypes` focused on useful controls; constrain enums and ranges, and disable controls for callbacks or unsuitable objects. Do not duplicate all inferred prop metadata. [9]

## 5. Isolate providers, data, and side effects

The following are implementation recommendations derived from Storybook's isolation and decorator model. [19]

- Reuse a lightweight provider composition in `preview.tsx` for theme, localization, safe areas, gestures, and fonts that most stories need. Add component/story-specific providers locally. Preserve provider order and do not wrap every leaf in an entire application bootstrap.
- Entry swapping bypasses the app root and Router layout. Explicitly provide required initialization without starting production analytics, authentication, push registration, or background services.
- Build deterministic stories: fixed fixtures, dates, IDs, locale, assets, and network outcomes. Each story must work independently of selection order. Reset mutable stores, query caches, handlers, and subscriptions between scenarios; avoid shared mutable fixture objects.
- Prefer injected data or service adapters for isolated views. If using MSW on-device, use its React Native integration (`msw/native`) and required polyfills. Browser `setupWorker` is not a native solution; Jest uses the Node integration. Validate the chosen integration on the device runtime. [20]
- Match real layout constraints. Use fullscreen presentation for screen stories, intentional component spacing, and one owner for safe-area insets. Exercise keyboard behavior, long/localized text, accessibility labels/states, and light/dark themes on supported platforms. Storybook chrome styling does not configure the component's theme.

## 6. Reuse stories in meaningful tests

For Expo, use the project's compatible `jest-expo` preset and React Native Testing Library (RNTL). Reuse story args and decorators with `composeStories`/`composeStory` from `@storybook/react`; install that compatible package explicitly when needed. Register global preview annotations in Jest setup, without importing the generated Storybook UI entry. [21][22]

```ts
// jest.setup.ts — register in setupFilesAfterEnv.
import { setProjectAnnotations } from "@storybook/react";
import preview from "./.rnstorybook/preview";

setProjectAnnotations(preview);
```

```tsx
// Button.test.tsx — example for RNTL 14.
import { composeStories } from "@storybook/react";
import { render, screen, userEvent } from "@testing-library/react-native";
import * as stories from "./Button.stories";

const { Disabled } = composeStories(stories);

test("disabled button prevents activation", async () => {
  const onPress = jest.fn();
  const user = userEvent.setup();
  await render(<Disabled onPress={onPress} />);

  const button = screen.getByRole("button", { name: /continue/i });
  expect(button).toBeDisabled();
  await user.press(button);
  expect(onPress).not.toHaveBeenCalled();
});
```

**Version-sensitive testing:** RNTL 14 requires React 19+, React Native 0.78+, and Node `^22.13.0 || >=24`; it uses the `test-renderer` peer and async `render`/event APIs. RNTL 13 has different renderer requirements. Follow installed RNTL documentation and peer dependencies; do not remove a required renderer from an older setup. Current RNTL includes matchers, so do not add deprecated `@testing-library/jest-native` from older examples. [23][24]

Use role/accessible-name queries and assert user-visible behavior. Mock native modules using their maintained test setup; adjust Jest transformation only for actual dependency requirements. Do not substitute blanket snapshots for interaction assertions. [22][23]

Native visual checks need a device/simulator tool such as Maestro or Detox and an explicit comparison workflow. Select stories deterministically; disable persisted selection and hide on-device chrome when taking screenshots. Fix device/OS, fonts, theme, locale, data, and animation state. Screenshots alone do not implement regression comparisons. [11][21]

Storybook's browser test runner does not drive `@storybook/react-native` directly. Do not assume DOM-oriented `play`, `within`, browser `userEvent`, or web accessibility addons work on native views. Use RNTL for native component assertions and device automation for native interaction/layout. [25]

## 7. Add web and sharing only when needed

Use `.storybook/` with `@storybook/react-native-web-vite` for a separate browser Storybook; share compatible CSF stories and fixtures with `.rnstorybook/`. Keep platform-specific decorators, mocks, and addons in their respective configurations. Prefer this maintained framework over the older `@storybook/addon-react-native-web`. [26]

Running the on-device Storybook UI through Expo Web is another option; it is not the full Vite Storybook. Web documentation, browser tests, and web visual baselines do not establish iOS/Android correctness. [26]

For a distributable native catalog, use a dedicated EAS build profile and update channel; consider separate app identifiers for side-by-side installation. Set the Storybook flag explicitly for both builds and updates. Release-mode catalog builds cannot rely on `__DEV__`. Customer build/update pipelines must leave Storybook disabled. [7][13][27]

Keep build-time Storybook tooling available during bundling, even when excluded from the resulting JavaScript. JavaScript exclusion does not remove already-linked native libraries from the binary.

## 8. Verification and failure triage

Before declaring implementation complete:

1. Start from a clean dependency install; confirm generation, type checking, and relevant tests pass.
2. Open Storybook on each supported native platform. Verify discovery, Controls, Actions, provider initialization, and a stateful component.
3. Start the normal app with Storybook disabled. Verify a production-mode bundle/export excludes stories, fixtures, and Storybook dependencies; inspect bundle/module output rather than relying on hidden navigation.
4. Report the chosen integration, versions, launch/test commands, and checks actually run. State unavailable platform checks explicitly.

| Symptom                        | Check first                                                                                                                       |
| ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------- |
| Missing stories or stale list  | Glob relative to `main.ts`, config path, generated imports; restart Metro. Use `expo start --clear` if stale resolution persists. |
| App opens instead of Storybook | Correct wrapper import, bundler flag, restarted Metro process.                                                                    |
| Root component not registered  | Earlier startup exception, followed by registration in the swapped entry and correct native app name.                             |
| Blank in-app catalog           | Metro inclusion flag and route guard agree; route renders a UI component, not a root-registering module.                          |
| Native module/Reanimated error | Expo-compatible peers and native client build; do not assume cache clearing installs native code.                                 |
| Jest syntax/renderer error     | Installed RNTL peers, Jest preset, ESM transforms, and accidentally imported UI/generated entry.                                  |

Do not carry forward v9's default `withStorybook` import, `withStorybookConfig` path, or `onDisabledRemoveStorybook` option into this baseline. Consult migration notes when maintaining older projects. [1]

## Official references

All sources were checked on the verification date. API-specific documentation and installed package declarations take priority over historical tutorials; recommendations above synthesize those sources.

1. [React Native releases](https://github.com/storybookjs/react-native/releases) and [migration guide](https://github.com/storybookjs/react-native/blob/next/MIGRATION.md).
2. [Storybook 10 migration and runtime requirements](https://storybook.js.org/docs/releases/migration-guide).
3. [Expo: using libraries](https://docs.expo.dev/workflow/using-libraries/).
4. [Expo: development builds](https://docs.expo.dev/develop/development-builds/introduction/).
5. [React Native Storybook: getting started](https://storybookjs.github.io/react-native/docs/intro/getting-started/).
6. [Metro wrapper reference](https://storybookjs.github.io/react-native/docs/intro/configuration/metro-configuration/).
7. [Storybook environment variables](https://storybookjs.github.io/react-native/docs/intro/configuration/environment-variables/).
8. [Native configuration and generated files](https://storybookjs.github.io/react-native/docs/intro/getting-started/manual-setup/).
9. [On-device addons](https://storybookjs.github.io/react-native/docs/intro/addons/).
10. [Migrating to entry-point swapping](https://storybookjs.github.io/react-native/docs/intro/getting-started/migrating-to-entry-point-swapping/).
11. [Storybook UI configuration](https://storybookjs.github.io/react-native/docs/intro/configuration/storybook-ui-configuration/).
12. [Expo Router integration](https://storybookjs.github.io/react-native/docs/intro/getting-started/expo-router/).
13. [Expo environment variables](https://docs.expo.dev/guides/environment-variables/).
14. [Native story authoring](https://storybookjs.github.io/react-native/docs/intro/writing-stories/).
15. [Expo Router directory rules](https://docs.expo.dev/router/basics/core-concepts/).
16. [Maintainer's native story-authoring reference](https://github.com/storybookjs/react-native/blob/next/skills/writing-react-native-storybook-stories/SKILL.md).
17. [Storybook args](https://storybook.js.org/docs/writing-stories/args).
18. [Storybook actions and spies](https://storybook.js.org/docs/essentials/actions).
19. [Storybook decorators](https://storybook.js.org/docs/writing-stories/decorators).
20. [MSW React Native integration](https://mswjs.io/docs/integrations/react-native/).
21. [Native portable stories and testing](https://storybookjs.github.io/react-native/docs/intro/testing/).
22. [Expo Jest setup](https://docs.expo.dev/develop/unit-testing/).
23. [RNTL quick start](https://oss.callstack.com/react-native-testing-library/docs/start/quick-start).
24. [RNTL 14 migration](https://oss.callstack.com/react-native-testing-library/docs/start/migration-v14).
25. [Storybook test-runner: React Native limitations](https://github.com/storybookjs/test-runner#react-native-support).
26. [React Native Web Vite framework](https://storybook.js.org/docs/get-started/frameworks/react-native-web-vite).
27. [Expo's Storybook article](https://expo.dev/blog/storybook-and-expo) — written for v9; useful context, not the current default setup.
28. [Intro to Storybook: React Native tutorial](https://storybook.js.org/tutorials/intro-to-storybook/react-native/en/get-started/) — learning material; reconcile setup examples with the versioned native docs.
29. [Expo root registration API](https://docs.expo.dev/versions/latest/sdk/expo/#registerrootcomponentcomponent).
