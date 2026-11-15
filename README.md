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

Use **one** of these setups (mixing them causes “No Output Directory named dist” errors):

### Recommended: static output (`dist`)

In **Project → Settings → Build & Development**:

| Setting | Value |
|--------|--------|
| Framework Preset | **Other** (not Vite) |
| Build Command | `npm run build` (or leave empty — [`vercel.json`](vercel.json) sets it) |
| Output Directory | `dist` |
| Install Command | `npm install` |
| Root Directory | *(blank — repo root is this project)* |

[`vercel.json`](vercel.json) intentionally omits `"framework": "vite"`. The Vite preset uses Vercel’s Build Output API and often **does not leave a `dist` folder on disk**, which breaks when Output Directory is set to `dist`.

Redeploy after changing settings. The build log should show `tsc -b`, `vite build`, and files under `dist/`.

### If you prefer Framework Preset = Vite

Clear **Output Directory** in the dashboard (leave blank) and remove `outputDirectory` from `vercel.json`. Do not set both Vite preset and `dist` as output.

### Troubleshooting

- **“No Output Directory named dist”** — Framework is Vite while Output Directory is `dist`. Switch to **Other** + `dist`, or use Vite with blank output (see above).
- **404 on the URL** — Latest deployment build must be green; confirm Root Directory points at this repo (where `package.json` and `vite.config.ts` live).

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
