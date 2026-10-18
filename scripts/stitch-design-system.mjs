import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const projectId = process.argv[2] || '2905032265145619525';
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
  const part = json.result?.content?.[0];
  if (json.error || part?.isError) {
    console.error(part?.text || JSON.stringify(json.error));
    process.exit(1);
  }
  return JSON.parse(part.text);
}

const designMd = readFileSync(resolve(root, '.stitch', 'DESIGN.md'), 'utf8');
await call('upload_design_md', {
  projectId,
  designMdBase64: Buffer.from(designMd, 'utf8').toString('base64'),
});
console.log('upload_design_md ok');

try {
  const ds = await call('create_design_system_from_design_md', { projectId });
  console.log('create_design_system_from_design_md ok', ds);
} catch {
  // fallback
}

const created = await call('create_design_system', {
  projectId,
  designSystem: {
    designTheme: {
      colorMode: 'LIGHT',
      headlineFont: 'EB_GARAMOND',
      bodyFont: 'NUNITO_SANS',
      customColor: '#1f9cc8',
      roundness: 'ROUND_FULL',
    },
  },
});
console.log('create_design_system', created);
