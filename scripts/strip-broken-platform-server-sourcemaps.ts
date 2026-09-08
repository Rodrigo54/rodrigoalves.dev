import fs from 'node:fs/promises';
import path from 'node:path';

const FESM_DIR = './node_modules/@angular/platform-server/fesm2022';

/**
 * @angular/platform-server ships fesm2022 sourcemaps whose "sources" entries
 * contain full file content instead of file paths (missing "sourcesContent"
 * entirely) — an upstream packaging defect, not something a real source file
 * could recover. Vite's dev server tries to read each of these bogus "paths"
 * on every SSR request and fails, printing a warning per entry. Since the
 * data is corrupt beyond use, we drop the sourceMappingURL reference instead
 * of leaving Vite to repeatedly fail against it.
 */
export async function stripBrokenPlatformServerSourcemaps(): Promise<void> {
  let entries: string[];
  try {
    entries = await fs.readdir(FESM_DIR);
  } catch {
    return;
  }

  for (const entry of entries.filter(name => name.endsWith('.mjs'))) {
    const jsPath = path.join(FESM_DIR, entry);
    const mapPath = `${jsPath}.map`;

    const map = await readJson(mapPath);
    if (!map || !isCorrupted(map)) continue;

    const js = await fs.readFile(jsPath, 'utf8');
    const withoutSourceMappingUrl = js.replace(/\n\/\/# sourceMappingURL=.*\n?$/, '\n');
    await fs.writeFile(jsPath, withoutSourceMappingUrl);
    await fs.rm(mapPath);
  }
}

async function readJson(filePath: string): Promise<{ sources?: unknown[] } | null> {
  try {
    return JSON.parse(await fs.readFile(filePath, 'utf8'));
  } catch {
    return null;
  }
}

function isCorrupted(map: { sources?: unknown[] }): boolean {
  return (map.sources ?? []).some(source => typeof source === 'string' && source.includes('\n'));
}
