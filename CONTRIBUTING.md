# Contributing

Requirements for every change to `@invid/ui`. [`DEV.md`](DEV.md) explains how
to do each step and holds the full
[component standards](DEV.md#component-standards) for API design, typing,
accessibility, and styling.

## File names

Every file name is lowercase kebab-case, including files that hold a React
component: `text-input.tsx` exports `TextInput`, `date-time-field.tsx` exports
`DateTimeField`. This applies to the library, the demo app's routes (so their
URLs are kebab-case too, such as `/number-input`), stories
(`number-input.stories.tsx`), and scripts. Code identifiers keep their usual
casing: components and types in PascalCase, everything else in camelCase or
`SCREAMING_SNAKE_CASE` for module constants. The public subpath matches the file
name, so `src/ui/text-input.tsx` is imported as `@invid/ui/text-input`.

## Every new component needs

- **A story file.** A component without
  `apps/storybook/src/stories/<name>.stories.tsx` is not complete. Cover the
  default state, each variant, and the states that apply (disabled, loading,
  error, selected, long content). Changing a component's variants or states means
  updating its stories in the same change. See
  [Writing stories](DEV.md#writing-stories).
- **An export-map entry** in `packages/ui/package.json`, so apps and consumers can
  import it as `@invid/ui/<name>`.
- **A demo screen** in `apps/demo/src/app/`, listed in `COMPONENT_SCREENS` in
  `apps/demo/src/demo-screens.ts` so it appears in the sidebar and home screen.
- **Usage documentation** in [`packages/ui/README.md`](packages/ui/README.md),
  the README consumers read. A new theme color is listed there too.

## Reuse before you build

Compose new components from the ones the library already has. Before writing a
`Text`, `Pressable`, or `View` with its own classes, check `packages/ui/src/ui`
for a component that already owns that job.

- A text input has a label: render the label with `P`, or add a `Label`
  component and use that. Do not style a raw `Text` inside the input.
- If no existing component fits, create the missing piece as its own component
  (with its own story and export) and build on it, so the next component can
  reuse it too.
- The same applies to tokens and helpers: extend `src/theme/tokens.ts` and
  `src/internal/` instead of repeating colors, spacing, or logic.

Inside the library, import sibling components through the alias:

```tsx
import { P } from "#/ui/p";
```

## Keep the engine private

The library is built on Uniwind (Tailwind classes), and consumers must never
have to know. Do not expose it in props, types, exports, error messages, or
consumer documentation, and do not use class names outside `packages/ui`. See
[The engine stays private](DEV.md#the-engine-stays-private).

## Before opening a pull request

- `bunx --bun @biomejs/biome lint .` and `bun run typecheck` pass.
- The component and its stories were checked on iOS and Android, following
  [Checking on devices](DEV.md#checking-on-devices).
- Dependency changes went through `bun run deps:update` or
  `bunx expo install <package>`, not a hand-edited version.
