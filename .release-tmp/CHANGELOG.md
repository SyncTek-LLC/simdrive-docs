## [1.0.0b6] — 2026-05-26

Tightens the version-pin diagnostic surface (INIT-2026-553 P2) so consumer monorepos can enforce a pinned simdrive release without scraping stderr.

### Added — `simdrive version` / `simdrive doctor` subcommands

- **`simdrive version [--json] [--required-version VERSION]`** — promoted from the bare `--version` flag into a proper subcommand. `--json` emits `{"version", "package"}` (plus `required` + `satisfies_required` when a pin is supplied) for clean parsing in CI gates. `--required-version` exits **3** on mismatch with a side-by-side installed-vs-required diagnostic and the exact `pip install 'simdrive==<version>'` command to align. Docs link surfaces in the error too.
- **`simdrive doctor [--json] [--required-version VERSION]`** — direct CLI wrapper around `diagnostics.doctor()`. Returns the same checks the MCP `doctor` tool returns; `--json` emits `{ok, version, package, checks[]}` for monorepo `make ios-smoke`-style gates that want one command for "is my env ready AND is the right simdrive installed". Exit 1 on check failure, exit 3 on version mismatch (mismatch dominates check failures — a wrong simdrive can produce spurious failures).
- **Legacy `simdrive --version` still works** and now transparently delegates to the new handler, so `simdrive --version --json` and `simdrive --version --required-version X` work via the short-flag spelling too.

### Why

A sub-agent dogfood (INIT-2026-553) hit `make ios-smoke` exit 3 because the monorepo Makefile pinned `0.1.0` but `1.0.0b4` was installed. The pre-fix diagnostic was opaque enough that the operator had to halt + ping the backend team for a version bump. Post-fix: the error tells the operator the exact pip command to run, and consumer scripts can parse `simdrive version --json` instead of scraping output.

---
