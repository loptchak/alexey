import { cp, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildFeedback } from './build-feedback.mjs';

export async function buildSite(root) {
  const output = path.join(root, '_site');
  const reviews = await buildFeedback(root);
  await mkdir(output, { recursive: true });
  for (const entry of ['index.html', 'favicon.svg', '.nojekyll', 'css', 'img', 'js']) {
    await cp(path.join(root, entry), path.join(output, entry), { recursive: true });
  }
  return { output, reviewCount: reviews.length };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const root = fileURLToPath(new URL('../', import.meta.url));
    const { reviewCount } = await buildSite(root);
    console.log(`Сайт собран в _site; отзывов: ${reviewCount}/99.`);
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
