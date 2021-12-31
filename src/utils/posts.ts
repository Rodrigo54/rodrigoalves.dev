// Install gray-matter and date-fns
import matter from 'gray-matter';
import fs from 'node:fs/promises';
import { join } from 'node:path';
import { markdownToHtml } from '@utils/markdown-to-html';
import readingTime from 'reading-time';
import { FrontMatter } from '@model/frontmatter';

const postsDirectory = join(process.cwd(), 'src/pages/blog');

async function getSlugList(): Promise<string[]>;
async function getSlugList(searchSlug: string): Promise<string>;
async function getSlugList(searchSlug?: string) {
  const files = await fs.readdir(postsDirectory);
  const slugs = files
    .filter((slug) => /(\.mdx?)$/.test(slug))
    .map((slug) => slug.replace(/(\.mdx?)$/, ''));
  return searchSlug ? slugs.find((slugs) => searchSlug === slugs) : slugs;
}

export async function getPostBySlug(
  slug: string,
  makeHtml = false
): Promise<FrontMatter> {
  const isSlugExist = await getSlugList(slug);
  if (!isSlugExist) throw new Error('Slug não existe');

  const fullPath = join(postsDirectory, `${slug}.mdx`);
  const fileContents = await fs.readFile(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  const timeToRead = readingTime(content);

  if (makeHtml) {
    data.body = await markdownToHtml(content);
  }

  return {
    ...data,
    slug,
    timeToRead,
    fullPath,
  } as FrontMatter;
}

export async function getAllPosts() {
  const slugs = await getSlugList();
  const postListPromises = slugs.map((slug) => getPostBySlug(slug));
  const postList = await Promise.all(postListPromises);
  return postList.sort((a, b) => {
    const dateA = new Date(a.createAt);
    const dateB = new Date(b.createAt);
    return dateB.getTime() - dateA.getTime();
  });
}

export function paginate(
  data: FrontMatter[],
  { page, size }: { page: number; size: number }
) {
  const paginatedData = data.slice((page - 1) * size, page * size);
  return paginatedData;
}
