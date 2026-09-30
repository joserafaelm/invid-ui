# Developing UI components

This is the day-to-day workflow for building components in `@invid/ui`.
It covers how to work and the standards every component must meet.
[`CONTRIBUTING.md`](CONTRIBUTING.md) lists what every contribution must include.

## How the pieces fit

| Path             | Role                                                            |
| ---------------- | --------------------------------------------------------------- |
| `packages/ui`    | The library. Source in `src/`, compiled to `dist/` by `tsc`.    |
| `apps/storybook` | On-device Storybook: one story file per component and state.    |
| `apps/demo`      | Expo Router app: one screen per component, in a sidebar menu.   |

Inside `packages/ui/src`:

| Folder      | Holds                                                                  |
| ----------- | ---------------------------------------------------------------------- |
| `ui/`       | One file per public component.                                         |
| `theme/`    | `tokens.ts` (the color definitions) and the `useThemeColor` hook.      |
| `provider/` | `INVIDUIProvider`, which applies the consumer's theme.                 |
| `metro/`    | `withINVIDUI`, the Metro wrapper. Runs in Node, not in the app.        |
| `internal/` | Private helpers. Never exported.                                       |

Both apps import the library only through its public export map
(`@invid/ui/<name>`), which resolves to `dist/`. They run exactly what a
consumer installs, so a component is visible to the apps only after it has an
export-map entry and has been built.

The apps are set up exactly like a consumer's app: `withINVIDUI` in
`metro.config.js`, `INVIDUIProvider` at the root, and no styling library of
their own. The library is built on Uniwind (Tailwind classes) and HeroUI Native,
but both are private implementation details. Nothing a consumer imports,
configures, or writes may name them, so either can be replaced without a
breaking change.

## Setup

Requirements: Bun, Node.js 20.19+ or 22.12+ (Expo SDK 57 and Storybook 10),
Xcode with an iOS Simulator, and Android Studio with an emulator.

```sh
bun install
```

Both apps use only native modules included in the Expo SDK, so `expo start`
opens them in Expo Go. A development build is needed only if a component adds
native code.

## The inner loop

Run two terminals from the repository root:

```sh
bun run dev              # terminal 1: rebuild packages/ui/dist on every save
bun run storybook:ios    # terminal 2: or storybook:android, demo:ios, demo:android
```

Saving a file in `packages/ui/src` rebuilds `dist/`; the running app reloads the
component and its classes are recompiled, including classes you just added.
New story files appear in Storybook without restarting Metro. Two things need a
restart of the app's Metro: theme token edits, and changes under `src/metro`,
which `bun run dev` builds once when it starts rather than watching.

Use Storybook to build and review each state in isolation, and the demo app to
check the component inside real navigation and layouts.

## Adding a component

`P` is the reference implementation: copy its structure from
[`packages/ui/src/ui/p.tsx`](packages/ui/src/ui/p.tsx) and its story from
[`apps/storybook/src/stories/p.stories.tsx`](apps/storybook/src/stories/p.stories.tsx).

1. **Implement** `packages/ui/src/ui/<name>.tsx`.
   - Derive props from the primitive you render (`ComponentProps<typeof Pressable>`)
     and `Omit` the props the component owns, including `className` props.
   - Define variants with `tv()` from `tailwind-variants`, backed by a
     `SCREAMING_SNAKE_CASE` map that `satisfies Record<Variant, string>`.
   - Accept `ref` as a normal prop; set `accessibilityRole`, `accessibilityState`,
     and labels as part of the component's contract.
   - Build on existing components instead of re-implementing them: a text
     input's label renders `P` (or a new `Label` component), not a raw `Text`
     with copied classes. Import siblings through the alias, for example
     `import { P } from "#/ui/p"`.
2. **Add tokens** for any new color to `THEME_COLORS` in
   [`packages/ui/src/theme/tokens.ts`](packages/ui/src/theme/tokens.ts), with a
   light and a dark value. That one entry creates the class (`text-<token>`),
   the key consumers override in the provider's `theme` prop, and the
   `useThemeColor` name.
   Components use semantic tokens (`text-foreground`), never raw palette values.
3. **Keep helpers private** in `src/internal/` and import them with the `#/`
   alias, for example `import { x } from "#/internal/x"`. Never export them.
4. **Export** the component from `packages/ui/package.json`, with `types` first and
   `default` last. There is no root barrel file; each component gets its own subpath:

   ```json
   "./<name>": {
     "types": "./dist/ui/<name>.d.ts",
     "default": "./dist/ui/<name>.js"
   }
   ```

5. **Write stories** in `apps/storybook/src/stories/<name>.stories.tsx`. A
   story file is required for every component; see
   [Writing stories](#writing-stories).
6. **Add a demo screen** at `apps/demo/src/app/<name>.tsx`, then add it to
   `DEMO_SCREENS` in `apps/demo/src/app/_layout.tsx` to set its title and
   position in the sidebar menu. A route missing from the list still appears in
   the menu, after the listed ones, under its file name.
7. **Document usage** in [`packages/ui/README.md`](packages/ui/README.md), the
   consumer-facing README. List any new theme color in its Theming section.

## Writing stories

Every component ships with a story file. Stories live in the Storybook app, not
next to the component, because the app must consume the library the way a
consumer does.

1. Create `apps/storybook/src/stories/<name>.stories.tsx`. Any file matching
   `apps/storybook/src/**/*.stories.tsx` is picked up, and it appears in a running
   Storybook without a restart.
2. Import the component from its public path, `@invid/ui/<name>`, never from
   `packages/ui/src`.
3. Describe the component in `meta`, then export one named story per state
   (`Button` here is illustrative; `p.stories.tsx` is the working example):

   ```tsx
   import { Button } from "@invid/ui/button";
   import type { Meta, StoryObj } from "@storybook/react-native";
   import { StyleSheet, View } from "react-native";
   import { fn } from "storybook/test";

   const BUTTON_VARIANTS = ["primary", "secondary"] as const;

   const styles = StyleSheet.create({ stack: { gap: 8 } });

   const meta = {
     title: "Actions/Button",
     component: Button,
     args: { children: "Continue", onPress: fn(), variant: "primary" },
     argTypes: {
       onPress: { control: false },
       variant: { control: { type: "select" }, options: BUTTON_VARIANTS },
     },
   } satisfies Meta<typeof Button>;

   export default meta;

   type Story = StoryObj<typeof meta>;

   export const Default: Story = {};

   export const Disabled: Story = { args: { disabled: true } };

   export const Stacked: Story = {
     render: (args) => (
       <View style={styles.stack}>
         <Button {...args} variant="primary" />
         <Button {...args} variant="secondary" />
       </View>
     ),
   };
   ```

Conventions:

- **Title** is `Group/Component` (`Typography/P`). Keep titles and export names
  stable; they form the story IDs.
- **Shared defaults go in `meta.args`**; each story overrides only what differs.
- **One story per meaningful state**: default, each variant, disabled, loading,
  error, selected, and long or truncated content where they apply. Skip
  permutations that show nothing new.
- **Controls**: list variant options with `control: { type: "select" }`, and turn
  controls off for callbacks.
- **Callbacks** use `fn()` from `storybook/test` so presses show in the Actions
  panel.
- **`render`** is only for composition or a stateful wrapper, and must forward
  `args`.
- The preview already wraps each story in `INVIDUIProvider` and the theme
  background with padding, so stories need no wrapper of their own.
- Stories are consumer code: lay them out with `StyleSheet`, not class names.

Check each story on iOS and Android with `bun run storybook:ios` and
`bun run storybook:android`. More authoring guidance is in
[`docs/react-native-storybook-best-practices(1).md`](docs/react-native-storybook-best-practices(1).md).

## Component standards

### Scope

- The library supports **iOS and Android only**. Do not add DOM APIs, browser
  fallbacks, React Native Web branches, or web exports.
- It targets React 19+ and React Native 0.82+ on the New Architecture. The peer
  ranges in `packages/ui/package.json` are the support contract; widen them only
  after testing the new versions.
- Build from React Native primitives in TypeScript. Add native code only when
  the behavior cannot be implemented correctly without it.
- Make the smallest change that solves the problem. Do not add props, variants,
  or exports for needs nobody has yet.

### Public API and packaging

- The package is ESM-only and ships compiled JavaScript plus declarations, one
  output file per source module. Do not bundle it into a single file or add
  CommonJS output.
- Every public entry point is an explicit `exports` entry. No wildcard exports
  and no barrel files (`index.ts` files that re-export other modules).
- Never export `src/internal`, stories, test helpers, or implementation-only
  types. Export only the props and types consumers need.
- Importing one component must not load unrelated ones, and modules must do no
  work at import time (no global mutation, subscriptions, timers, or logging).
  Keep `sideEffects` in `package.json` truthful.
- `react`, `react-native`, and required native modules are peer and dev
  dependencies. Runtime utilities go in `dependencies`; optional native integrations are optional peers behind
  their own subpath. Agree on any new runtime dependency before adding it.
- Removing or renaming a component, prop, type, token, or subpath is a breaking
  change. So is changing a default, layout metrics, accessibility semantics,
  style precedence, a ref target, or a peer version floor.

### TypeScript

- Keep strict mode. Do not use `any`; take `unknown` at untyped boundaries and
  narrow it once. Do not use type assertions to silence the compiler.
- Derive props from the primitive actually rendered and `Omit` the props the
  component owns. Reuse React Native's event, style, accessibility, and ref
  types instead of redefining them.
- Accept `ref` as a normal prop typed with `Ref<ComponentRef<typeof Primitive>>`;
  do not use `forwardRef`.
- Use string-literal unions instead of enums, and discriminated unions for
  mutually exclusive states. Controlled and uncontrolled modes (`value` versus
  `defaultValue`) must be mutually exclusive in the types.
- Put accessibility requirements in the types where practical: an icon-only
  control must require an accessible label.
- Use `import type` and `export type` for type-only imports and exports.

### Component design

- Prefer composition and `children` over configuration props. Use compound
  components when parts must coordinate state, focus, or layout.
- Add a variant or size only for a demonstrated semantic need.
- Use controlled props for open, selected, checked, and expanded state. Name
  change callbacks for the value (`onValueChange`) and pass the next value.
  Expose imperative handles only for focus, scroll, or measurement.
- Keep native props available unless the component owns them, and spread
  consumer props where they cannot override owned accessibility or behavior.
- Do not add an `as` or polymorphic prop.

### React and TSX

- Compute derived values, labels, conditional content, and event handlers
  before `return`. JSX only composes prepared values: no nested ternaries,
  inline collection transforms, or long inline callbacks.
- Define fixed strings, numbers, and option lists at module scope in
  `SCREAMING_SNAKE_CASE`.
- Keep state minimal and derive the rest during render. Use effects only to
  sync with external systems, clean them up, and never suppress hook dependency
  warnings.
- Use stable keys, and `FlatList` or `SectionList` for long lists.
- Do not add `memo`, `useMemo`, or `useCallback` without a measured reason.
- Do not write comments that narrate the code. Add JSDoc only where it helps a
  consumer in their editor.

### The engine stays private

- Uniwind, Tailwind, and HeroUI Native are regular dependencies of the library,
  never peer dependencies, and never appear in a public type, prop, export, error
  message, or document written for consumers.
- The consumer-facing surface is `withINVIDUI` (`@invid/ui/metro`),
  `INVIDUIProvider` and its `theme` prop (`@invid/ui/provider`), `useThemeColor`
  (`@invid/ui/theme`), and each component's own props. The theme is a plain
  TypeScript object of our own color names; CSS is generated from it internally
  and never accepted from consumers. Wrap a HeroUI component
  behind our own props instead of re-exporting it.
- Native packages the engine needs (Gesture Handler, Reanimated, Worklets, Safe
  Area Context, SVG) are peer dependencies, because the consumer's app must
  install native modules itself. Adding one is a breaking change.

### Theming

- Tokens flow from primitive values to semantic tokens to component tokens.
  Components use semantic or component tokens, never raw palette values, and
  repeated visual values are centralized as tokens.
- Use logical start and end instead of left and right so RTL works. Respect
  font scaling and reduced motion.
- Do not flatten styles during render to inspect them, and do not mutate a
  global theme.

### Accessibility

- Accessibility is part of each component's contract, not a follow-up.
- Interactive components set the correct `accessibilityRole` and reflect
  disabled, selected, checked, expanded, and busy state in `accessibilityState`.
  Range controls use `accessibilityValue`. Forward labels and hints.
- Never signal state by color, animation, or gesture alone.
- Overlays (dialogs, menus, sheets) move and restore screen-reader focus
  predictably.
- Text must scale with the system text size without clipping.

### Performance

- Prefer the simplest implementation that meets the contract; optimize from
  measurements of release builds, not development mode.
- Animate transform and opacity where possible, and keep per-frame JavaScript
  out of gesture-driven animations.
- Keep Reanimated or other optional native integrations behind their own
  subpath and optional peer.

### Native code and dependencies

- Install Expo, React Native, and native packages with
  `bunx expo install <package>` in the owning workspace so versions match the
  Expo SDK.
- If native code is unavoidable, prefer the Expo Modules API and configure it
  through an Expo config plugin rather than manual edits to `ios/` or
  `android/`. Document permissions, rebuild requirements, and that the
  component no longer runs in Expo Go.

## Styling rules that bite

- **Write complete class names as literal strings.** Classes are found by
  scanning the compiled `dist/`, so `` `bg-${tone}` `` produces no styles. List
  every full class in the variant map instead.
- **Class names exist only inside `packages/ui`.** The apps, stories, and
  anything a consumer writes use `StyleSheet` and `useThemeColor`.
- **Style precedence** is base, size, variant, state, then the consumer's `style`
  prop last. Consumers never get a `className` prop.
- **Token changes need a Metro restart.** `withINVIDUI` generates the stylesheet
  from `tokens.ts` when Metro starts. After editing it, rebuild the library if
  `bun run dev` is not running, then stop the app and start it again. A
  consumer's `theme` prop is different: it is applied at runtime and updates on
  save.

## Checking on devices

Verify every significant component on both iOS and Android before calling it
done:

- light and dark appearance (switch the simulator's system appearance)
- the largest accessibility text size, and long or translated content
- RTL layout
- VoiceOver and TalkBack: role, label, state, and focus order
- reduced motion, for anything animated
- pressed feedback and a comfortable touch target (use `hitSlop` when the visual
  target must stay small)

## Before you finish

```sh
bunx --bun @biomejs/biome lint .   # or `bun run check` to apply safe fixes
bun run typecheck                  # builds the library, then checks every workspace
```

When you change the export map or package metadata, also inspect what would
ship:

```sh
cd packages/ui && bun pm pack --dry-run
```

No automated test runner is configured yet, so the device checks above are the
current bar. When tests are added, the plan is: type tests for accepted and
rejected props, React Native Testing Library interaction tests that query by
role and accessible name, and checks that install and bundle the packed tarball
for iOS and Android.

## Troubleshooting

| Symptom                                          | Fix                                                                                                        |
| ------------------------------------------------ | ---------------------------------------------------------------------------------------------------------- |
| `Unable to resolve "@invid/ui/<name>"`        | Add the export-map entry, then run `bun run build` (or keep `bun run dev` running).                        |
| App type errors for a new component              | The apps type-check against `dist/*.d.ts`; `bun run typecheck` builds first.                               |
| App shows an old version of the component        | Start `bun run dev`; the apps only see what is in `dist/`.                                                 |
| A class or token has no effect                   | Use literal class strings and define the token in `tokens.ts`; restart Metro after token edits, or run `bunx expo start --clear` in the app directory. |
| `styles are not configured` error                | The app's `metro.config.js` is not wrapped with `withINVIDUI`; add it and restart Metro. |
| A story is missing                               | The file must match `apps/storybook/src/**/*.stories.tsx`; restart Metro after editing `.rnstorybook/main.ts`. |
| Dependencies are in a strange state              | `bun run clean && bun install`.                                                                            |
