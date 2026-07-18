import { readFileSync } from 'node:fs';

const css = readFileSync(new URL('../dist/styles.css', import.meta.url), 'utf8');
const javascript = readFileSync(new URL('../dist/index.js', import.meta.url), 'utf8');

for (const match of css.matchAll(/(?:^|[;{])(--[a-z][a-z0-9-]*):/g)) {
  const property = match[1];
  if (!property.startsWith('--rvds-') && !property.startsWith('--lightningcss-')) {
    throw new Error(`Compiled CSS contains an unnamespaced custom property: ${property}`);
  }
}

if (/_rvds-[a-z0-9_-]+_[a-z0-9]+/i.test(css) || /_rvds-[a-z0-9_-]+_[a-z0-9]+/i.test(javascript)) {
  throw new Error('Compiled output contains hashed RVDS class names.');
}

const requiredClasses = ['rvds-button', 'rvds-card', 'rvds-container', 'rvds-stack', 'rvds-cluster', 'rvds-skip-link', 'rvds-paragraph', 'rvds-heading', 'rvds-quote', 'rvds-code-block', 'rvds-divider', 'rvds-bulleted-list', 'rvds-numbered-list', 'rvds-image', 'rvds-gallery', 'rvds-video', 'rvds-generic-embed', 'rvds-youtube-embed'];
for (const className of requiredClasses) {
  if (!css.includes(`.${className}`) || !javascript.includes(className)) {
    throw new Error(`Compiled output is missing stable public class: ${className}`);
  }
}

console.log(`Distribution checks passed (${requiredClasses.length} public class blocks).`);
