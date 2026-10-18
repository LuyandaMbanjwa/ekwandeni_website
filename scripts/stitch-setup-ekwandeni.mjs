/**
 * Creates Stitch project, uploads DESIGN.md, applies design system, generates landing reference screen.
 */
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const mcpPath = resolve(root, '.cursor', 'mcp.json');
const config = JSON.parse(readFileSync(mcpPath, 'utf8'));
const apiKey =
  process.env.STITCH_API_KEY || config.mcpServers?.stitch?.headers?.['X-Goog-Api-Key'];

async function callTool(name, args) {
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
  if (json.error) throw new Error(JSON.stringify(json.error));
  const text = json.result?.content?.[0]?.text;
  if (!text) throw new Error('Empty MCP response');
  return JSON.parse(text);
}

function projectIdFromName(name) {
  return name.replace(/^projects\//, '');
}

const designMd = readFileSync(resolve(root, '.stitch', 'DESIGN.md'), 'utf8');
const designMdBase64 = Buffer.from(designMd, 'utf8').toString('base64');

const list = await callTool('list_projects', {});
const existing = (list.projects || []).find((p) => p.title === 'Ekwandeni POS Website');

let project;
if (existing) {
  project = existing;
  console.log('Using existing project:', existing.title, projectIdFromName(existing.name));
} else {
  project = await callTool('create_project', { title: 'Ekwandeni POS Website' });
  console.log('Created project:', project.title || project.name);
}

const projectId = projectIdFromName(project.name || project.projectId);

await callTool('upload_design_md', { projectId, designMdBase64 });
console.log('Uploaded DESIGN.md');

try {
  await callTool('create_design_system_from_design_md', { projectId });
  console.log('Created design system from DESIGN.md');
} catch (e) {
  console.warn('create_design_system_from_design_md skipped:', e.message);
}

const prompt = `Single-page marketing website for Ekwandeni POS — point-of-sale software for South African alcohol retailers (bottle stores, taverns, spazas).

PLATFORM: Web, desktop-first (1440px)

PAGE STRUCTURE:
1. Sticky navigation bar with logo, anchors (About, Features, Solutions, FAQ, Contact), primary CTA "Book a demo"
2. Hero: dark editorial background, large Libre Baskerville headline about till + back office for liquor retail, Almarai subtext, two CTAs
3. "One of a kind" split section: left copy on deposits/empties/offline trade; right placeholder panel for 3D product visual (empty frame with subtle border, no overlapping text)
4. Three stat cards (township economy, informal employment, data visibility)
5. Three solution pillars (The till, Back office, Keeps trading offline)
6. Two feature zig-zag sections with product UI mockups
7. FAQ accordion and contact form with footer

Use asymmetric layouts where appropriate; no scroll-hint text.`;

const gen = await callTool('generate_screen_from_text', {
  projectId,
  deviceType: 'DESKTOP',
  modelId: 'GEMINI_3_8_FLASH',
  prompt,
});

console.log('Generated screen session:', gen.sessionId);

const projectFull = await callTool('get_project', { projectId });
const metaPath = resolve(root, '.stitch', 'metadata.json');
mkdirSync(resolve(root, '.stitch', 'designs'), { recursive: true });
writeFileSync(
  metaPath,
  JSON.stringify(
    {
      projectId,
      title: 'Ekwandeni POS Website',
      updatedAt: new Date().toISOString(),
      lastGeneration: gen,
      project: projectFull,
    },
    null,
    2,
  ),
);

console.log('Wrote', metaPath);

// Try to download first screen HTML/screenshot from generation output
const outputs = gen.outputComponents || gen.outputs || [];
for (const comp of outputs) {
  const html = comp.htmlCode?.downloadUrl || comp.html?.downloadUrl;
  const shot = comp.screenshot?.downloadUrl || comp.thumbnailScreenshot?.downloadUrl;
  if (html) {
    const r = await fetch(html);
    writeFileSync(resolve(root, '.stitch', 'designs', 'landing.html'), await r.text());
    console.log('Saved .stitch/designs/landing.html');
  }
  if (shot) {
    const w = comp.width || comp.screenshot?.width || 1280;
    const url = shot.includes('=') ? shot : `${shot}=w${w}`;
    const r = await fetch(url);
    const buf = Buffer.from(await r.arrayBuffer());
    writeFileSync(resolve(root, '.stitch', 'designs', 'landing.png'), buf);
    console.log('Saved .stitch/designs/landing.png');
  }
}

console.log('Done. Open https://stitch.withgoogle.com/ and find project "Ekwandeni POS Website".');
