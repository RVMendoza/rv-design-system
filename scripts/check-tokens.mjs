import { readdirSync, readFileSync } from 'node:fs';

const css = readFileSync(new URL('../src/tokens/tokens.css', import.meta.url), 'utf8');
const banned = ['cream', 'coral', 'Georgia', 'Times New Roman', '--rv-color-blue'];
for (const term of banned) {
  if (css.includes(term)) throw new Error(`Removed visual-system token reintroduced: ${term}`);
}

const required = ['--rvds-color-action', '--rvds-color-action-hover', '--rvds-color-action-text', '--rvds-color-link', '--rvds-color-focus'];
for (const token of required) {
  if (!css.includes(`${token}:`)) throw new Error(`Required semantic token missing: ${token}`);
}

const sourceRoot = new URL('../src/', import.meta.url);
const cssFiles = readdirSync(sourceRoot, { recursive: true })
  .filter((path) => path.endsWith('.css'))
  .map((path) => ({ path, contents: readFileSync(new URL(path, sourceRoot), 'utf8') }));

for (const { path, contents } of cssFiles) {
  for (const match of contents.matchAll(/^\s*(--[a-z][a-z0-9-]*)\s*:/gm)) {
    if (!match[1].startsWith('--rvds-')) throw new Error(`Unnamespaced custom property in ${path}: ${match[1]}`);
  }
  if (path.endsWith('.module.css')) {
    for (const match of contents.matchAll(/\.([a-z][a-z0-9_-]*)/g)) {
      const className = match[1];
      const bem = /^rvds-[a-z0-9]+(?:-[a-z0-9]+)*(?:__[a-z0-9]+(?:-[a-z0-9]+)*)?(?:--[a-z0-9]+(?:-[a-z0-9]+)*)?$/;
      if (!bem.test(className)) throw new Error(`Invalid RVDS BEM class in ${path}: ${className}`);
    }
  }
}

function luminance(hex) {
  const channels = hex.match(/[a-f\d]{2}/gi).map((value) => Number.parseInt(value, 16) / 255);
  const linear = channels.map((value) => value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4);
  return 0.2126 * linear[0] + 0.7152 * linear[1] + 0.0722 * linear[2];
}

function contrast(foreground, background) {
  const [lighter, darker] = [luminance(foreground), luminance(background)].sort((a, b) => b - a);
  return (lighter + 0.05) / (darker + 0.05);
}

const checks = [
  ['primary text', '#f8f7ff', '#020202', 4.5],
  ['muted text', '#b8b5bd', '#020202', 4.5],
  ['link', '#1b998b', '#020202', 4.5],
  ['action text', '#020202', '#f4b942', 4.5],
  ['action hover text', '#020202', '#ffd166', 4.5],
  ['focus indicator', '#f4b942', '#020202', 3],
  ['error text', '#ff929a', '#020202', 4.5],
];

for (const [name, foreground, background, minimum] of checks) {
  const ratio = contrast(foreground, background);
  if (ratio < minimum) throw new Error(`${name} contrast ${ratio.toFixed(2)}:1 is below ${minimum}:1`);
}

console.log(`Token checks passed (${checks.length} contrast pairs).`);
