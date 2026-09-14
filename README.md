# invid-ui

A React Native component library for iOS and Android, styled with Uniwind.
The Expo app in `example/` is a private component catalog for manual testing.

## Requirements

| Dependency   | Supported range    | Catalog version |
| ------------ | ------------------ | --------------- |
| React        | `>=19.1.0 <20.0.0` | `19.2.3`        |
| React Native | `>=0.82.0 <0.87.0` | `0.86.3`        |
| Tailwind CSS | `>=4.0.0 <5.0.0`   | `4.3.3`         |
| Uniwind      | `>=1.12.0 <2.0.0`  | `1.12.x`        |

Web is not supported.

## Consumer setup

Install the package and its peer dependencies, then configure Uniwind in the
consumer app. Uniwind remains a build-time peer even though it is hidden from
component APIs: its current Metro integration must scan the compiled package
output. The consumer's CSS entry file must import the library theme:

```css
@import "tailwindcss";
@import "uniwind";
@import "invid-ui/theme.css";
@source "../node_modules/invid-ui/dist";
```

Keep `withUniwindConfig` as the outermost Metro wrapper and point it at that CSS
entry file.

## Usage

Components are exposed through explicit subpaths rather than a root barrel:

```tsx
import { P } from "invid-ui/p";

<P>Paragraph text</P>;
<P variant="lead">Introductory paragraph text</P>;
<P variant="muted" numberOfLines={2}>
  Secondary paragraph text
</P>;
```

`P` exposes `default`, `lead`, and `muted` semantic variants and accepts native
React Native `Text` props. Uniwind-specific class-name props are intentionally
not part of the public component API. The native `style` prop remains available
as the final escape hatch for layout adjustments and one-off native behavior.

## Development

```sh
bun install
bun run build
bun run typecheck
bun run start
```

The catalog provides `/` and `/p` routes. Use `bun run ios` or
`bun run android` to open it on a simulator or emulator.

Reusable components expose typed semantic variants and native props rather than
Uniwind class-name props. Their internal recipes use `tailwind-variants`, whose
default build already resolves conflicting Tailwind utilities; a separate `cn`
dependency is unnecessary unless a future non-recipe use case requires it.
