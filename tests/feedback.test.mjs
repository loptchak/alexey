import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { loadFeedback, parseFeedback } from '../scripts/build-feedback.mjs';

const sample = '<name>Alex</name>\n<country_from>Russia</country_from>\n<lang_learning>English</lang_learning>\n<feedback>A good teacher!</feedback>';

async function directory(t) {
  const dir = await mkdtemp(path.join(tmpdir(), 'alexey-feedback-'));
  t.after(() => rm(dir, { recursive: true, force: true }));
  return dir;
}

test('minimal template, BOM, CRLF and untranslated fallback', () => {
  const review = parseFeedback('\uFEFF' + sample.replace(/\n/g, '\r\n'), '01-alex.txt');
  assert.deepEqual(review.name, { ru: 'Alex', en: 'Alex' });
  assert.deepEqual(review.full, { ru: 'A good teacher!', en: 'A good teacher!' });
  assert.equal(review.from.en, 'Russia · English');
  assert.equal(review.lang, 'en');
});

test('translations, paragraphs, literal markup and automatic excerpt', () => {
  const body = '<img src=x onerror=alert(1)> & текст\n\n' + 'Длинный отзыв '.repeat(30);
  const review = parseFeedback(sample.replace('A good teacher!', body) + '\n<name_en>Alexander</name_en><feedback_en>Great!\n\nThank you.</feedback_en><short_en>Great!</short_en>', '01-alex.txt');
  assert.equal(review.full.ru, body.trim());
  assert.equal(review.full.en, 'Great!\n\nThank you.');
  assert.equal(review.short.en, 'Great!');
  assert.equal(review.name.en, 'Alexander');
  assert.equal(review.from.en, 'Russia · English');
  assert.ok(Array.from(review.short.ru).length <= 180);
  assert.ok(review.short.ru.endsWith('…'));
});

test('optional excerpt and unknown language', () => {
  const review = parseFeedback(sample.replace('English', 'Spanish') + '<short>Brief</short>', '01-alex.txt');
  assert.equal(review.lang, '');
  assert.deepEqual(review.short, { ru: 'Brief', en: 'Brief' });
});

test('invalid fields fail with filename in the error', () => {
  for (const input of [
    sample.replace('<name>Alex</name>', ''),
    sample.replace('Alex', '  '),
    sample.replace('</feedback>', ''),
    sample + '<name>Duplicate</name>',
    sample + '<typo>Oops</typo>',
    'unexpected\n' + sample,
    sample + '\ntrailing text'
  ]) assert.throws(() => parseFeedback(input, '01-alex.txt'), /01-alex\.txt:/);
});

test('numeric order, gaps, ignored documentation and empty folder', async t => {
  const dir = await directory(t);
  assert.deepEqual(await loadFeedback(dir), []);
  await writeFile(path.join(dir, 'README.md'), 'Not a review');
  await writeFile(path.join(dir, '99-last.txt'), sample.replace('Alex', 'Last'));
  await writeFile(path.join(dir, '02-first.txt'), sample.replace('Alex', 'First'));
  assert.deepEqual((await loadFeedback(dir)).map(r => r.name.ru), ['First', 'Last']);
});

test('invalid filenames and duplicate numbers fail', async t => {
  const dir = await directory(t);
  for (const filename of ['00-alex.txt', '100-alex.txt', '1-alex.txt', '01-Алекс.txt', '01-Alex.txt', '01-alex.TXT']) {
    await writeFile(path.join(dir, filename), sample);
    await assert.rejects(loadFeedback(dir), /используйте имя/);
    await rm(path.join(dir, filename));
  }
  await writeFile(path.join(dir, '01-alex.txt'), sample);
  await writeFile(path.join(dir, '01-anna.txt'), sample);
  await assert.rejects(loadFeedback(dir), /номер 01 уже занят/);
});

test('99 reviews accepted; 100 rejected', async t => {
  const dir = await directory(t);
  for (let i = 1; i <= 99; i++) await writeFile(path.join(dir, `${String(i).padStart(2, '0')}-alex.txt`), sample);
  assert.equal((await loadFeedback(dir)).length, 99);
  await writeFile(path.join(dir, '99-extra.txt'), sample);
  await assert.rejects(loadFeedback(dir), /максимум 99/);
});
