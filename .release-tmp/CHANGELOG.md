## [1.0.0b8] — 2026-05-26

### Added

- **MCP registry metadata** (`server.json` + README discovery tag) for Anthropic / Smithery / awesome-mcp-servers ingestion. The `<!-- mcp-name: io.github.SyncTek-LLC/simdrive -->` HTML comment at the top of `README.md` (root) and `simdrive/README.md` lets the official MCP registry verify the package; `server.json` at the repo root declares the canonical metadata (name, version, repo, license, runtime, packages, transport=stdio, runtimeHint=uvx) per the [MCP registry schema](https://github.com/modelcontextprotocol/registry).
- **`simdrive trial start --source <channel>`** — opt-in marketing-attribution flag. The CLI sends one POST to `https://api.simdrive.dev/trial` with `{hashed_email, source, ts, package_version, os}`. **Raw email never leaves the machine** — only SHA-256(email.lower.strip) is transmitted. Omitting the flag records the trial as `"direct"`.
- **`simdrive trial start --no-track`** — explicit per-invocation opt-out. Skips the network call; trial license still generates locally. Persistent opt-out: create `~/.simdrive/telemetry.toml` containing `track = false` (or set `SIMDRIVE_TELEMETRY_OFF=1`) to disable source-tracking permanently for that user.

### Notes

- Source-tracking sends only `{hashed_email, source, ts, package_version, os}`. Raw email never leaves the machine; the OS field is the coarse family (`darwin` / `linux` / `other`), not a fingerprint. Worker `/trial` endpoint at api.simdrive.dev/trial.
- Network failure is non-fatal: the trial license still installs locally and the CLI prints a single `"telemetry skipped"` notice.
- License-issuance behaviour, JWT shape, and paywall enforcement are unchanged from b7.

---
