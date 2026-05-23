// scripts/apply-release.mjs
//
// Run from .github/workflows/release-update.yml after every engine release.
// Reads env vars:
//   SIMDRIVE_VERSION         e.g. "1.0.0b6"
//   SIMDRIVE_TAG             e.g. "simdrive-v1.0.0b6"
//   SIMDRIVE_PYPI_URL
//   SIMDRIVE_RELEASE_URL
//   SIMDRIVE_CHANGELOG_PATH  path to upstream CHANGELOG.md at the tag
//
// What it does:
//   1. Prepends the new release section to changelog/index.mdx (idempotent --
//      bails if the version heading already exists).
//   2. Leaves quickstart/install.mdx alone.
//
// Install-pin policy (Chairman 2026-05-22):
//   The primary `pip install simdrive` snippet in quickstart/install.mdx
//   stays UNPINNED across releases. Pinned form `pip install simdrive==X.Y.Z`
//   is reserved for deep reproducible-build / CI docs sections only. This
//   script does NOT touch the primary install snippet by design.
//
// Idempotent: re-running with the same version no-ops.

import { promises as fs } from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const VERSION = process.env.SIMDRIVE_VERSION;
const TAG = process.env.SIMDRIVE_TAG;
const RELEASE_URL = process.env.SIMDRIVE_RELEASE_URL;
const CHANGELOG_PATH = process.env.SIMDRIVE_CHANGELOG_PATH;

if (!VERSION || !TAG || !CHANGELOG_PATH) {
  console.error("apply-release: missing required env vars");
  process.exit(2);
}

const upstream = await fs.readFile(CHANGELOG_PATH, "utf8");
const re = new RegExp(
  `(##\\s*\\[?${escapeRegex(VERSION)}\\]?[^\\n]*\\n[\\s\\S]*?)(?=\\n##\\s*\\[|$)`,
  "m",
);
const m = upstream.match(re);
if (!m) {
  console.warn(`apply-release: CHANGELOG section for ${VERSION} not found upstream -- skipping docs changelog write`);
  process.exit(0);
}
const section = m[1].trim();

const docsChangelogPath = path.join(ROOT, "changelog", "index.mdx");
const current = await fs.readFile(docsChangelogPath, "utf8");

if (current.includes(`## ${VERSION} `) || current.includes(`## [${VERSION}]`)) {
  console.log(`apply-release: ${VERSION} already in changelog/index.mdx -- no-op`);
  process.exit(0);
}

// Insert the new section after the frontmatter and any leading heading/intro,
// at the first `## ` line (which is the most-recent existing release).
const insertAtIdx = findInsertionPoint(current);
const updated =
  current.slice(0, insertAtIdx) +
  section +
  `\n\nFull upstream entry: ${RELEASE_URL}\n\n` +
  current.slice(insertAtIdx);

await fs.writeFile(docsChangelogPath, updated);
console.log(`prepended ${VERSION} section to changelog/index.mdx`);

function findInsertionPoint(text) {
  // Skip frontmatter if present (---\n...\n---\n).
  let i = 0;
  if (text.startsWith("---")) {
    const end = text.indexOf("\n---", 3);
    if (end !== -1) i = end + 4;
  }
  // Find the first "## " heading after that. If none, append.
  const idx = text.indexOf("\n## ", i);
  return idx === -1 ? text.length : idx + 1;
}

function escapeRegex(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
