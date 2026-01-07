#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const zlib = require('zlib');

const DIST_DIR = 'dist';
const COMPONENTS_DIR = 'components';

// Remove CSS comments from string (/* ... */ style comments)
function stripCSSComments(code) {
  // Match CSS inside template literals (const styles = `...`)
  return code.replace(/(const styles = `)([\s\S]*?)(`)/g, (match, start, css, end) => {
    // Remove /* ... */ comments but preserve content
    const stripped = css
      .replace(/\/\*[\s\S]*?\*\//g, '') // Remove block comments
      .replace(/\n\s*\n/g, '\n')        // Remove empty lines
      .replace(/^\s+/gm, '')            // Remove leading whitespace per line
      .replace(/\s+$/gm, '');           // Remove trailing whitespace per line
    return start + stripped + end;
  });
}

// Ensure dist directory exists
if (!fs.existsSync(DIST_DIR)) {
  fs.mkdirSync(DIST_DIR);
}

// Get all component files sorted, excluding ux-core.js
const componentFiles = fs.readdirSync(COMPONENTS_DIR)
  .filter(f => f.startsWith('ux-') && f.endsWith('.js') && f !== 'ux-core.js')
  .sort()
  .map(f => path.join(COMPONENTS_DIR, f));

console.log('Building ux-all.js...');
const allContent = componentFiles.map(f => fs.readFileSync(f, 'utf8')).join('\n');
fs.writeFileSync(path.join(DIST_DIR, 'ux-all.js'), allContent);

console.log('Copying ux-core.js...');
const coreContent = fs.readFileSync(path.join(COMPONENTS_DIR, 'ux-core.js'), 'utf8');
fs.writeFileSync(path.join(DIST_DIR, 'ux-core.js'), coreContent);

console.log('Building ux.js...');
fs.writeFileSync(path.join(DIST_DIR, 'ux.js'), coreContent + '\n' + allContent);

console.log('Stripping CSS comments for minified versions...');
const allStripped = stripCSSComments(allContent);
const coreStripped = stripCSSComments(coreContent);
fs.writeFileSync(path.join(DIST_DIR, 'ux-all.stripped.js'), allStripped);
fs.writeFileSync(path.join(DIST_DIR, 'ux-core.stripped.js'), coreStripped);
fs.writeFileSync(path.join(DIST_DIR, 'ux.stripped.js'), coreStripped + '\n' + allStripped);

console.log('Compressing files with terser...');
try {
  execSync(`terser ${DIST_DIR}/ux-all.stripped.js -o ${DIST_DIR}/ux-all.min.js --compress --mangle`, { stdio: 'inherit' });
  execSync(`terser ${DIST_DIR}/ux-core.stripped.js -o ${DIST_DIR}/ux-core.min.js --compress --mangle`, { stdio: 'inherit' });
  execSync(`terser ${DIST_DIR}/ux.stripped.js -o ${DIST_DIR}/ux.min.js --compress --mangle`, { stdio: 'inherit' });

  // Clean up temporary stripped files
  fs.unlinkSync(path.join(DIST_DIR, 'ux-all.stripped.js'));
  fs.unlinkSync(path.join(DIST_DIR, 'ux-core.stripped.js'));
  fs.unlinkSync(path.join(DIST_DIR, 'ux.stripped.js'));
} catch (e) {
  console.error('Error: terser not found. Install with: npm install -g terser');
  process.exit(1);
}

// Format file size
function formatSize(bytes) {
  if (bytes >= 1048576) return (bytes / 1048576).toFixed(1) + 'M';
  if (bytes >= 1024) return (bytes / 1024).toFixed(1) + 'K';
  return bytes + 'B';
}

// Get gzipped size
function gzipSize(filePath) {
  const content = fs.readFileSync(filePath);
  return zlib.gzipSync(content).length;
}

console.log('\nBuild complete!\n');
console.log('File'.padEnd(20) + 'Original'.padStart(10) + 'Minified'.padStart(10) + 'Gzipped'.padStart(10));
console.log('----'.padEnd(20) + '--------'.padStart(10) + '--------'.padStart(10) + '-------'.padStart(10));

['ux-core', 'ux-all', 'ux'].forEach(name => {
  const orig = fs.statSync(path.join(DIST_DIR, `${name}.js`)).size;
  const mini = fs.statSync(path.join(DIST_DIR, `${name}.min.js`)).size;
  const gzip = gzipSize(path.join(DIST_DIR, `${name}.min.js`));

  console.log(
    `${name}.js`.padEnd(20) +
    formatSize(orig).padStart(10) +
    formatSize(mini).padStart(10) +
    formatSize(gzip).padStart(10)
  );
});

console.log(`\nFiles are in the '${DIST_DIR}' directory.`);
