import frontmatter, { GrayMatterFile } from 'gray-matter';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const targetDirectory = './src/content'; // Diretório onde estão os arquivos markdown

async function isValidDirectory(dir: string): Promise<boolean> {
  try {
    const stats = await fs.stat(dir);
    return stats.isDirectory();
  } catch {
    return false;
  }
}

function countWords(text: string): number {
  // Remove front matter para não contar no texto
  const content = text.replace(/^---[\s\S]*?---/, '');
  const words = content.match(/\b\w+\b/g);
  return words ? words.length : 0;
}

function getReadingTime(wordCount: number): number {
  // Considera 200 palavras por minuto como média de leitura
  return Math.max(1, Math.round(wordCount / 200));
}

function saveFrontMatter(matter: GrayMatterFile<string>, readingTime: number, wordCount: number): string {
  // Atualiza ou adiciona o campo timeToRead
  matter.data['timeToRead'] = {
    minutes: readingTime,
    words: wordCount,
  };
  return frontmatter.stringify(matter.content, matter.data);
}

async function processFile(file: string): Promise<void> {
  const checkFile = file.endsWith('.md') || file.endsWith('.mdx');
  if (checkFile) {
    const filePath = path.join(targetDirectory, file);
    const matter = frontmatter.read(filePath);
    const wordCount = countWords(matter.content);
    const readingTime = getReadingTime(wordCount);
    const content = saveFrontMatter(matter, readingTime, wordCount);
    await fs.writeFile(filePath, content, 'utf-8');
    console.log(`${file}: ~${readingTime} min(s) de leitura, ${wordCount} palavras`);
  } else {
    console.log(`Ignorando arquivo não markdown: ${file}`);
  }
}

export async function processReadTimes() {
  if (!(await isValidDirectory(targetDirectory))) {
    console.error(`Diretório inválido: ${targetDirectory}`);
    return;
  }

  const files = await fs.readdir(targetDirectory);
  for (const file of files) {
    await processFile(file);
  }
}

// Para rodar diretamente via node scripts/reading-time.ts
const isRunningDirectly = fileURLToPath(import.meta.url) === path.resolve(process.argv[1]);
if (isRunningDirectly) {
  processReadTimes();
}
