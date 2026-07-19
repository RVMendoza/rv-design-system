import { readFileSync } from 'node:fs';

const css = readFileSync(new URL('../dist/styles.css', import.meta.url), 'utf8');
const javascript = readFileSync(new URL('../dist/index.js', import.meta.url), 'utf8');
const declarations = readFileSync(new URL('../dist/index.d.ts', import.meta.url), 'utf8');

for (const match of css.matchAll(/(?:^|[;{])(--[a-z][a-z0-9-]*):/g)) {
  const property = match[1];
  if (!property.startsWith('--rvds-') && !property.startsWith('--lightningcss-')) {
    throw new Error(`Compiled CSS contains an unnamespaced custom property: ${property}`);
  }
}

if (/_rvds-[a-z0-9_-]+_[a-z0-9]+/i.test(css) || /_rvds-[a-z0-9_-]+_[a-z0-9]+/i.test(javascript)) {
  throw new Error('Compiled output contains hashed RVDS class names.');
}

const requiredClasses = [
  'rvds-button',
  'rvds-card',
  'rvds-container',
  'rvds-stack',
  'rvds-cluster',
  'rvds-skip-link',
  'rvds-paragraph',
  'rvds-heading',
  'rvds-quote',
  'rvds-code-block',
  'rvds-divider',
  'rvds-bulleted-list',
  'rvds-numbered-list',
  'rvds-image',
  'rvds-gallery',
  'rvds-video',
  'rvds-generic-embed',
  'rvds-youtube-embed',
  'rvds-article-list',
  'rvds-article-preview',
  'rvds-article-header',
  'rvds-social-links',
  'rvds-brand-logo-list',
  'rvds-brand-logo',
];
for (const className of requiredClasses) {
  if (!css.includes(`.${className}`) || !javascript.includes(className)) {
    throw new Error(`Compiled output is missing stable public class: ${className}`);
  }
}

if (
  !css.includes(
    'html{background:var(--rvds-color-background);color:var(--rvds-color-text);font-family:var(--rvds-font-family-body)',
  )
) {
  throw new Error('Compiled CSS is missing authoritative RVDS root typography and canvas.');
}
if (!css.includes('button,input,select,textarea{color:inherit;font:inherit}')) {
  throw new Error('Compiled CSS must make native controls inherit RVDS typography.');
}
for (const mapping of [
  '--rvds-color-action:var(--rvds-color-verdigris)',
  '--rvds-color-action-hover:var(--rvds-color-verdigris-hover)',
  '--rvds-color-link:var(--rvds-color-sunflower-gold)',
  '--rvds-color-focus:var(--rvds-color-sunflower-gold)',
]) {
  if (!css.includes(mapping))
    throw new Error(`Compiled CSS has the wrong semantic color mapping: ${mapping}`);
}
if (/Georgia|Times New Roman|(?:^|[,\s])serif(?:[,;\s]|$)/i.test(css)) {
  throw new Error('Compiled CSS contains a forbidden serif font declaration.');
}

for (const exportName of ['YoutubeEmbed', 'YoutubeEmbedProps', 'TiktokEmbed']) {
  if (!declarations.includes(exportName))
    throw new Error(`Declarations are missing renamed export: ${exportName}`);
}
for (const removedName of ['YouTubeEmbed', 'YouTubeEmbedProps', 'TikTokEmbed']) {
  if (declarations.includes(removedName))
    throw new Error(`Declarations contain removed export: ${removedName}`);
}

console.log(`Distribution checks passed (${requiredClasses.length} public class blocks).`);
