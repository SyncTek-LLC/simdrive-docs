# SimDrive docs

Source for [docs.simdrive.dev](https://docs.simdrive.dev) — built with
[Mintlify](https://mintlify.com).

> SimDrive is MCP-native iOS automation: reproduce and validate iOS bugs in
> 60 seconds with Claude. Record once, replay free in CI.

This repo is **MIT-licensed** so the community can contribute fixes,
clarifications, and new how-to guides. The SimDrive package itself is
Elastic-2.0 — see [SyncTek-LLC/simdrive](https://github.com/SyncTek-LLC/simdrive).

## Structure

```
.
├── mint.json             # Mintlify site config (nav, colors, og:image, ...)
├── introduction.mdx      # landing page
├── quickstart/           # install + first bug + CI replay
├── concepts/             # mental model (MCP, sessions, observe, replay, ...)
├── guides/               # how-tos (bug repro, CI, real device, journeys)
├── reference/            # 32 MCP tool reference, grouped
├── license/              # trial + paid + seats (product licensing, not repo license)
├── changelog/            # release notes mirror
├── troubleshooting.mdx   # common errors & fixes
├── logo/                 # SimDrive brand SVGs (wordmark, favicon)
├── images/               # og:image + brand avatar
└── LICENSE.md            # MIT for this docs repo
```

## Run locally

```bash
npm i -g mintlify
mintlify dev
# → http://localhost:3000
```

`mintlify dev` watches files and hot-reloads. If you change `mint.json` you
may need to restart it.

## Deploy

Auto-deployed by Mintlify on every push to `main` once the Chairman has
connected this repo via the Mintlify dashboard. See [`DEPLOY.md`](./DEPLOY.md)
for the one-time deploy runbook.

## Contributing

Pull requests welcome — especially:

- New guides under `guides/` (real-world recipes)
- Clarifications and corrections in `reference/` (tool schemas drift; we
  catch up on every release)
- Troubleshooting entries for errors you hit

Style:

- Voice: monospace-forward, code-first, no marketing fluff.
- Lead each page with the **why** before the **how**.
- Code blocks must work as pasted — real, runnable.
- Cross-link aggressively between concepts and reference.

## Repo conventions

- Brand strict: cyan accent `#22D3EE`, ink `#0A0A0A`, paper `#FFFFFF`.
- Wordmark = JetBrains Mono Bold 800. See `logo/` for canonical SVGs.
- All `.mdx` pages need YAML frontmatter (`title`, `description`).
- All page filenames are lowercase-kebab (`first-bug.mdx`, not `FirstBug.mdx`).

## Source content

These docs are written by hand against:

- [`SyncTek-LLC/simdrive`](https://github.com/SyncTek-LLC/simdrive) — the
  package itself.
- [`simdrive/CHANGELOG.md`](https://github.com/SyncTek-LLC/simdrive/blob/main/simdrive/CHANGELOG.md)
  — release notes (mirrored manually for now; automated sync is on the
  roadmap).
- The 32 MCP tool schemas in `simdrive/src/simdrive/server.py::_TOOLS` —
  canonical when this reference drifts.

## License

MIT — see [`LICENSE.md`](./LICENSE.md). The SimDrive *package* is
Elastic-2.0; only these docs are MIT.

Built by [SyncTek](https://synctek.io). Tracked under `INIT-2026-549`.
