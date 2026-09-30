import { existsSync } from "node:fs";
import { rm } from "node:fs/promises";
import path from "node:path";
import { $ } from "bun";
import { listWorkspaces, ROOT_DIR, relativeToRoot } from "./workspaces";

const LOCKFILE_PATH = path.join(ROOT_DIR, "bun.lock");
const WORKSPACE_ARTIFACTS = [
  "node_modules",
  "dist",
  ".expo",
  "expo-env.d.ts",
  "ios",
  "android",
] as const;

function toGitPath(filePath: string) {
  return relativeToRoot(filePath).split(path.sep).join("/");
}

const workspaces = await listWorkspaces();
const candidates = [
  LOCKFILE_PATH,
  path.join(ROOT_DIR, "node_modules"),
  ...workspaces.flatMap(({ dir }) =>
    WORKSPACE_ARTIFACTS.map((artifact) => path.join(dir, artifact)),
  ),
];
const targets = candidates.filter((candidate) => existsSync(candidate));

if (targets.length === 0) {
  console.log("Nothing to clean");
  process.exit(0);
}

const trackedFiles = (
  await $`git ls-files -- ${targets.map(toGitPath)}`.cwd(ROOT_DIR).text()
)
  .split("\n")
  .filter(Boolean);

function containsTrackedFiles(target: string) {
  const gitPath = toGitPath(target);
  return trackedFiles.some(
    (trackedFile) =>
      trackedFile === gitPath || trackedFile.startsWith(`${gitPath}/`),
  );
}

await Promise.all(
  targets.map(async (target) => {
    if (target !== LOCKFILE_PATH && containsTrackedFiles(target)) {
      console.warn(`Kept ${relativeToRoot(target)}: it contains tracked files`);
      return;
    }
    await rm(target, { force: true, recursive: true });
    console.log(`Removed ${relativeToRoot(target)}`);
  }),
);
