import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { processImages } from './process-unsplash-imgs';
import { processReadTimes } from './reading-time';
import { stripBrokenPlatformServerSourcemaps } from './strip-broken-platform-server-sourcemaps';

async function main() {
  await processReadTimes();
  await processImages();
  await stripBrokenPlatformServerSourcemaps();
}

const isRunningDirectly = fileURLToPath(import.meta.url) === path.resolve(process.argv[1]);

if (isRunningDirectly) {
  console.log('✅ Iniciando processamento de scripts...');
  main().catch(error => {
    console.error('❌ Erro ao processar os scripts:', error);
    process.exit(1);
  });
}
