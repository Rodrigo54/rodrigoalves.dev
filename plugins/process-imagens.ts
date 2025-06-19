// Node.js script para processar imagens do Unsplash em tempo de build
// Requisitos: node-fetch, front-matter, fs-extra

import { FrontMatter } from '@utils/frontmatter.signal';
import matter from 'front-matter';
import fs from 'node:fs/promises';
import path from 'node:path';
import { Plugin, UserConfig } from 'vite';

const mdDir = './src/content'; // pasta com seus arquivos .md
const outputDir = './src/assets/img/featured'; // pasta de saída para imagens processadas
const outputMeta = './src/app/data/featured-images.ts';
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
  console.log(`Baixando imagem de ${url} para ${destino}`);
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Erro ao baixar ${url}`);
  const buffer = Buffer.from(await res.arrayBuffer());
  await fs.mkdir(path.dirname(destino), { recursive: true });
  await fs.writeFile(destino, buffer);
}

async function processarPost(filepath: string) {
  const content = await fs.readFile(filepath, 'utf8');
  const data = matter<FrontMatter>(content);
  const img = data.attributes.featuredImage;

  if (!img?.raw || !img?.url) return null;
  const rawUrl = img.raw;

  // extrai ID da imagem (último trecho após 'photo-')
  const match = rawUrl.match(/\/photo-([a-zA-Z0-9-]+)(?:\?.*)?$/);
  if (!match) return null;

  const id = match[1];
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

async function processarImagens() {
  await clearBeforeBuild();
  const files = await listarArquivos(mdDir);
  const metas = [];

  for (const file of files) {
    const meta = await processarPost(file);
    if (meta) metas.push(meta);
  }

  // Gera arquivo TypeScript
  const output = `
export const FeaturedImages = {
  ${metas
    .map(
      m => `"${m.raw}": {
    id: '${m.id}',
    name: ${JSON.stringify(m.name)},
    author: ${JSON.stringify(m.author)},
    raw: ${JSON.stringify(m.raw)},
    url: ${JSON.stringify(m.url)},
    sizes: {
      ${Object.entries(m.sizes)
        .map(([k, v]) => `'${k}': '${v}'`)
        .join(',\n      ')}
    }
  }`,
    )
    .join(',\n  ')}
} as const;

type ImageKey = keyof typeof FeaturedImages;
type ImageValue = (typeof FeaturedImages)[ImageKey];

export const FeaturedImagesMap = new Map<string, ImageValue>(
  Object.entries(FeaturedImages).map(([key, value]) => [key, value as ImageValue])
);
`;

  await fs.writeFile(outputMeta, output);
  console.log('Imagens processadas e baixadas com sucesso!');
}

export function unsplashImagePlugin(): Plugin {
  let config: UserConfig;
  return {
    name: 'vite-plugin-unsplash-image-processor',
    apply: 'build', // roda só em build
    config(_config) {
      config = _config;
    },
    async buildStart() {
      if (config.build?.ssr) {
        return;
      }
      await processarImagens();
    },
  };
}
