import { cp, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildFeedback } from './build-feedback.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const output = path.join(root, '_site');
try {
  const reviews = await buildFeedback(root);
  await mkdir(output, { recursive: true });
  for (const entry of ['index.html', 'favicon.svg', '.nojekyll', 'css', 'img', 'js']) {
    await cp(path.join(root, entry), path.join(output, entry), { recursive: true });
  }
  console.log(`Сайт собран в _site; отзывов: ${reviews.length}/99.`);
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
