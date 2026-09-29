# Agent Instructions

## Scope and product

- These instructions apply to the entire repository. A nested `AGENTS.md` may define only the differences for its subtree.
- This repository is a reusable React Native UI component library for **iOS and Android only**. It is not a general application codebase.
- Web is not supported, even if web dependencies, scripts, or transitive types exist. Do not add browser-specific code, DOM APIs, CSS/web fallbacks, React Native Web branches, web exports, or web validation unless the user explicitly expands platform support.
- In this repository, “cross-platform” means iOS and Android. Account for both platforms when behavior, accessibility, layout, gestures, or native APIs differ.
- Target React 19+ and React Native 0.82+ with the New Architecture only. Treat the exact peer ranges and supported Expo SDK lines in `package.json` and the compatibility documentation as the enforceable support contract.
- Prefer a JavaScript/TypeScript implementation built from React Native primitives. Add native code only when the required behavior cannot be implemented correctly without it.
- Make the smallest coherent change that satisfies the request. Do not include unrelated refactors or widen the public API speculatively.

## Sources of truth

Expo and React Native APIs change frequently. Do not rely on remembered APIs.

Before changing code that touches Expo, EAS, or React Native APIs:

1. Read the installed `expo`, `react`, and `react-native` versions from `package.json`.
2. Fetch the matching Expo documentation at `https://docs.expo.dev/versions/v<major>.0.0/`.
3. Read `https://docs.expo.dev/llms.txt`, then follow its link to the specific documentation page for the API being used.
4. Check the first-party React Native or React documentation for APIs that form part of the public component contract.
5. Implement against the installed versions and the documented support matrix. If repository code, installed versions, and first-party documentation conflict, stop and report the mismatch instead of guessing.

- Treat `package.json` and the lockfile as authoritative for installed dependencies and versions.
- Treat the export map, emitted declarations, compatibility table, and packed npm artifact as authoritative for the public package contract.
- Follow established local patterns unless they conflict with these instructions or current first-party documentation.
- Check the available Expo and Uniwind agent skills before implementing code in an area they cover.

## Package and distribution contract

- The published package is ESM-only. Use `"type": "module"`; do not add CommonJS output, `require` conditions, `.cjs` files, or dual-package compatibility unless the user changes the support contract.
- Publish transformed JavaScript and declaration files. Raw `.ts` or `.tsx` files must not be the only runtime entry points.
- Define every supported public entry point in `package.json#exports`. Put the `types` condition first and `default` last for each conditional export.
- Prefer stable component-level subpaths when they materially isolate imports, such as `invid-ui/button`. Do not use a wildcard export that exposes the internal directory layout.
- Keep root exports small and side-effect-free. Importing one component must not evaluate unrelated components, icon catalogs, animations, themes, or optional native integrations.
- Export `package.json` when required by React Native tooling or package inspection.
- Do not rely on Metro’s lenient deep-import fallback. Consumers may import only documented export-map paths.
- Avoid `import.meta` in React Native runtime code unless the tested Metro versions explicitly support the exact usage.
- Set `sideEffects` truthfully. A module marked side-effect-free must not mutate globals, register handlers or components, subscribe, start timers, log, install polyfills, or cache mutable environment state at import time.
- React and React Native belong in `peerDependencies` and `devDependencies`, never bundled runtime dependencies. Add `expo` as a peer only when published runtime code imports Expo APIs.
- Put required runtime utilities in `dependencies`. Put build, test, example, and documentation tools in `devDependencies`.
- Put optional native integrations in optional peer dependencies and behind explicit subpath exports. Never import an optional peer from the root entry point.
- Preserve module boundaries in build output. Do not bundle the whole library into one opaque file.
- The tarball is the product. Build, inspect, type-check, install, bundle, and smoke-test the exact artifact intended for publication; source-only workspace tests are insufficient.

## Repository and public API boundaries

- Keep reusable library code under focused areas such as `src/components`, `src/primitives`, `src/theme`, and `src/hooks`. Keep implementation details under `src/internal` or clearly private modules.
- Never export `src/internal`, test helpers, stories, examples, build tooling, or implementation-only context and variant types.
- Give every public subpath one authoritative, concretely named entry file. Export only APIs intentionally covered by SemVer.
- Avoid barrel exports at all costs. Do not create or extend `index.ts` or `index.tsx` files that re-export other modules; import directly from the owning module and point public export-map subpaths at concrete files instead.
- When an existing barrel is encountered in the scope of a change, migrate its consumers to direct imports and remove the barrel when doing so does not widen the task or break a documented public path.
- Keep component implementation, public types, static styles or variants, tests, and entry files colocated when that improves ownership and discoverability.
- An Expo example/catalog app may demonstrate the library, but it must import only public package paths, never `../src/...` or private aliases. CI must also exercise compiled output rather than only a source condition or workspace alias.
- Keep stories, examples, tests, and fixtures out of emitted declarations and the npm tarball unless they are deliberately published documentation assets.
- Reuse existing components, primitives, hooks, utilities, tokens, and public types before creating another implementation of the same concept.
- Extract shared code when the same semantic rule is repeated. Do not force unrelated code into an abstraction merely to remove superficial duplication.
- Keep components focused. Prefer clear names, small functions, and explicit contracts over explanatory comments.
- Do not add comments that narrate the code, section-divider comments, or speculative TODOs. Add JSDoc only when it materially improves consumer-facing IDE documentation for a non-obvious reusable API or constraint.

## TypeScript and public type design

- Keep TypeScript strict. Use `moduleResolution: "Bundler"`, `module: "Preserve"` or the compatible ESM setting required by the build, `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`, `isolatedModules`, `verbatimModuleSyntax`, and `useUnknownInCatchVariables`.
- Do not introduce `any`, including explicit `any`, `as any`, `Record<string, any>`, unconstrained callbacks, or generic defaults that widen to `any`. Use `unknown` at untrusted or untyped boundaries and narrow it once into a validated domain type.
- Do not use assertions or broad index signatures merely to silence the compiler. Model the invariant or validate the boundary instead.
- Reuse authoritative types instead of restating them. Prefer indexed access and utility types such as `ExistingType["prop"]`, `Pick<ExistingType, ...>`, `Omit<ExistingType, ...>`, and `NonNullable<ExistingType["callback"]>` when deriving related contracts.
- Derive native props from the primitive actually rendered, for example `ComponentProps<typeof Pressable>`. Use `Omit` for props whose semantics the library owns instead of duplicating native prop declarations.
- Reuse exact React Native event, accessibility, style, and ref types. Never replace them with generic events, `{}`, `object`, or locally duplicated shapes.
- Type styles as the primitive’s exact `style` prop when possible, or use `StyleProp<ViewStyle>`, `StyleProp<TextStyle>`, and related native types.
- Use `ComponentRef<typeof Primitive>` and `Ref<...>` for public refs. Because the support floor is React 19, accept `ref` as a normal prop instead of adding `forwardRef` solely for legacy compatibility.
- Prefer readonly data and string-literal unions over runtime enums. Use discriminated unions for mutually exclusive variants and states.
- Make controlled and uncontrolled modes mutually exclusive in types. Do not accept `value` and `defaultValue` together without an explicitly designed precedence.
- Encode accessibility requirements in public types when practical; for example, an icon-only control must require an accessible label.
- Use `import type` and `export type` for type-only boundaries so types do not become runtime imports.
- Export only the props, handles, token types, and utility types consumers need. Keep styling-engine internals, normalized theme internals, private context shapes, and implementation helpers private.
- Avoid clever conditional types when a small explicit union yields clearer inference and diagnostics.
- Treat generated `.d.ts` files as API artifacts. Add type tests for accepted and rejected usage, and inspect declaration diffs when public types change.

## Invariant-driven development

- Identify valid states, boundary assumptions, preconditions, and postconditions before implementing behavior.
- Encode invariants in TypeScript so invalid component states are difficult or impossible to represent.
- Validate untrusted values at system boundaries, including persisted data, native-module results, theme input, serialized values, and external callbacks. Narrow once, then keep internal code typed to the validated model.
- Enforce each invariant at the closest owning boundary. Do not scatter duplicate defensive checks throughout consumers.
- Fail early with an actionable error when an invariant is violated. Do not silently coerce invalid domain data into a plausible state.
- Add or update tests for invariant-preserving behavior and meaningful invariant violations when suitable test infrastructure exists.

## Component API architecture

- Use three conceptual layers: primitives establish native prop, ref, accessibility, style, and token conventions; components implement reusable visual and interaction behavior; application-specific patterns remain outside the foundational package unless explicitly promoted.
- Prefer composition and `children` over growing configuration objects or many content-specific props. Use compound components when parts must coordinate state, focus, or layout.
- Define each reusable component’s variants, sizes, states, native prop ownership, style override behavior, accessibility semantics, and ref target explicitly.
- Add a variant or size only for a demonstrated semantic need. Avoid wrappers that mirror every native prop plus a large pseudo-CSS API.
- Keep transient state local. Support controlled and uncontrolled modes consistently, and name semantic transition callbacks such as `onValueChange` with the next value rather than leaking internal events unnecessarily.
- Prefer controlled props for open, selected, checked, or expanded state. Expose imperative handles only for inherently imperative behavior such as focus, scroll, or measurement.
- Preserve native props unless the component intentionally owns or forbids them. Spread consumer props in a deterministic location so owned accessibility and behavioral invariants cannot be accidentally overridden.
- Document and preserve style precedence. Unless a component contract requires otherwise, use base, size, variant, state, then user override; semantic disabled, busy, focus, and accessibility behavior remains component-owned.
- Do not implement an `as` or polymorphic API unless runtime behavior, native prop ownership, accessibility, and ref types remain correct for every supported primitive.
- Prefer static styles and named variants outside render. With Uniwind, follow its existing project conventions rather than introducing a second styling system.

## Theming and styling

- Maintain one visual source of truth. Reuse and extend the existing Uniwind and token system in its own idiom; do not create a parallel theme implementation.
- Organize tokens from primitive values to semantic tokens to component tokens. Components consume semantic or component tokens, not raw palette positions.
- Centralize repeated colors, spacing, radii, typography, shadows, and motion. Avoid duplicated raw visual literals in component implementations.
- Keep the public styling contract deliberate and typed. Do not leak the styling engine’s full internal type graph through public props.
- Document whether package styles are precompiled or require consumer Metro/Babel configuration. Do not silently require consumers to scan dependency source.
- Accept the appropriate native `style` prop where composition requires it and merge consumer style last for visual/layout overrides. Do not let style overrides bypass behavioral or accessibility invariants.
- Do not flatten styles during render merely to inspect them. Store semantic behavior values in tokens or variant metadata instead.
- Normalize and memoize themes once at the provider boundary rather than recomputing complete themes in every component.
- Avoid global singleton theme mutation. Themes must work with multiple roots, tests, and concurrent rendering.
- Use `useColorScheme` for live system appearance changes. Allow application overrides when the public theme contract supports them.
- Use logical start/end direction where available and test RTL. Respect font scaling, increased contrast where available, and reduced-motion preferences.

## TSX and React practices

- Use function components and follow the Rules of Hooks. Render must remain pure.
- Keep component return blocks declarative and easy to scan.
- Before `return`, compute derived values, booleans, labels, selected variants, fallbacks, conditional content, and rendered collections. Define event handlers before `return` as named functions or variables.
- In JSX, compose elements and reference prepared values and callbacks. Do not add inline IIFEs, collection transformations, nested ternaries, non-trivial expressions, or substantial inline callback bodies.
- Early returns are allowed when they clarify states, but all hooks must remain unconditional and in a stable order.
- Do not hardcode semantic or configuration literals in TSX return blocks. Define stable strings, numbers, limits, option lists, and similar constants at module scope using `SCREAMING_SNAKE_CASE`.
- Keep values derived from props, state, hooks, or platform APIs inside the component, but compute them before `return` and give them descriptive names.
- Keep state minimal and local. Derive values during render instead of storing synchronized copies or using effects to mirror props.
- Use effects only to synchronize with external systems. Put user-triggered work in event handlers, and clean up subscriptions, timers, and asynchronous side effects.
- Never suppress hook dependency warnings. Restructure the code or stabilize the actual dependency.
- Use stable semantic identifiers as list keys. Do not use array indexes when items can be inserted, removed, or reordered.
- Use `FlatList` or `SectionList` for potentially large or unbounded collections. A library list abstraction must expose relevant virtualization props and must not impose universal tuning values.
- Do not add `memo`, `useMemo`, or `useCallback` by default. Use them only when computation is meaningfully expensive, referential stability is required by an API, or profiling demonstrates a relevant benefit.
- If React Compiler is enabled for the package build, run its health check first, target the supported React floor, and test both source and compiled artifact behavior. Do not assume a consumer app compiles code inside `node_modules`.

## Accessibility and native interaction

- Accessibility is part of every component’s public contract, not a follow-up enhancement.
- Interactive components must provide the correct `accessibilityRole` and reflect disabled, selected, checked, expanded, and busy state through `accessibilityState`.
- Use `accessibilityValue` for range and value controls. Forward labels and hints unless the component deliberately owns them.
- Require an accessible name for icon-only controls in the public type contract.
- Provide visible pressed feedback and comfortable touch targets. Prefer sufficient layout size and use `hitSlop` when the visual target must remain smaller.
- Preserve screen-reader focus when portals, dialogs, menus, and overlays open or close. Make focus restoration deterministic.
- Do not use animation, color, or gesture alone to communicate state. Respect reduced motion and provide deterministic completion states.
- Preserve dynamic type and avoid clipping enlarged or translated text.
- Test VoiceOver and TalkBack behavior on iOS and Android simulators or devices for significant interactive components. JavaScript-renderer tests do not validate native accessibility behavior.
- Include RTL, large text, dark mode, reduced motion, long or translated content, constrained layouts, and keyboard behavior where applicable in component examples and test coverage.

## Performance

- Treat performance as a design constraint, but prefer the simplest implementation that meets the public contract.
- Prevent unnecessary work through appropriate state ownership, derived data, list virtualization, stable keys, focused component boundaries, and narrow context subscriptions.
- Split high-frequency interaction state from low-frequency theme or configuration context. Keep provider actions and values stable when consumers depend on referential identity.
- Avoid repeated parsing, sorting, filtering, normalization, large object creation, child cloning, and eager catalog construction on hot render paths.
- Keep module initialization cheap. Root imports must not eagerly load optional native packages, all icons, all locales, all themes, or unrelated components.
- Prefer transform and opacity animations when suitable. Keep per-frame JavaScript work out of gesture-driven animations and respect reduced motion.
- Isolate optional Reanimated or worklet integrations behind explicit subpaths and peers.
- Profile release builds with Hermes on representative iOS and lower-end Android hardware. Do not report development-mode measurements as production performance.
- Measure npm tarball size, consumer bundle delta, startup, mount/update cost, interaction latency, scrolling, and animation separately. Do not treat tarball size as bundle cost.
- Do not add custom memo comparison functions, caches, schedulers, or tuning abstractions without measured evidence and correctness tests.

## Native code and dependencies

- Remain JavaScript/TypeScript-only when React Native primitives can implement the component correctly.
- If native code is required, prefer Expo Modules API when its model fits. Use Turbo Modules, Fabric, and Codegen only when lower-level integration is necessary.
- Generate typed native specifications. Do not maintain disconnected TypeScript and native interfaces manually.
- Express native configuration through an idempotent Expo config plugin. Do not require consumers to edit generated `ios` or `android` projects manually when a plugin can encode the change.
- Document permissions, privacy manifests, minimum platform versions, native peers, config plugins, Expo Go limitations, and rebuild requirements.
- Expo Go compatibility may be claimed only when all required runtime paths are JavaScript-only or use native modules already bundled in Expo Go. Native code or config changes require a development build.
- Test clean native generation more than once when changing a config plugin, and test iOS and Android release builds for native changes.
- Prefer small, platform-safe dependencies. Check transitive packages for Node built-ins, DOM assumptions, install scripts, duplicate React renderers, and import-time side effects.
- Ask before adding a production runtime dependency unless the user’s request clearly requires it.

## Testing strategy

- Layer tests according to risk: static checks, public type tests, pure unit tests, component interaction tests, package/export tests, Expo integration tests, native smoke tests, and performance tests.
- Use React Native Testing Library and query by role, accessible name, label, or visible text. Prefer semantic assertions over `testID`, implementation details, and large snapshots.
- Test controlled and uncontrolled behavior, native prop forwarding, refs, style precedence, accessibility state, loading/disabled behavior, and invariant violations where relevant.
- Public type tests must include valid examples and intentional failures with narrowly placed `@ts-expect-error` directives.
- Build declarations and type-check a clean consumer fixture with exports-aware `moduleResolution: "Bundler"` and `skipLibCheck: false`.
- Validate package exports and declarations with `publint` and Are The Types Wrong against the packed artifact when those tools are configured.
- Inspect dry-run package contents against an allowlist and size budget. Install the generated tarball into a fixture outside the package workspace.
- Bundle and smoke-test the installed tarball for both iOS and Android with Metro. Do not add or run web package tests while web remains unsupported.
- Significant native, focus, accessibility, gesture, or animation behavior requires simulator/device validation; source and component tests alone are insufficient.

## Documentation, compatibility, and releases

- Document the tested React, React Native, Expo SDK, iOS, and Android support matrix. Do not publish unbounded compatibility claims; widen ranges only after the new matrix passes.
- Document Expo Go versus development-build compatibility, required and optional peers, native rebuild requirements, config plugins, Metro/Babel setup, public root/subpath imports, theme setup, refs, controlled behavior, and accessibility semantics.
- Documentation examples must import only public package paths and should compile in CI.
- Treat removal or renaming of components, props, types, tokens, or subpath exports as breaking changes.
- Also treat changed behavioral defaults, layout metrics, accessibility semantics, style precedence, controlled-state behavior, ref targets, required peers, theme shape, or supported platform/version floors as potentially breaking.
- Use SemVer and changelog automation for releases. Publish prereleases under a non-`latest` tag.
- Publish only from a protected CI workflow using npm trusted publishing through OIDC and provenance. Do not use long-lived npm write tokens or publish from a maintainer workstation.
- Never publish, deploy, submit, or release unless the user explicitly requests the external action and identifies the target/version.

## Dependency and command workflow

- This repository uses Bun. Use `bunx`, not `npx`, and do not use npm, Yarn, or pnpm for dependency installation.
- Use `bunx expo install <package>` for Expo, React Native, and native packages so Expo selects SDK-compatible versions. Keep library manifest placement correct even when the package is also installed for the example app.
- Install dependencies with `bun install`.
- Start Metro with `bunx expo start`.
- Start iOS with `bun run ios`.
- Start Android with `bun run android`.
- Check lint without applying fixes with `bunx --bun @biomejs/biome lint .`.
- Apply safe lint fixes with `bun run lint`.
- Format, lint, and organize imports with `bun run check`.
- Type-check with `bunx tsc --noEmit`.
- Diagnose Expo dependencies and configuration with `bunx expo-doctor`.
- Fix Expo package-version incompatibilities with `bunx expo@latest install --fix` only when the user has requested or approved dependency changes.
- Use package build, test, pack, and artifact-check scripts defined in `package.json` as they are added. Do not invent absent script names or substitute source checks for artifact checks.
- Do not use or validate the `web` script while web support is out of scope.

## Validation and definition of done

- For TypeScript or TSX changes, run `bunx --bun @biomejs/biome lint .` and `bunx tsc --noEmit` before finishing.
- Run the narrowest relevant tests when tests exist. Add regression coverage for changed behavior when suitable infrastructure exists.
- For dependency or Expo configuration changes, also run `bunx expo-doctor`.
- For public exports, package metadata, build configuration, or declaration changes, also build the library and run the configured package, declaration, and clean-fixture checks.
- For native code or native dependency changes, validate development or release builds on both iOS and Android as appropriate.
- For documentation-only changes, inspect the final diff for accuracy and consistency; code validation is not required.
- Do not claim a check passed unless it was run successfully. If a required check cannot run, report the exact command, failure, and impact.
- Finish with the requested behavior implemented, required validation complete, and no unrelated files changed.
- In the final handoff, summarize changed files, validation performed, skipped checks, and any unresolved risk.

## When blocked

- If a required product decision, support boundary, public API contract, or invariant is unavailable, ask one focused question that identifies the missing decision.
- If repository code, installed versions, package declarations, and first-party documentation conflict, cite the conflict and stop before choosing a contract.
- If validation exposes an unrelated pre-existing failure, preserve the evidence and report it without broadening the task.

## Agent skills

### Issue tracker

GitHub Issues on `joserafaelm/invid-ui`, accessed with `gh` using the Invid identity only. See `docs/agents/issue-tracker.md`.

### Triage labels

Categories `bug` / `feature` / `documentation`; state labels `needs-triage`, `needs-info`, `wontfix`, `blocked-by-issue` (no ready-for-agent/ready-for-human labels). See `docs/agents/triage-labels.md`.

### Domain docs

Single-context: one root `CONTEXT.md` plus `docs/adr/`. See `docs/agents/domain.md`.
