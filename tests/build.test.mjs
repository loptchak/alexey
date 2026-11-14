import test from 'node:test';
import assert from 'node:assert/strict';
import { cp, mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { buildFeedback } from '../scripts/build-feedback.mjs';
import { buildSite } from '../scripts/build-site.mjs';
import ru from '../js/locales/ru.js';
import en from '../js/locales/en.js';

const repository = fileURLToPath(new URL('../', import.meta.url));

async function fixture(t) {
  const root = await mkdtemp(path.join(tmpdir(), 'alexey-build-'));
  t.after(() => rm(root, { recursive: true, force: true }));
  return root;
}

test('feedback generation exports data without overwriting review UI code', async (t) => {
  const root = await fixture(t);
  await mkdir(path.join(root, 'feedback'));
  await mkdir(path.join(root, 'js'));
  const ui = 'export const marker = "Review UI stays intact";';
  await writeFile(path.join(root, 'js/reviews.js'), ui);
  await writeFile(
    path.join(root, 'feedback/01-alex.txt'),
    '<name>Alex</name><country_from>Russia</country_from><lang_learning>English</lang_learning>' +
      '<feedback>Literal <img src=x onerror=alert(1)> & text.</feedback>'
  );

  const reviews = await buildFeedback(root);
  const generated = path.join(root, 'js/generated/reviews.js');
  const source = await readFile(generated, 'utf8');
  assert.ok(!source.includes('<img'));
  assert.deepEqual((await import(pathToFileURL(generated))).default, reviews);
  assert.equal(await readFile(path.join(root, 'js/reviews.js'), 'utf8'), ui);
});

test('clean build includes every linked asset and transitive JavaScript import', async (t) => {
  const root = await fixture(t);
  for (const entry of ['index.html', 'favicon.svg', '.nojekyll', 'css', 'img', 'js', 'feedback']) {
    await cp(path.join(repository, entry), path.join(root, entry), {
      recursive: true,
      filter: (source) => path.basename(source) !== 'generated'
    });
  }

  const { output, reviewCount } = await buildSite(root);
  const html = await readFile(path.join(output, 'index.html'), 'utf8');
  const visited = new Set();
  async function checkAsset(filename) {
    if (visited.has(filename)) return;
    visited.add(filename);
    const source = await readFile(filename, 'utf8');
    if (path.extname(filename) !== '.js') return;
    for (const match of source.matchAll(/\bfrom\s+['"]([^'"]+)['"]/g)) {
      await checkAsset(path.resolve(path.dirname(filename), match[1]));
    }
  }

  for (const match of html.matchAll(/\b(?:src|href)="([^"#]+)"/g)) {
    if (/^[a-z]+:/i.test(match[1])) continue;
    await checkAsset(path.join(output, match[1]));
  }
  const reviews = (await import(pathToFileURL(path.join(output, 'js/generated/reviews.js'))))
    .default;
  assert.equal(reviews.length, reviewCount);
  assert.ok(reviewCount > 0);
  assert.ok(visited.has(path.join(output, 'js/generated/reviews.js')));
});

test('language dictionaries have matching keys and cover translated HTML', async () => {
  assert.deepEqual(Object.keys(ru).sort(), Object.keys(en).sort());
  const html = await readFile(path.join(repository, 'index.html'), 'utf8');
  for (const match of html.matchAll(/\bdata-i18n(?:-label)?="([^"]+)"/g)) {
    assert.equal(typeof ru[match[1]], 'string', `Missing Russian key: ${match[1]}`);
    assert.equal(typeof en[match[1]], 'string', `Missing English key: ${match[1]}`);
  }
});
