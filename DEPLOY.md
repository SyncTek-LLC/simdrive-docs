# Deploy runbook — docs.simdrive.dev

> Chairman runs this once. After that, Mintlify auto-deploys on every push
> to `main`.

## One-time Mintlify setup

1. **Sign in** at <https://mintlify.com> with GitHub OAuth using the
   `SyncTek-LLC` org admin account.
2. **New project** → "Import from GitHub" → select
   `SyncTek-LLC/simdrive-docs` → grant the Mintlify GitHub App access.
3. **Pick the entry file**: Mintlify auto-detects `mint.json` at the repo
   root — accept the default.
4. **Verify the preview build** completes. Mintlify will spin up a
   `*.mintlify.app` URL within ~60s. Confirm:
   - Wordmark renders in the top-left (light + dark).
   - Favicon shows in the browser tab.
   - Sidebar shows all five navigation groups (Get Started, Concepts,
     Guides, License, Troubleshooting) + the Reference and Changelog tabs.
   - Search works (`⌘K`).

## Custom domain

1. In the Mintlify dashboard for this project: **Settings → Domains → Add
   custom domain → `docs.simdrive.dev`**.
2. Mintlify will give you a CNAME target — typically `cname.mintlify.app`
   or a project-specific subdomain.
3. In **Cloudflare** (the registrar for `simdrive.dev`):
   - DNS → Add record
   - Type: `CNAME`
   - Name: `docs`
   - Target: `<the CNAME Mintlify gave you>`
   - Proxy status: **DNS only** (gray cloud) — Mintlify handles its own
     edge + TLS. The orange-cloud proxy can break the HTTPS handshake.
4. Wait ~5 min for DNS to propagate. Verify in the Mintlify dashboard that
   the domain status flips to "Verified ✓" and HTTPS is provisioned.
5. Test: <https://docs.simdrive.dev> should now serve the site.

## Auto-deploy

Mintlify watches the connected branch (default `main`). Every push to
`main` triggers a rebuild. Typical build time: 20–60 seconds.

Preview builds for PRs are enabled by default — every PR gets a
`pr-<n>-simdrive-docs.mintlify.app` preview URL posted as a check.

## Items to verify after first Mintlify build

- [ ] `mint.json` schema passes Mintlify's linter (most fields used are
      standard; flag any warnings in the Mintlify dashboard).
- [ ] All anchor links in the sidebar resolve to real pages.
- [ ] Code blocks render with syntax highlighting.
- [ ] `<Tabs>` and `<CardGroup>` components in `quickstart/install.mdx` and
      `introduction.mdx` render correctly (these are Mintlify-specific MDX
      components).
- [ ] `og:image` at `/images/og-image.png` previews correctly when sharing a
      URL on Slack/Twitter/Linear.
- [ ] Dark mode is the default (set in `mint.json` via `modeToggle.default`).

If any of these fail, file an issue here and tag `mintlify-verify`. The
scaffold was built best-effort against Mintlify schema; minor adjustments
may be needed after the first live build.

## After deploy — link from siblings

Once `docs.simdrive.dev` is live, update:

- `simdrive-site` landing page → add "Docs" nav link
- `SyncTek-LLC/simdrive` README → add the docs URL near the top
- `simdrive-demo-app` README → link to the relevant quickstart
- `simdrive/CHANGELOG.md` → add docs URL to the header

These are not blockers for deploy — they're follow-ups.

## Cost

Mintlify free tier covers a public OSS docs site of this size. If the
project grows past free-tier limits (>10k monthly views, custom
authentication, advanced analytics), upgrade plans are in their pricing
page.
