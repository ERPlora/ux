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

import { readFile, writeFile, mkdir, watch, readdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve('.');
const SRC = path.join(ROOT, 'lib', 'css');
const TEMPLATES_SRC = path.join(ROOT, 'lib', 'templates');
const DIST = path.join(ROOT, 'dist');
const DIST_TEMPLATES = path.join(DIST, 'templates');

const TEMPLATES = ['corporate', 'minimal', 'forest', 'ocean', 'violet'];

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
 * ERPlora UX · v2.1.0
 * CSS-only component library — no Tailwind, no build for consumers
 * https://github.com/ERPlora/ux
 * MIT License
 */
`;

function naiveMinify(css) {
  return css
    .replace(/\/\*(?!!)[\s\S]*?\*\//g, '')
    .replace(/\s+/g, ' ')
    .replace(/\s*([{};:,>+~])\s*/g, '$1')
    .replace(/;}/g, '}')
    .trim();
}

async function build() {
  if (!existsSync(DIST)) await mkdir(DIST, { recursive: true });
  if (!existsSync(DIST_TEMPLATES)) await mkdir(DIST_TEMPLATES, { recursive: true });

  // ----- Main bundle -----
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
  await writeFile(path.join(DIST, 'erplora-ux.min.css'), BANNER.trim() + naiveMinify(out));
  console.log(`✔ bundle · ${count} files · ${(out.length / 1024).toFixed(1)} KB → ${(naiveMinify(out).length / 1024).toFixed(1)} KB min`);

  // ----- Templates (one min.css per template + an all.min.css) -----
  if (existsSync(TEMPLATES_SRC)) {
    let allOut = '';
    let tCount = 0;
    for (const name of TEMPLATES) {
      const full = path.join(TEMPLATES_SRC, `${name}.css`);
      if (!existsSync(full)) {
        console.warn('skip missing template:', name);
        continue;
      }
      const css = await readFile(full, 'utf8');
      const min = naiveMinify(css);
      await writeFile(path.join(DIST_TEMPLATES, `${name}.css`), css);
      await writeFile(path.join(DIST_TEMPLATES, `${name}.min.css`), min);
      allOut += `/* ===== ${name} ===== */\n` + css + '\n';
      tCount++;
    }
    if (tCount > 0) {
      await writeFile(path.join(DIST_TEMPLATES, 'all.css'), allOut);
      await writeFile(path.join(DIST_TEMPLATES, 'all.min.css'), naiveMinify(allOut));
      console.log(`✔ templates · ${tCount} themes · ${(allOut.length / 1024).toFixed(1)} KB → ${(naiveMinify(allOut).length / 1024).toFixed(1)} KB min (all)`);
    }
  }
}

await build();

if (process.argv.includes('--watch')) {
  console.log('watching lib/ for changes…');
  const watcher = watch(path.join(ROOT, 'lib'), { recursive: true });
  for await (const _ of watcher) {
    try { await build(); } catch (e) { console.error(e); }
  }
}
