import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(scriptDir, '..');
const catalogPath = path.join(rootDir, 'data', 'plugins.json');
const readmePath = path.join(rootDir, 'README.md');

const errors = [];
const fail = (message) => errors.push(message);

let catalog;
try {
  catalog = JSON.parse(await readFile(catalogPath, 'utf8'));
} catch (error) {
  console.error(`Cannot parse ${catalogPath}: ${error.message}`);
  process.exit(1);
}

const readme = await readFile(readmePath, 'utf8');
const requiredTopLevel = ['schema_version', 'title', 'as_of', 'metrics_source', 'plugins'];
for (const key of requiredTopLevel) {
  if (!(key in catalog)) fail(`Missing top-level field: ${key}`);
}

if (catalog.schema_version !== 1) fail('schema_version must be 1');
if (!/^\d{4}-\d{2}-\d{2}$/.test(catalog.as_of ?? '')) fail('as_of must use YYYY-MM-DD');
if (!Array.isArray(catalog.plugins) || catalog.plugins.length === 0) fail('plugins must be a non-empty array');

const ids = new Set();
const repositories = new Set();
const allowedTiers = new Set(['popular', 'rising']);
let previousTierRank = 0;
let previousStars = Number.POSITIVE_INFINITY;

for (const [index, plugin] of (catalog.plugins ?? []).entries()) {
  const prefix = `plugins[${index}]${plugin?.id ? ` (${plugin.id})` : ''}`;
  const required = [
    'id', 'name', 'repository', 'url', 'tier', 'type', 'categories', 'function',
    'audiences', 'install', 'tip', 'caveats', 'license', 'metrics', 'verified_sources'
  ];

  for (const key of required) {
    if (!(key in (plugin ?? {}))) fail(`${prefix}: missing ${key}`);
  }

  if (!/^[a-z0-9][a-z0-9-]*$/.test(plugin.id ?? '')) fail(`${prefix}: invalid id`);
  if (ids.has(plugin.id)) fail(`${prefix}: duplicate id`);
  ids.add(plugin.id);

  if (!/^[^/]+\/[^/]+$/.test(plugin.repository ?? '')) fail(`${prefix}: repository must be owner/name`);
  if (repositories.has(plugin.repository)) fail(`${prefix}: duplicate repository`);
  repositories.add(plugin.repository);

  const expectedUrl = `https://github.com/${plugin.repository}`;
  if (plugin.url !== expectedUrl) fail(`${prefix}: url must equal ${expectedUrl}`);
  if (!readme.includes(expectedUrl)) fail(`${prefix}: README is missing the repository link`);

  if (!allowedTiers.has(plugin.tier)) fail(`${prefix}: tier must be popular or rising`);
  if (!Array.isArray(plugin.categories) || plugin.categories.length === 0) fail(`${prefix}: categories must be non-empty`);
  if (!Array.isArray(plugin.audiences) || plugin.audiences.length === 0) fail(`${prefix}: audiences must be non-empty`);
  if (!Array.isArray(plugin.caveats) || plugin.caveats.length === 0) fail(`${prefix}: caveats must be non-empty`);
  if (!Array.isArray(plugin.verified_sources) || plugin.verified_sources.length < 2) fail(`${prefix}: at least two verification sources are required`);
  if (typeof plugin.function !== 'string' || plugin.function.length < 30) fail(`${prefix}: function is too short`);
  if (typeof plugin.tip !== 'string' || plugin.tip.length < 30) fail(`${prefix}: tip is too short`);

  if (!plugin.install || typeof plugin.install !== 'object') {
    fail(`${prefix}: install must be an object`);
  } else {
    for (const key of ['command', 'profile', 'pinned', 'source']) {
      if (!(key in plugin.install)) fail(`${prefix}: install is missing ${key}`);
    }
    if (typeof plugin.install.pinned !== 'boolean') fail(`${prefix}: install.pinned must be boolean`);
  }

  if (!plugin.metrics || typeof plugin.metrics !== 'object') {
    fail(`${prefix}: metrics must be an object`);
  } else {
    for (const key of ['stars', 'forks', 'created_at', 'pushed_at']) {
      if (!(key in plugin.metrics)) fail(`${prefix}: metrics is missing ${key}`);
    }
    if (!Number.isInteger(plugin.metrics.stars) || plugin.metrics.stars < 0) fail(`${prefix}: stars must be a non-negative integer`);
    if (!Number.isInteger(plugin.metrics.forks) || plugin.metrics.forks < 0) fail(`${prefix}: forks must be a non-negative integer`);
    if (Number.isNaN(Date.parse(plugin.metrics.created_at))) fail(`${prefix}: invalid created_at`);
    if (Number.isNaN(Date.parse(plugin.metrics.pushed_at))) fail(`${prefix}: invalid pushed_at`);
  }

  if (plugin.tier === 'popular' && plugin.metrics?.stars < 100) {
    fail(`${prefix}: popular entries require at least 100 snapshot stars`);
  }
  if (plugin.tier === 'rising' && plugin.metrics?.stars >= 100) {
    fail(`${prefix}: entries with 100+ snapshot stars belong in popular`);
  }

  const tierRank = plugin.tier === 'popular' ? 0 : 1;
  if (tierRank < previousTierRank) fail(`${prefix}: tiers must be grouped popular before rising`);
  if (tierRank === previousTierRank && plugin.metrics?.stars > previousStars) {
    fail(`${prefix}: entries within a tier must be sorted by snapshot stars descending`);
  }
  if (tierRank !== previousTierRank) previousStars = Number.POSITIVE_INFINITY;
  previousTierRank = tierRank;
  previousStars = plugin.metrics?.stars ?? previousStars;
}

if (errors.length > 0) {
  console.error(`Catalog validation failed with ${errors.length} error(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Catalog OK: ${catalog.plugins.length} entries, verified ${catalog.as_of}.`);

