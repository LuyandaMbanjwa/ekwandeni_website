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
