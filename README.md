# INVID UI

Monorepo for INVID UI, a React Native component library for iOS and Android.
Consumers install one package and configure no styling library. Web is not
supported. The library targets React 19+ and React Native 0.82+ on the New
Architecture and is published as ESM only.

| Workspace        | Package               | Purpose                                          |
| ---------------- | --------------------- | ------------------------------------------------ |
| `packages/ui`    | `@invid/ui`           | The component library published to npm           |
| `apps/demo`      | `@invid-ui/demo`      | Private Expo Router app with a screen per component |
| `apps/storybook` | `@invid-ui/storybook` | Private on-device Storybook for component states |

To install and use the library in an app, read
[`packages/ui/README.md`](packages/ui/README.md).

## Development

To build or change a component, follow [`DEV.md`](DEV.md). It covers the dev
loop, adding a component end to end, writing stories, styling rules, device
checks, and troubleshooting. [`CONTRIBUTING.md`](CONTRIBUTING.md) lists what every
change must include: a story per component, and reuse of existing components.

```sh
bun install
bun run typecheck      # builds @invid/ui, then type-checks every workspace
bun run demo           # or demo:ios / demo:android
bun run storybook      # or storybook:ios / storybook:android
bun run dev            # rebuild @invid/ui on change (second terminal)
bun run deps:update    # update every dependency, then sync with the Expo SDK
bun run clean          # delete node_modules, bun.lock, and generated build output
```

The apps depend on `@invid/ui` through `workspace:*` and import only paths
from its export map. Those exports resolve to the compiled `dist/`, so the apps
run the same JavaScript and declarations a consumer gets, with the same setup:
`withINVIDUI` in Metro and `INVIDUIProvider` at the root. The `demo` and
`storybook` scripts build the library once before starting Metro; keep
`bun run dev` running to see library edits hot-reload.

## Conventions

- **Bun only:** install with `bun install` and run tools with `bunx`. Do not use
  npm, Yarn, pnpm, or `npx`.
- **Private engine:** the library is built on Uniwind and HeroUI Native, but
  consumers never see either. The apps use no class names and no styling
  library of their own. `withINVIDUI` writes the generated stylesheet to a
  git-ignored `.invid-ui/` folder in each app. See
  [The engine stays private](DEV.md#the-engine-stays-private).
- **Catalog:** dependency versions shared by more than one workspace live in the
  root `package.json` `workspaces.catalog` and are referenced with `catalog:`.
  Add Expo and native packages from the owning workspace with
  `bunx expo install <package>`, then move shared versions into the catalog.
  `bun pm pack` replaces `catalog:` and `workspace:` with real versions.
- **Dependency updates:** `bun run deps:update` (`scripts/update-deps.ts`) runs
  `bun update --latest --recursive`, then `expo install --fix` in each Expo app.
  Both commands damage monorepo state when run alone: the update rewrites the
  library's published peer ranges, and the Expo fix replaces `catalog:`
  references with pinned versions. The script restores the peer ranges, moves
  Expo's pins back into the catalog, re-resolves the lockfile, and verifies each
  app with `expo install --check`. It warns when the synced versions fall outside
  the library's peer ranges, which must be widened by hand after testing.
- **Path aliases:** apps use `@/*` for `./src/*` (tsconfig `paths`, resolved by
  Expo's Metro). `@invid/ui` uses the `#/*` subpath import from its
  `package.json` `imports` field, which maps to `dist/*.js` at runtime and back
  to `src/` for TypeScript. Unlike tsconfig `paths`, it survives the `tsc` build.
- **Linker:** installs use Bun's hoisted linker (`bunfig.toml`). The isolated
  linker splits `expo` and `expo-router` into duplicate store entries, which
  `expo-doctor` reports as duplicate native modules.
- **Storybook:** `apps/storybook` contains no application code, so its `main`
  entry is `.rnstorybook/index.tsx` and Metro uses the always-enabled
  `@storybook/react-native/metro/withStorybook` wrapper instead of entry-point
  swapping. Stories live in `apps/storybook/src` and import public
  `@invid/ui/*` paths. Metro regenerates `.rnstorybook/storybook.requires.ts`
  on start (or run `bunx sb-rn-get-stories`); it is committed so a clean
  checkout type-checks.

## Releases

- Versions follow SemVer; the list of breaking changes is in
  [`DEV.md`](DEV.md#public-api-and-packaging). Prereleases are published under a
  tag other than `latest`.
- Publish only from a protected CI workflow using npm trusted publishing (OIDC
  with provenance), never from a developer machine or with a long-lived token.
- The tarball is the product: before a release, build, pack, install, and bundle
  the packed artifact for iOS and Android rather than testing source only.
