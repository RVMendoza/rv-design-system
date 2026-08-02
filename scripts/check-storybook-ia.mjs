#!/usr/bin/env node

import { readFileSync, readdirSync } from 'node:fs';
import { join, resolve } from 'node:path';

const root = resolve('.');
const storiesDirectory = join(root, 'src/stories');
const files = readdirSync(storiesDirectory)
  .filter((file) => file.endsWith('.stories.tsx'))
  .sort();
const allowedCategories = ['Foundations', 'Components', 'Editorial', 'Patterns', 'Examples'];
const titles = new Map();
const failures = [];
let storyCount = 0;

for (const file of files) {
  const source = readFileSync(join(storiesDirectory, file), 'utf8');
  const title = [...source.matchAll(/title:\s*['"]([^'"]+)['"]/g)]
    .map((match) => match[1])
    .find((candidate) =>
      allowedCategories.some((category) => candidate.startsWith(`${category}/`)),
    );
  if (!title) {
    failures.push(`${file}: missing an explicit Storybook title`);
    continue;
  }
  const category = title.split('/')[0];
  if (!allowedCategories.includes(category))
    failures.push(`${file}: unsupported top-level category ${category}`);
  if (titles.has(title)) failures.push(`${file}: duplicates ${title} from ${titles.get(title)}`);
  titles.set(title, file);
  const stories = [...source.matchAll(/^export const\s+\w+/gm)].length;
  storyCount += stories;
  if (stories === 0) failures.push(`${file}: contains no stories`);
  if (stories > 6)
    failures.push(`${file}: ${stories} stories obscure the focused component contract`);
}

for (const category of allowedCategories) {
  if (![...titles].some(([title]) => title.startsWith(`${category}/`)))
    failures.push(`missing ${category} category`);
}

const main = readFileSync(join(root, '.storybook/main.ts'), 'utf8');
const preview = readFileSync(join(root, '.storybook/preview.ts'), 'utf8');
if (!main.includes('autodocs: true')) failures.push('autodocs must cover every story module');
for (const category of allowedCategories) {
  if (!preview.includes(`'${category}'`)) failures.push(`storySort is missing ${category}`);
}

if (failures.length) {
  console.error('Storybook information architecture checks failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exitCode = 1;
} else {
  console.log(
    `Storybook IA checks passed (${files.length} modules, ${storyCount} focused stories, ${allowedCategories.length} categories).`,
  );
}
