// Install gray-matter and date-fns
import matter from 'gray-matter';
import fs from 'node:fs/promises';
import { join } from 'node:path';
import { markdownToHtml } from '@utils/markdown-to-html';
import readingTime from 'reading-time';
import { FrontMatter } from '@model/frontmatter';
import { from, lastValueFrom, map, switchMap } from 'rxjs';

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

async function makeFrontMatter(
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
  const list = from(getSlugList()).pipe(
    switchMap((slugs) => {
      const promiseList = slugs.map((slug) => makeFrontMatter(slug));
      return Promise.all(promiseList);
    }),
    map((postList) =>
      postList.sort((a, b) => {
        const dateA = new Date(a.createAt);
        const dateB = new Date(b.createAt);
        return dateB.getTime() - dateA.getTime();
      })
    ),
    map((postList) =>
      postList.map((value, index, array) => {
        return {
          ...value,
          nextPost: array[index - 1] ?? null,
          prevPost: array[index + 1] ?? null,
        };
      })
    )
  );

  return lastValueFrom(list);
}

export async function getPostBySlug(slug: string) {
  const list = await getAllPosts();
  return list.find((post) => post.slug === slug);
}

export function paginate(
  data: FrontMatter[],
  { page, size }: { page: number; size: number }
) {
  const paginatedData = data.slice((page - 1) * size, page * size);
  return paginatedData;
}
