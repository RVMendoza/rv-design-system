import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { siMeta, siSpotify } from 'simple-icons';

const output = resolve(import.meta.dirname, '../../public/media/brands');
await mkdir(output, { recursive: true });

for (const [filename, icon] of [
  ['meta.svg', siMeta],
  ['spotify.svg', siSpotify],
]) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24"><path fill="#${icon.hex}" d="${icon.path}"/></svg>\n`;
  await writeFile(resolve(output, filename), svg);
}
