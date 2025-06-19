// Node.js script para processar imagens do Unsplash em tempo de build
// Requisitos: node-fetch, gray-matter, fs-extra

import frontmatter from 'gray-matter';
import crypto from 'node:crypto';
import fs from 'node:fs/promises';
import path from 'node:path';

const mdDir = './src/content'; // pasta com seus arquivos .md
const outputDir = './src/assets/img/featured'; // pasta de saída para imagens processadas
const outputMeta = './src/app/data/featured-images.json'; // arquivo de metadados para imagens processadas
const sizes = [
  [320, 250],
  [700, 320],
  [1920, 1080],
]; // tamanhos em pixels

async function clearBeforeBuild() {
  await fs.rm(outputDir, { recursive: true, force: true }).catch(() => {});
  await fs.mkdir(outputDir, { recursive: true });
  await fs.rm(outputMeta, { force: true }).catch(() => {});
}

function gerarId(code: string) {
  const hash = crypto.createHash('sha256').update(code).digest('hex');
  return hash.slice(0, 12); // usa os primeiros 12 caracteres do hash
}

function gerarNome(id: string, size: number[], format = 'webp') {
  return `${id}-${size[0]}x${size[1]}.${format}`;
}

function gerarUrl(raw: string, size: number[], format = 'webp') {
  const url = new URL(raw);
  const defaultParams = {
    w: size[0],
    h: size[1],
    auto: 'format',
    fit: 'crop',
    crop: 'entropy',
    fm: format,
    q: 80,
  };

  Object.entries(defaultParams).forEach(([key, value]) => {
    url.searchParams.set(key, String(value));
  });

  return url.toString();
}

async function baixarImagem(url: string, destino: string) {
  // console.log(`Baixando imagem de ${url} para ${destino}`);
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Erro ao baixar ${url}`);
  const buffer = Buffer.from(await res.arrayBuffer());
  await fs.mkdir(path.dirname(destino), { recursive: true });
  await fs.writeFile(destino, buffer);
}

async function processarPost(filepath: string) {
  const data = frontmatter.read(filepath);
  const img = data.data['featuredImage'];

  if (!img?.raw || !img?.url) return null;
  const rawUrl = img.raw;
  const id = gerarId(rawUrl);
  const paths: Record<string, string> = {};

  for (const size of sizes) {
    const nome = gerarNome(id, size);
    const localPath = path.join(outputDir, nome);
    const url = gerarUrl(rawUrl, size);
    await baixarImagem(url, localPath);
    paths[`${size[0]}x${size[1]}`] = `/img/featured/${nome}`;
  }

  return {
    id,
    name: img.name,
    author: img.author,
    raw: img.raw,
    url: img.url,
    sizes: paths,
  };
}

async function listarArquivos(dir: string): Promise<string[]> {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files: string[] = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await listarArquivos(fullPath)));
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      files.push(fullPath);
    }
  }
  return files;
}

export async function processImages() {
  await clearBeforeBuild();
  const files = await listarArquivos(mdDir);
  const metas = [];

  for (const file of files) {
    const meta = await processarPost(file);
    if (meta) metas.push(meta);
  }

  // Gera arquivo Json com os metadados das imagens
  const output = JSON.stringify(metas, null, 2);

  await fs.writeFile(outputMeta, output);
  console.log('Imagens processadas e baixadas com sucesso!');
}

// Para rodar diretamente via node scripts/process-unsplash-imgs.ts
if (import.meta.url === `file://${process.argv[1]}`) {
  processImages();
}
