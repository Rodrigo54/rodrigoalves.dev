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
  let content = text.replace(/^---[\s\S]*?---/, '');

  // Remove syntax markdown para contagem mais precisa
  content = content
    .replace(/```[\s\S]*?```/g, '') // Remove code blocks
    .replace(/`[^`]*`/g, '') // Remove inline code
    .replace(/!\[.*?\]\(.*?\)/g, '') // Remove images
    .replace(/\[.*?\]\(.*?\)/g, '') // Remove links, mantendo apenas o texto
    .replace(/#{1,6}\s/g, '') // Remove headers markdown
    .replace(/[*_]{1,2}([^*_]+)[*_]{1,2}/g, '$1') // Remove bold/italic mantendo o texto
    .replace(/^\s*[-*+]\s/gm, '') // Remove bullet points
    .replace(/^\s*\d+\.\s/gm, '') // Remove numbered lists
    .replace(/\n/g, ' '); // Replace newlines with spaces

  const words = content.match(/\b\w+\b/g);
  return words ? words.length : 0;
}

function getReadingTime(wordCount: number): number {
  // Considera 200 palavras por minuto como média de leitura
  return Math.max(1, Math.round(wordCount / 200));
}

function cleanFrontMatter(frontMatterContent: string): string {
  let cleaned = frontMatterContent;

  // PASSO 1: Remove TODOS os blocos timeToRead (completos ou não)
  // Captura: timeToRead: seguido de qualquer coisa até encontrar uma nova propriedade de nível raiz ou fim
  cleaned = cleaned.replace(/^timeToRead:.*?(?=\n[a-zA-Z]|\n*$)/gms, '');

  // PASSO 2: Remove propriedades órfãs (words e minutes no nível raiz)
  // Apenas no início da linha (nível raiz, não indentado)
  cleaned = cleaned.replace(/^(words|minutes):\s*\d+\s*$/gm, '');

  // PASSO 3: Remove propriedades órfãs indentadas que podem ter sobrado
  cleaned = cleaned.replace(/^\s+(words|minutes):\s*\d+\s*$/gm, '');

  // PASSO 4: Remove linhas vazias múltiplas (3 ou mais quebras consecutivas)
  cleaned = cleaned.replace(/(\r?\n){3,}/g, '\n\n');

  // PASSO 5: Remove espaços em branco no final das linhas
  cleaned = cleaned.replace(/[ \t]+$/gm, '');

  // PASSO 6: Remove espaços em branco no início e final do conteúdo
  cleaned = cleaned.trim();

  return cleaned;
}

async function processFile(file: string): Promise<void> {
  const checkFile = file.endsWith('.md') || file.endsWith('.mdx');
  if (!checkFile) {
    console.log(`Ignorando arquivo não markdown: ${file}`);
    return;
  }

  const filePath = path.join(targetDirectory, file);

  // Lê o arquivo completo como string
  let fileContent = await fs.readFile(filePath, 'utf-8');

  // Verifica se tem front matter - usando multiline flag
  const frontMatterMatch = fileContent.match(/^---\r?\n([\s\S]*?)\r?\n---/m);
  if (!frontMatterMatch) {
    console.log(`${file}: Sem front matter válido`);
    return;
  }

  // Extrai o conteúdo sem front matter
  const contentWithoutFrontMatter = fileContent.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/m, '');

  // Calcula palavras e tempo de leitura
  const wordCount = countWords(contentWithoutFrontMatter);
  const readingTime = getReadingTime(wordCount);

  // Limpa o front matter removendo TODAS as ocorrências de timeToRead
  let frontMatterContent = cleanFrontMatter(frontMatterMatch[1]);

  // Adiciona o timeToRead no final do front matter
  frontMatterContent += `\ntimeToRead:\n  minutes: ${readingTime}\n  words: ${wordCount}`;

  // Reconstrói o arquivo mantendo formatação consistente
  const newFileContent = `---\n${frontMatterContent}\n---\n${contentWithoutFrontMatter}`;

  await fs.writeFile(filePath, newFileContent, 'utf-8');
  console.log(`${file}: ~${readingTime} min(s) de leitura, ${wordCount} palavras`);
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
