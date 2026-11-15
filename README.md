# Ekwandeni POS — marketing website

Single-page marketing site for **Ekwandeni POS** (product codebase: `storeOS`).

## Run locally

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually **http://localhost:5173**). Do **not** double-click `index.html` — that shows a blank page because the app needs the Vite dev server.

## Build

```bash
npm run build
npm run preview
```

Static output is in `dist/`.

## Deploy on Vercel

1. Import the Git repo (root = this folder — `package.json` at the repository root).
2. Framework preset **Vite** (or let [`vercel.json`](vercel.json) set `buildCommand` / `outputDirectory`).
3. **Output Directory** must be `dist` (not `public`). If the dashboard overrides this, clear it or match `vercel.json`.
4. Redeploy after any change to build settings.

If you see **404 NOT_FOUND** on the site URL:

- Check the latest deployment **Build** log — a failed build leaves nothing to serve.
- Confirm **Root Directory** is empty (or `.`) when the repo *is* `ekwandeni_website`, not a parent monorepo folder.
- Confirm **Output Directory** = `dist`.

Static files such as `/privacy-policy.html` and `/assets/*` are served as files; other paths rewrite to `index.html` for the SPA.

## Site assistant

A floating **Ekwandeni Guide** chat (bottom-right) answers visitor questions using searchable copy from `src/content/site.ts` (FAQs, features, pillars, and overview text). No API keys or server calls—suitable for static deploy on Vercel.

- Widget copy and knowledge indexing: `src/content/assistant.ts`
- Search scoring: `src/lib/assistantSearch.ts`
- UI: `src/components/SiteAssistant.tsx`

To upgrade later to a real LLM, add a Vercel serverless `/api/chat` route and swap the reply logic in `SiteAssistant` (reuse the same knowledge chunks for the system prompt).

## Google Stitch (via `.cursor/mcp.json`)

Stitch MCP is configured in [`.cursor/mcp.json`](.cursor/mcp.json). See [`.cursor/README.md`](.cursor/README.md) to enable it in Cursor.

```bash
npm run stitch:call list_projects
npm run stitch:setup          # create project + upload DESIGN.md
npm run stitch:generate       # regenerate landing reference
npm run stitch:pull           # download HTML/PNG to .stitch/designs/
```

**Project:** Ekwandeni POS Website — ID `2905032265145619525` (see `.stitch/metadata.json`).

Optional: set `STITCH_API_KEY` instead of storing the key in `mcp.json`.
