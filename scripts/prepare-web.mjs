import { mkdir, copyFile, access } from 'node:fs/promises';
import { constants } from 'node:fs';
import { resolve } from 'node:path';

const root = process.cwd();
const output = resolve(root, 'www');
await mkdir(output, { recursive: true });

const files = [
  'index.html',
  'manifest.webmanifest',
  'sw.js',
  'icon-192.png',
  'icon-512.png',
  'apple-touch-icon.png'
];

for (const file of files) {
  const source = resolve(root, file);
  try {
    await access(source, constants.R_OK);
  } catch {
    throw new Error(`Required app file is missing: ${file}`);
  }
  await copyFile(source, resolve(output, file));
}

console.log('Copied the existing coloring app into www/ for Capacitor.');
