# Issue tracker: GitHub

Issues and specs for this repo live as GitHub issues on `joserafaelm/invid-ui`. Use the `gh` CLI for all operations.

## Identity (required)

This repo must only be accessed with the INVID GitHub identity:

- Git remote: `git@github-invid:joserafaelm/invid-ui.git` (SSH alias `github-invid` → key `~/.ssh/id_ed25519_invid`). Never rewrite it to `git@github.com:`.
- Commit identity: `user.name "JRMR"`, `user.email "jmorales@invidgroup.com"` (repo-local git config). Verify before committing.
- `gh` authenticates by token, not the SSH key. Before the first `gh` write in a session, run `gh auth status` and confirm the active github.com account is the one with access to `joserafaelm/invid-ui` via the INVID identity; if not, `gh auth switch` to it or stop and ask.
- Always pass `--repo joserafaelm/invid-ui` to `gh` commands so the SSH alias never has to be resolved.

## Conventions

- **Create an issue**: `gh issue create --repo joserafaelm/invid-ui --title "..." --body "..."`. Use a heredoc for multi-line bodies.
- **Read an issue**: `gh issue view <number> --repo joserafaelm/invid-ui --comments`, filtering comments by `jq` and also fetching labels.
- **List issues**: `gh issue list --repo joserafaelm/invid-ui --state open --json number,title,body,labels,comments --jq '[.[] | {number, title, body, labels: [.labels[].name], comments: [.comments[].body]}]'` with appropriate `--label` and `--state` filters.
- **Comment on an issue**: `gh issue comment <number> --repo joserafaelm/invid-ui --body "..."`
- **Apply / remove labels**: `gh issue edit <number> --repo joserafaelm/invid-ui --add-label "..."` / `--remove-label "..."`
- **Close**: `gh issue close <number> --repo joserafaelm/invid-ui --comment "..."`

## Pull requests as a triage surface

**PRs as a request surface: no.** _(Set to `yes` if this repo treats external PRs as feature requests; `/triage` reads this flag.)_

When set to `yes`, PRs run through the same labels and states as issues, using the `gh pr` equivalents (always with `--repo joserafaelm/invid-ui`):

- **Read a PR**: `gh pr view <number> --comments` and `gh pr diff <number>` for the diff.
- **List external PRs for triage**: `gh pr list --state open --json number,title,body,labels,author,authorAssociation,comments` then keep only `authorAssociation` of `CONTRIBUTOR`, `FIRST_TIME_CONTRIBUTOR`, or `NONE` (drop `OWNER`/`MEMBER`/`COLLABORATOR`).
- **Comment / label / close**: `gh pr comment`, `gh pr edit --add-label`/`--remove-label`, `gh pr close`.

GitHub shares one number space across issues and PRs, so a bare `#42` may be either: resolve with `gh pr view 42` and fall back to `gh issue view 42`.

## When a skill says "publish to the issue tracker"

Create a GitHub issue.

## When a skill says "fetch the relevant ticket"

Run `gh issue view <number> --repo joserafaelm/invid-ui --comments`.

## Wayfinding operations

Used by `/wayfinder`. The **map** is a single issue with **child** issues as tickets.

- **Map**: a single issue labelled `wayfinder:map`, holding the Notes / Decisions-so-far / Fog body. `gh issue create --repo joserafaelm/invid-ui --label wayfinder:map`.
- **Child ticket**: an issue linked to the map as a GitHub sub-issue (`gh api` on the sub-issues endpoint). Where sub-issues aren't enabled, add the child to a task list in the map body and put `Part of #<map>` at the top of the child body. Labels: `wayfinder:<type>` (`research`/`prototype`/`grilling`/`task`). Once claimed, the ticket is assigned to the driving dev.
- **Blocking**: GitHub's **native issue dependencies**, the canonical, UI-visible representation. Add an edge with `gh api --method POST repos/joserafaelm/invid-ui/issues/<child>/dependencies/blocked_by -F issue_id=<blocker-db-id>`, where `<blocker-db-id>` is the blocker's numeric **database id** (`gh api repos/joserafaelm/invid-ui/issues/<n> --jq .id`, _not_ the `#number` or `node_id`). GitHub reports `issue_dependencies_summary.blocked_by` (open blockers only, the live gate). Where dependencies aren't available, fall back to a `Blocked by: #<n>, #<n>` line at the top of the child body. A ticket is unblocked when every blocker is closed.
- **Frontier query**: list the map's open children (`gh issue list --repo joserafaelm/invid-ui --state open`, scoped to the map's sub-issues / task list), drop any with an open blocker (`issue_dependencies_summary.blocked_by > 0`, or an open issue in the `Blocked by` line) or an assignee; first in map order wins.
- **Claim**: `gh issue edit <n> --repo joserafaelm/invid-ui --add-assignee @me`, the session's first write.
- **Resolve**: `gh issue comment <n> --repo joserafaelm/invid-ui --body "<answer>"`, then `gh issue close <n> --repo joserafaelm/invid-ui`, then append a context pointer (gist + link) to the map's Decisions-so-far.
