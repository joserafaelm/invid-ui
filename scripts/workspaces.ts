import path from "node:path";
import { file, Glob } from "bun";

export const ROOT_DIR = path.resolve(import.meta.dir, "..");
export const ROOT_MANIFEST_PATH = path.join(ROOT_DIR, "package.json");

export type JsonObject = Record<string, unknown>;

export type Workspace = {
  dir: string;
  manifestPath: string;
};

export function isJsonObject(value: unknown): value is JsonObject {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function relativeToRoot(filePath: string) {
  return path.relative(ROOT_DIR, filePath) || ".";
}

export async function readManifest(manifestPath: string): Promise<JsonObject> {
  const manifest: unknown = await file(manifestPath).json();
  if (!isJsonObject(manifest)) {
    throw new Error(`${relativeToRoot(manifestPath)} must be a JSON object`);
  }
  return manifest;
}

function readWorkspacePatterns(rootManifest: JsonObject) {
  const workspaces = rootManifest.workspaces;
  const patterns = isJsonObject(workspaces) ? workspaces.packages : workspaces;
  if (
    !Array.isArray(patterns) ||
    !patterns.every((pattern): pattern is string => typeof pattern === "string")
  ) {
    throw new Error("package.json#workspaces must list workspace globs");
  }
  return patterns;
}

export async function listWorkspaces(): Promise<Workspace[]> {
  const patterns = readWorkspacePatterns(
    await readManifest(ROOT_MANIFEST_PATH),
  );
  const manifestPaths = new Set<string>();
  for (const pattern of patterns) {
    const glob = new Glob(`${pattern}/package.json`);
    for await (const match of glob.scan({ cwd: ROOT_DIR })) {
      manifestPaths.add(path.join(ROOT_DIR, match));
    }
  }
  return [...manifestPaths].sort().map((manifestPath) => ({
    dir: path.dirname(manifestPath),
    manifestPath,
  }));
}
