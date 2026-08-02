#!/usr/bin/env node

import { readFileSync, readdirSync } from 'node:fs';
import { dirname, extname, join, relative, resolve } from 'node:path';

const root = resolve('.');
const srcRoot = join(root, 'src');
const extensions = ['.ts', '.tsx', '.css'];

function filesUnder(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? filesUnder(path) : [path];
  });
}

function resolveImport(from, specifier) {
  if (!specifier.startsWith('.')) return undefined;
  const base = resolve(dirname(from), specifier);
  return [
    base,
    ...extensions.map((extension) => `${base}${extension}`),
    ...extensions.map((extension) => join(base, `index${extension}`)),
  ].find((candidate) => allFiles.has(candidate));
}

const allFiles = new Set(filesUnder(srcRoot));
const productionFiles = [...allFiles].filter(
  (path) =>
    extensions.includes(extname(path)) &&
    !path.includes('/stories/') &&
    !/\.(?:test|stories)\.tsx?$/.test(path) &&
    !path.endsWith('styles.d.ts'),
);
const reached = new Set();

function visit(path) {
  if (reached.has(path)) return;
  reached.add(path);
  const source = readFileSync(path, 'utf8');
  for (const match of source.matchAll(/(?:from\s*|import\s*)["']([^"']+)["']/g)) {
    const dependency = resolveImport(path, match[1]);
    if (dependency) visit(dependency);
  }
}

visit(join(srcRoot, 'index.ts'));
const orphaned = productionFiles.filter((path) => !reached.has(path));

const packageData = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'));
const runtimeSource = [...reached]
  .filter((path) => /\.[jt]sx?$/.test(path))
  .map((path) => readFileSync(path, 'utf8'))
  .join('\n');
const unusedDependencies = Object.keys(packageData.dependencies ?? {}).filter(
  (dependency) =>
    !runtimeSource.includes(`'${dependency}`) && !runtimeSource.includes(`"${dependency}`),
);

const tokenSource = readFileSync(join(srcRoot, 'tokens/tokens.css'), 'utf8');
const cssSource = [...reached]
  .filter((path) => path.endsWith('.css'))
  .map((path) => readFileSync(path, 'utf8'))
  .join('\n');
const definedTokens = [...tokenSource.matchAll(/(--rvds-[\w-]+)\s*:/g)].map((match) => match[1]);
const intentionalFoundations = new Set([
  '--rvds-color-success',
  '--rvds-font-weight-regular',
  '--rvds-space-8',
]);
const unusedTokens = definedTokens.filter((token) => {
  const occurrences = cssSource.split(token).length - 1;
  return occurrences === 1 && !intentionalFoundations.has(token);
});

const failures = [
  ...orphaned.map((path) => `unreachable production file: ${relative(root, path)}`),
  ...unusedDependencies.map((dependency) => `unused runtime dependency: ${dependency}`),
  ...unusedTokens.map((token) => `unjustified unused public token: ${token}`),
];

if (failures.length) {
  console.error('RVDS source audit failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exitCode = 1;
} else {
  console.log(
    `RVDS source audit passed (${productionFiles.length} production files reachable, ${Object.keys(packageData.dependencies ?? {}).length} runtime dependencies used, ${definedTokens.length} tokens reviewed, ${intentionalFoundations.size} unused foundations retained intentionally).`,
  );
}
