import { FrontMatter } from '@model/frontmatter';
import { makeFrontMatter } from '@utils/frontmatter';
import fs from 'node:fs/promises';
import { join } from 'node:path';
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

async function getFrontMatter(slug: string): Promise<FrontMatter> {
  const isSlugExist = await getSlugList(slug);
  if (!isSlugExist) throw new Error('Slug não existe');

  const fullPath = join(postsDirectory, `${slug}.mdx`);
  const data = await makeFrontMatter(fullPath);

  return {
    ...data,
    slug,
  } as FrontMatter;
}

export async function getAllPosts(): Promise<FrontMatter[]> {
  const list = from(getSlugList()).pipe(
    switchMap((slugs) => {
      const promiseList = slugs.map((slug) => getFrontMatter(slug));
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

export async function getPostBySlug(slug: string): Promise<FrontMatter | null> {
  const list = await getAllPosts();
  return list.find((post) => post.slug === slug) ?? null;
}

export function paginate(
  data: FrontMatter[],
  { page, size }: { page: number; size: number }
) {
  const paginatedData = data.slice((page - 1) * size, page * size);
  return paginatedData;
}
