import path from "node:path";
import { $, file, semver, write } from "bun";
import type { JsonObject, Workspace } from "./workspaces";
import {
  isJsonObject,
  listWorkspaces,
  ROOT_DIR,
  ROOT_MANIFEST_PATH,
  readManifest,
  relativeToRoot,
} from "./workspaces";

const CATALOG_PROTOCOL = "catalog:";
const DEFAULT_CATALOG_NAMES = new Set(["", "default"]);
const INSTALL_FIELDS = [
  "dependencies",
  "devDependencies",
  "optionalDependencies",
] as const;

type InstallField = (typeof INSTALL_FIELDS)[number];
type DependencyMap = Record<string, string>;

type PeerSnapshot = {
  manifestPath: string;
  peerDependencies: DependencyMap;
};

type CatalogReference = {
  manifestPath: string;
  field: InstallField;
  packageName: string;
  catalogName: string;
};

function logStep(message: string) {
  console.log(`\n› ${message}`);
}

async function writeManifest(manifestPath: string, manifest: JsonObject) {
  await write(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
}

function readDependencyMap(
  manifest: JsonObject,
  field: string,
  manifestPath: string,
): DependencyMap {
  const value = manifest[field];
  if (value === undefined) {
    return {};
  }
  if (!isJsonObject(value)) {
    throw new Error(
      `${relativeToRoot(manifestPath)}#${field} must be an object`,
    );
  }
  return Object.fromEntries(
    Object.entries(value).map(([packageName, spec]) => {
      if (typeof spec !== "string") {
        throw new Error(
          `${relativeToRoot(manifestPath)}#${field}.${packageName} must be a version string`,
        );
      }
      return [packageName, spec];
    }),
  );
}

function getCatalog(rootManifest: JsonObject, catalogName: string) {
  const workspaces = rootManifest.workspaces;
  const catalogs = isJsonObject(workspaces) ? workspaces.catalogs : undefined;
  const catalog = DEFAULT_CATALOG_NAMES.has(catalogName)
    ? isJsonObject(workspaces) && workspaces.catalog
    : isJsonObject(catalogs) && catalogs[catalogName];
  if (!isJsonObject(catalog)) {
    throw new Error(
      `Catalog "${catalogName || "default"}" is not defined in package.json#workspaces`,
    );
  }
  return catalog;
}

async function listExpoApps(workspaces: Workspace[]) {
  const expoApps: Workspace[] = [];
  for (const workspace of workspaces) {
    const manifest = await readManifest(workspace.manifestPath);
    const dependencies = readDependencyMap(
      manifest,
      "dependencies",
      workspace.manifestPath,
    );
    if ("expo" in dependencies) {
      expoApps.push(workspace);
    }
  }
  return expoApps;
}

async function snapshotPeerDependencies(workspaces: Workspace[]) {
  const snapshots: PeerSnapshot[] = [];
  for (const { manifestPath } of workspaces) {
    const manifest = await readManifest(manifestPath);
    if (manifest.peerDependencies !== undefined) {
      snapshots.push({
        manifestPath,
        peerDependencies: readDependencyMap(
          manifest,
          "peerDependencies",
          manifestPath,
        ),
      });
    }
  }
  return snapshots;
}

async function restorePeerDependencies(snapshots: PeerSnapshot[]) {
  for (const { manifestPath, peerDependencies } of snapshots) {
    const manifest = await readManifest(manifestPath);
    const current = readDependencyMap(
      manifest,
      "peerDependencies",
      manifestPath,
    );
    if (JSON.stringify(current) !== JSON.stringify(peerDependencies)) {
      manifest.peerDependencies = peerDependencies;
      await writeManifest(manifestPath, manifest);
      console.log(`Restored peer ranges in ${relativeToRoot(manifestPath)}`);
    }
  }
}

async function collectCatalogReferences(workspaces: Workspace[]) {
  const references: CatalogReference[] = [];
  for (const { manifestPath } of workspaces) {
    const manifest = await readManifest(manifestPath);
    for (const field of INSTALL_FIELDS) {
      const dependencies = readDependencyMap(manifest, field, manifestPath);
      for (const [packageName, spec] of Object.entries(dependencies)) {
        if (spec.startsWith(CATALOG_PROTOCOL)) {
          references.push({
            manifestPath,
            field,
            packageName,
            catalogName: spec.slice(CATALOG_PROTOCOL.length),
          });
        }
      }
    }
  }
  return references;
}

async function restoreCatalogReferences(references: CatalogReference[]) {
  const rootManifest = await readManifest(ROOT_MANIFEST_PATH);
  const manifests = new Map<string, JsonObject>();
  const pinnedSpecs = new Map<string, string>();

  for (const reference of references) {
    const { manifestPath, field, packageName, catalogName } = reference;
    const manifest =
      manifests.get(manifestPath) ?? (await readManifest(manifestPath));
    const dependencies = readDependencyMap(manifest, field, manifestPath);
    const pinnedSpec = dependencies[packageName];
    if (pinnedSpec === undefined || pinnedSpec.startsWith(CATALOG_PROTOCOL)) {
      continue;
    }

    const catalogKey = `${catalogName}:${packageName}`;
    const previousSpec = pinnedSpecs.get(catalogKey);
    if (previousSpec !== undefined && previousSpec !== pinnedSpec) {
      throw new Error(
        `Expo pinned ${packageName} to both ${previousSpec} and ${pinnedSpec}; align the apps' Expo SDK before rerunning`,
      );
    }
    pinnedSpecs.set(catalogKey, pinnedSpec);
    getCatalog(rootManifest, catalogName)[packageName] = pinnedSpec;
    manifest[field] = {
      ...dependencies,
      [packageName]: `${CATALOG_PROTOCOL}${catalogName}`,
    };
    manifests.set(manifestPath, manifest);
    console.log(
      `${packageName}@${pinnedSpec} → catalog (${relativeToRoot(manifestPath)})`,
    );
  }

  if (pinnedSpecs.size > 0) {
    await writeManifest(ROOT_MANIFEST_PATH, rootManifest);
  }
  for (const [manifestPath, manifest] of manifests) {
    await writeManifest(manifestPath, manifest);
  }
}

async function findInstalledVersion(packageName: string, fromDir: string) {
  for (let dir = fromDir; ; dir = path.dirname(dir)) {
    const manifestPath = path.join(
      dir,
      "node_modules",
      packageName,
      "package.json",
    );
    if (await file(manifestPath).exists()) {
      const { version } = await readManifest(manifestPath);
      return typeof version === "string" ? version : undefined;
    }
    if (dir === ROOT_DIR || dir === path.dirname(dir)) {
      return undefined;
    }
  }
}

async function reportPeerCompatibility(snapshots: PeerSnapshot[]) {
  const mismatches: string[] = [];
  for (const { manifestPath, peerDependencies } of snapshots) {
    for (const [packageName, range] of Object.entries(peerDependencies)) {
      const version = await findInstalledVersion(
        packageName,
        path.dirname(manifestPath),
      );
      if (version !== undefined && !semver.satisfies(version, range)) {
        mismatches.push(
          `${packageName}@${version} is outside ${relativeToRoot(manifestPath)} peer range ${range}`,
        );
      }
    }
  }
  if (mismatches.length > 0) {
    console.warn(
      `\n⚠ Development versions no longer match published peer ranges. Test the new versions, then widen the ranges deliberately:\n${mismatches.join("\n")}`,
    );
  }
}

const workspaces = await listWorkspaces();
const expoApps = await listExpoApps(workspaces);
const peerSnapshots = await snapshotPeerDependencies(workspaces);
const manifestPaths = [
  ROOT_MANIFEST_PATH,
  ...workspaces.map(({ manifestPath }) => manifestPath),
];
const installArtifacts = [
  path.join(ROOT_DIR, "bun.lock"),
  ...[ROOT_DIR, ...workspaces.map(({ dir }) => dir)].map((dir) =>
    path.join(dir, "node_modules"),
  ),
];

logStep("Updating every dependency to its latest version");
await $`bun update --latest --recursive`.cwd(ROOT_DIR);
await restorePeerDependencies(peerSnapshots);

const catalogReferences = await collectCatalogReferences(workspaces);
for (const app of expoApps) {
  logStep(`Syncing ${relativeToRoot(app.dir)} with the installed Expo SDK`);
  await $`bunx expo install --fix`.cwd(app.dir);
}

logStep("Moving Expo-pinned versions back into the catalog");
await restoreCatalogReferences(catalogReferences);

logStep("Resolving a fresh lockfile from the synced manifests");
await $`rm -rf ${installArtifacts}`;
await $`bun install`.cwd(ROOT_DIR);
await $`bunx --bun @biomejs/biome migrate --write`.cwd(ROOT_DIR).quiet();
await $`bunx --bun @biomejs/biome format --write ${manifestPaths}`
  .cwd(ROOT_DIR)
  .quiet();

for (const app of expoApps) {
  logStep(`Verifying ${relativeToRoot(app.dir)}`);
  await $`bunx expo install --check`.cwd(app.dir);
}
await reportPeerCompatibility(peerSnapshots);
