import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const config = JSON.parse(readFileSync(resolve(root, '.cursor', 'mcp.json'), 'utf8'));
const apiKey = process.env.STITCH_API_KEY || config.mcpServers.stitch.headers['X-Goog-Api-Key'];

async function call(name, args) {
  const res = await fetch('https://stitch.googleapis.com/mcp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-Goog-Api-Key': apiKey },
    body: JSON.stringify({
      jsonrpc: '2.0',
      id: 1,
      method: 'tools/call',
      params: { name, arguments: args },
    }),
  });
  const json = await res.json();
  console.log(JSON.stringify(json, null, 2));
}

const list = await call('list_projects', {});
// parse from stdout - actually call returns void. Fix script.
