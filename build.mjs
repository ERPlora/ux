#!/usr/bin/env node
/**
 * ERPlora UX · build script
 * Concatena los CSS en orden y produce dist/erplora-ux.css + .min.css
 *
 * Uso:
 *   node build.mjs            # build normal
 *   node build.mjs --watch    # rebuild en cambios
 *
 * Dependencia opcional para minify de calidad (recomendado):
 *   npm i -D lightningcss-cli
 *   npx lightningcss --minify dist/erplora-ux.css -o dist/erplora-ux.min.css
 *
 * Sin lightningcss el script hace un minify naive (suficiente para CDN).
 */

import { readFile, writeFile, mkdir, watch } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve('.');
const SRC = path.join(ROOT, 'lib', 'css');
const DIST = path.join(ROOT, 'dist');

const ORDER = [
  'tokens.css',
  'base.css',
  'utilities.css',
  // Layout
  'components/app-shell.css',
  'components/sidebar.css',
  'components/topbar.css',
  'components/tab-bar.css',
  'components/menu-btn.css',
  'components/page.css',
  // Atomics
  'components/button.css',
  'components/badge.css',
  'components/avatar.css',
  // Surfaces
  'components/card.css',
  // Forms
  'components/forms.css',
  // Data
  'components/table.css',
  // Navigation
  'components/navigation.css',
  // Overlays + feedback
  'components/overlays.css',
  'components/inline-feedback.css',
  'components/progress.css',
  // Forms ext + pickers + feedback ext + cmdk
  'components/forms-extra.css',
  'components/pickers.css',
  'components/feedback-extra.css',
  'components/cmdk.css',
  // Workflow
  'components/kanban.css',
  'components/calendar.css',
  'components/chat.css',
  'components/timeline.css',
  'components/charts.css',
  // Verticales
  'components/manufacturing.css',
  'components/hr.css',
  'components/multimedia.css',
  'components/forms-advanced.css',
  'components/commerce.css',
  'components/mobile.css',
  'components/system-overlays.css',
  'components/states.css',
  'components/pos.css',
  // v2.1 modules
  'components/actions-extra.css',
  'components/selection.css',
  'components/forms-inputs.css',
  'components/data-extra.css',
  'components/layout-extra.css',
  'components/editors.css',
];

const BANNER = `/*!
 * ERPlora UX · v2.0.0
 * CSS-only component library — no Tailwind, no build for consumers
 * https://github.com/ERPlora/ux
 * MIT License
 */
`;

async function build() {
  if (!existsSync(DIST)) await mkdir(DIST, { recursive: true });
  let out = BANNER;
  let count = 0;
  for (const rel of ORDER) {
    const full = path.join(SRC, rel);
    if (!existsSync(full)) {
      console.warn('skip missing:', rel);
      continue;
    }
    const css = await readFile(full, 'utf8');
    out += `\n/* ===== ${rel} ===== */\n` + css + '\n';
    count++;
  }
  await writeFile(path.join(DIST, 'erplora-ux.css'), out);
  // Naive minify
  let min = out
    .replace(/\/\*(?!!)[\s\S]*?\*\//g, '')
    .replace(/\s+/g, ' ')
    .replace(/\s*([{};:,>+~])\s*/g, '$1')
    .replace(/;}/g, '}')
    .trim();
  min = BANNER.trim() + min;
  await writeFile(path.join(DIST, 'erplora-ux.min.css'), min);
  console.log(`✔ built · ${count} files · ${(out.length / 1024).toFixed(1)} KB → ${(min.length / 1024).toFixed(1)} KB min`);
}

await build();

if (process.argv.includes('--watch')) {
  console.log('watching lib/css for changes…');
  const watcher = watch(SRC, { recursive: true });
  for await (const _ of watcher) {
    try { await build(); } catch (e) { console.error(e); }
  }
}
