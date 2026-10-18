# Ekwandeni POS — marketing site (Stitch)

## Vision

Single-page marketing site for **Ekwandeni POS** (storeOS product): alcohol and township retail, offline-capable till, deposits/empties, back office.

## Stitch project

- **Title:** Ekwandeni POS Website
- **Project ID:** `2905032265145619525` (see `.stitch/metadata.json`)
- **Reference assets:** `.stitch/designs/` (HTML + PNG from Stitch)
- **Design system:** `.stitch/DESIGN.md` (uploaded via Stitch MCP)

## Sitemap (implemented in Vite/React)

| Page | Route | Stitch reference |
|------|-------|------------------|
| Landing | `/` (SPA) | `.stitch/designs/landing.png` / `landing.html` |

## Roadmap

1. Landing — reference screen in Stitch (done via setup script)
2. Optional: mobile variant screen
3. Optional: edit screens in Stitch → reconcile tokens in `src/index.css`

## MCP access

Credentials: [`.cursor/mcp.json`](../.cursor/mcp.json) (`stitch` server → `https://stitch.googleapis.com/mcp`).

In Cursor: **Settings → MCP** — ensure project MCP is enabled and `stitch` shows connected.

CLI (no MCP UI): `npm run stitch:call -- list_projects` or `npm run stitch:setup`.
