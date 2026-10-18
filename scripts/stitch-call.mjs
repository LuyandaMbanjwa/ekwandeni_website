/**
 * Minimal Stitch MCP HTTP client — reads API key from .cursor/mcp.json
 * Usage: node scripts/stitch-call.mjs <toolName> '<json arguments>'
 */
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const mcpPath = resolve(root, '.cursor', 'mcp.json');
const config = JSON.parse(readFileSync(mcpPath, 'utf8'));
const apiKey =
  process.env.STITCH_API_KEY || config.mcpServers?.stitch?.headers?.['X-Goog-Api-Key'];
if (!apiKey) {
  console.error('Missing stitch X-Goog-Api-Key in .cursor/mcp.json');
  process.exit(1);
}

const toolName = process.argv[2];
let args = {};
if (process.argv[3]) {
  try {
    args = JSON.parse(process.argv[3]);
  } catch {
    console.error('Invalid JSON arguments:', process.argv[3]);
    process.exit(1);
  }
}

if (!toolName) {
  console.error('Usage: node scripts/stitch-call.mjs <toolName> [jsonArgs]');
  process.exit(1);
}

const body = {
  jsonrpc: '2.0',
  id: 1,
  method: 'tools/call',
  params: { name: toolName, arguments: args },
};

const res = await fetch('https://stitch.googleapis.com/mcp', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-Goog-Api-Key': apiKey,
  },
  body: JSON.stringify(body),
});

const text = await res.text();
if (!res.ok) {
  console.error(text);
  process.exit(1);
}
const json = JSON.parse(text);
if (json.error) {
  console.error(JSON.stringify(json.error, null, 2));
  process.exit(1);
}
const part = json.result?.content?.[0];
if (part?.isError) {
  console.error(part.text);
  process.exit(1);
}
console.log(text);
