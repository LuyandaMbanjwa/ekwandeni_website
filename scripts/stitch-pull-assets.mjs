import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const meta = JSON.parse(readFileSync(resolve(root, '.stitch', 'metadata.json'), 'utf8'));
const outDir = resolve(root, '.stitch', 'designs');
mkdirSync(outDir, { recursive: true });

const components = meta.lastGeneration?.outputComponents || [];
for (const comp of components) {
  const screens = comp.design?.screens || [];
  for (const screen of screens) {
    const htmlUrl = screen.htmlCode?.downloadUrl;
    const shotUrl = screen.screenshot?.downloadUrl;
    const slug = (screen.title || screen.id || 'screen').replace(/[^\w-]+/g, '-').slice(0, 40);
    if (htmlUrl) {
      const html = await (await fetch(htmlUrl)).text();
      writeFileSync(resolve(outDir, `${slug}.html`), html);
      console.log('Wrote', `${slug}.html`);
    }
    if (shotUrl) {
      const w = screen.width || 1280;
      const buf = Buffer.from(await (await fetch(`${shotUrl}=w${w}`)).arrayBuffer());
      writeFileSync(resolve(outDir, `${slug}.png`), buf);
      console.log('Wrote', `${slug}.png`);
    }
  }
}
