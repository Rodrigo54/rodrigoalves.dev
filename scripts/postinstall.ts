import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { processImages } from 'scripts/process-unsplash-imgs';
import { processReadTimes } from 'scripts/reading-time';

async function main() {
  await processReadTimes();
  await processImages();
}

const isRunningDirectly = fileURLToPath(import.meta.url) === path.resolve(process.argv[1]);

if (isRunningDirectly) {
  console.log('✅ Iniciando processamento de scripts...');
  main().catch(error => {
    console.error('❌ Erro ao processar os scripts:', error);
    process.exit(1);
  });
}
