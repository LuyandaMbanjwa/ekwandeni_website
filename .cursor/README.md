# Cursor MCP — Google Stitch

This project wires **Google Stitch** through MCP:

- Config: [`mcp.json`](./mcp.json)
- Endpoint: `https://stitch.googleapis.com/mcp`
- Auth: `X-Goog-Api-Key` header (do not commit rotated keys to public repos)

## Enable in Cursor

1. Open **Cursor Settings → MCP** (or Features → MCP).
2. Confirm the **ekwandeni_website** project is open so `.cursor/mcp.json` is loaded.
3. Restart MCP / reload window if the `stitch` server does not appear.
4. In Agent chat, Stitch tools should be available (`create_project`, `generate_screen_from_text`, etc.).

## Without MCP UI

From the project root:

```bash
npm run stitch:call list_projects '{}'
npm run stitch:setup
```

`stitch:setup` creates the **Ekwandeni POS Website** project, uploads `.stitch/DESIGN.md`, and generates a landing reference screen.
