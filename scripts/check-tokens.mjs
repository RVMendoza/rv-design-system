import { readdirSync, readFileSync } from 'node:fs';

const css = readFileSync(new URL('../src/tokens/tokens.css', import.meta.url), 'utf8');
const banned = ['cream', 'coral', 'Georgia', 'Times New Roman', '--rv-color-blue'];
for (const term of banned) {
  if (css.includes(term)) throw new Error(`Removed visual-system token reintroduced: ${term}`);
}

const required = [
  '--rvds-color-action',
  '--rvds-color-action-hover',
  '--rvds-color-action-text',
  '--rvds-color-link',
  '--rvds-color-focus',
];
for (const token of required) {
  if (!css.includes(`${token}:`)) throw new Error(`Required semantic token missing: ${token}`);
}

for (const mapping of [
  '--rvds-color-action: var(--rvds-color-verdigris)',
  '--rvds-color-action-hover: var(--rvds-color-verdigris-hover)',
  '--rvds-color-link: var(--rvds-color-sunflower-gold)',
  '--rvds-color-focus: var(--rvds-color-sunflower-gold)',
]) {
  if (!css.includes(mapping)) throw new Error(`Semantic color mapping is incorrect: ${mapping}`);
}

const codeStyles = readFileSync(
  new URL('../src/components/Typography.module.css', import.meta.url),
  'utf8',
);
if (!/\.rvds-code-block__pre\s*\{[^}]*border-radius:\s*var\(--rvds-radius-xs\)/s.test(codeStyles)) {
  throw new Error('Code blocks must use --rvds-radius-xs.');
}

const buttonStyles = readFileSync(
  new URL('../src/components/Button.module.css', import.meta.url),
  'utf8',
);
const linkHover = /a\.rvds-button--primary:hover\s*\{([^}]*)\}/s.exec(buttonStyles)?.[1] ?? '';
for (const declaration of [
  'background: var(--rvds-color-background)',
  'border-color: var(--rvds-color-action-hover)',
  'color: var(--rvds-color-action-hover)',
  'text-decoration: underline',
]) {
  if (!linkHover.includes(declaration))
    throw new Error(`Primary link hover is missing: ${declaration}`);
}

const primaryButtonHover =
  /\.rvds-button--primary:hover:not\(:disabled\)\s*\{([^}]*)\}/s.exec(buttonStyles)?.[1] ?? '';
for (const declaration of [
  'background: var(--rvds-color-background)',
  'border-color: var(--rvds-color-action-hover)',
  'color: var(--rvds-color-action-hover)',
  'text-decoration: underline',
]) {
  if (!primaryButtonHover.includes(declaration))
    throw new Error(`Primary button hover is missing: ${declaration}`);
}

const secondaryHover =
  /\.rvds-button--secondary:hover:not\(:disabled\)\s*\{([^}]*)\}/s.exec(buttonStyles)?.[1] ?? '';
for (const declaration of [
  'background: var(--rvds-color-surface-muted)',
  'text-decoration: underline',
]) {
  if (!secondaryHover.includes(declaration))
    throw new Error(`Secondary hover is missing: ${declaration}`);
}

const embedStyles = readFileSync(
  new URL('../src/components/Embeds.module.css', import.meta.url),
  'utf8',
);
if (
  !/\.rvds-generic-embed:hover\s+\.rvds-generic-embed__title[^}]*text-decoration:\s*underline/s.test(
    embedStyles,
  )
) {
  throw new Error('Embed-card hover must underline its title instead of relying on color alone.');
}
if (
  !/\.rvds-generic-embed:focus-visible\s+\.rvds-generic-embed__title[^}]*text-decoration:\s*underline/s.test(
    embedStyles,
  )
) {
  throw new Error('Embed-card keyboard focus must expose the same title affordance as hover.');
}

const sourceRoot = new URL('../src/', import.meta.url);
const cssFiles = readdirSync(sourceRoot, { recursive: true })
  .filter((path) => path.endsWith('.css'))
  .map((path) => ({ path, contents: readFileSync(new URL(path, sourceRoot), 'utf8') }));

for (const { path, contents } of cssFiles) {
  if (/Georgia|Times New Roman|(?:^|[,'"\s])serif(?:[,;'"\s]|$)/i.test(contents)) {
    throw new Error(`Serif typography is not allowed in ${path}`);
  }
  for (const match of contents.matchAll(/^\s*(--[a-z][a-z0-9-]*)\s*:/gm)) {
    if (!match[1].startsWith('--rvds-'))
      throw new Error(`Unnamespaced custom property in ${path}: ${match[1]}`);
  }
  if (path.endsWith('.module.css')) {
    for (const match of contents.matchAll(/\.([a-z][a-z0-9_-]*)/g)) {
      const className = match[1];
      const bem =
        /^rvds-[a-z0-9]+(?:-[a-z0-9]+)*(?:__[a-z0-9]+(?:-[a-z0-9]+)*)?(?:--[a-z0-9]+(?:-[a-z0-9]+)*)?$/;
      if (!bem.test(className)) throw new Error(`Invalid RVDS BEM class in ${path}: ${className}`);
    }
  }
}

function luminance(hex) {
  const channels = hex.match(/[a-f\d]{2}/gi).map((value) => Number.parseInt(value, 16) / 255);
  const linear = channels.map((value) =>
    value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4,
  );
  return 0.2126 * linear[0] + 0.7152 * linear[1] + 0.0722 * linear[2];
}

function contrast(foreground, background) {
  const [lighter, darker] = [luminance(foreground), luminance(background)].sort((a, b) => b - a);
  return (lighter + 0.05) / (darker + 0.05);
}

const checks = [
  ['primary text', '#f8f7ff', '#020202', 4.5],
  ['muted text', '#b8b5bd', '#020202', 4.5],
  ['link on canvas', '#f4b942', '#020202', 4.5],
  ['link on raised surface', '#f4b942', '#0e0e10', 4.5],
  ['action text', '#020202', '#1b998b', 4.5],
  ['action hover text', '#020202', '#32b8a8', 4.5],
  ['primary link inverse hover', '#32b8a8', '#020202', 4.5],
  ['focus indicator on canvas', '#f4b942', '#020202', 3],
  ['focus indicator on raised surface', '#f4b942', '#0e0e10', 3],
  ['focus separator on action', '#020202', '#1b998b', 3],
  ['error text', '#ff929a', '#020202', 4.5],
];

for (const [name, foreground, background, minimum] of checks) {
  const ratio = contrast(foreground, background);
  if (ratio < minimum)
    throw new Error(`${name} contrast ${ratio.toFixed(2)}:1 is below ${minimum}:1`);
}

console.log(`Token checks passed (${checks.length} contrast pairs).`);
