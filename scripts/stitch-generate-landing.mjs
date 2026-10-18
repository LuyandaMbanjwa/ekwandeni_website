import { readFileSync, writeFileSync, mkdirSync } from 'fs';
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
    throw new Error(part?.text || JSON.stringify(json.error));
  }
  try {
    return JSON.parse(part.text);
  } catch {
    return { raw: part.text };
  }
}

const prompt = `Single-page marketing website for Ekwandeni POS — point-of-sale for South African alcohol retailers.

PLATFORM: Web, desktop-first (1440px)

PAGE STRUCTURE:
1. Sticky navigation: logo, About, Features, Solutions, FAQ, Contact, CTA Book a demo
2. Hero on dark background: large serif headline (Libre Baskerville style), Almarai body, cyan primary button
3. One-of-a-kind split section: left copy on deposits, empties, offline trade; right empty framed panel for 3D visual
4. Stat row (3 cards), three solution pillars, feature zig-zag, FAQ, contact form, footer
No scroll-hint text. No overlapping headline on images.`;

console.log('Generating screen for project', projectId);
const gen = await call('generate_screen_from_text', {
  projectId,
  deviceType: 'DESKTOP',
  modelId: 'GEMINI_3_8_FLASH',
  prompt,
});

const projectFull = await call('get_project', { projectId });
mkdirSync(resolve(root, '.stitch', 'designs'), { recursive: true });
writeFileSync(
  resolve(root, '.stitch', 'metadata.json'),
  JSON.stringify({ projectId, title: 'Ekwandeni POS Website', lastGeneration: gen, project: projectFull }, null, 2),
);

const outputs = gen.outputComponents || [];
for (const comp of outputs) {
  const htmlUrl = comp.htmlCode?.downloadUrl;
  const shotUrl = comp.screenshot?.downloadUrl;
  if (htmlUrl) {
    writeFileSync(resolve(root, '.stitch', 'designs', 'landing.html'), await (await fetch(htmlUrl)).text());
    console.log('Saved landing.html');
  }
  if (shotUrl) {
    const w = comp.screenshot?.width || 1280;
    const url = `${shotUrl}=w${w}`;
    writeFileSync(resolve(root, '.stitch', 'designs', 'landing.png'), Buffer.from(await (await fetch(url)).arrayBuffer()));
    console.log('Saved landing.png');
  }
}

console.log('Done. Session:', gen.sessionId);
