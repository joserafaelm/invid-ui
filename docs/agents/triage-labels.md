# Triage Labels

The skills speak in terms of canonical triage roles. This file maps those roles to the actual label strings used in this repo's issue tracker.

| Role in mattpocock/skills | Label in our tracker | Meaning                                  |
| ------------------------- | -------------------- | ---------------------------------------- |
| `bug`                     | `bug`                | Category: something is broken            |
| `enhancement`             | `feature`            | Category: new feature or improvement     |
| —                         | `documentation`      | Extra category: docs-only change         |
| `needs-triage`            | `needs-triage`       | Maintainer needs to evaluate this issue  |
| `needs-info`              | `needs-info`         | Waiting on reporter for more information |
| `ready-for-agent`         | _(none)_             | Not used in this repo                    |
| `ready-for-human`         | _(none)_             | Not used in this repo                    |
| `wontfix`                 | `wontfix`            | Will not be actioned                     |
| —                         | `blocked-by-issue`   | Extra state: waiting on another issue    |

When a skill mentions a role (e.g. "apply the AFK-ready triage label"), use the corresponding label string from this table.

Roles marked _(none)_ have no label here. When a skill would apply `ready-for-agent` or `ready-for-human`, do not create or apply a label: remove `needs-triage` / `needs-info`, post the brief as a comment, and tell the maintainer the issue is ready and whether it suits an agent or a human.

Edit the right-hand column to match whatever vocabulary you actually use.
