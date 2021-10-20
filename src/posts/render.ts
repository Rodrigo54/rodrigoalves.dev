// Install gray-matter and date-fns
import matter from 'gray-matter';
import { parse, format } from 'date-fns';
import fs from 'fs/promises';
import { join } from 'path';
import { markdownToHtml } from '@utils/markdownToHtml';

type AsyncReturnType<T> = T extends (...args: never) => Promise<infer R>
  ? R
  : never;

export type Post = AsyncReturnType<typeof getPostBySlug>;

// Add markdown files in `src/content/blog`
const postsDirectory = join(process.cwd(), 'src', 'posts');

function replaceSlug(slug: string) {
  return slug.replace(/\d{4}-\d{2}-\d{2}-/, '').replace(/(\.mdx?)$/, '');
}

async function getSlugList() {
  const slugs = await fs.readdir(postsDirectory);
  return slugs.filter((slug) => /^(\d{4}-\d{2}-\d{2}-)/.test(slug));
}

export async function getPostBySlug(
  slug: string
): Promise<{ [key: string]: any }> {
  const realSlug = replaceSlug(slug);

  const fileNamesList = await getSlugList();

  const fileName = fileNamesList.find(
    (fileName) => replaceSlug(fileName) === realSlug
  );

  const fullPath = join(postsDirectory, fileName ?? `${realSlug}.mdx`);
  const fileContents = await fs.readFile(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  const body = await markdownToHtml(content);

  // console.log({ body });

  return {
    slug: realSlug,
    frontmatter: { ...data, slug: realSlug },
    content,
    body,
    pageContext: {
      nextPost: { ...data, slug: realSlug },
      previousPost: { ...data, slug: realSlug },
    },
  };
}

export async function getAllPosts() {
  const slugs = await getSlugList();
  const posts = slugs.map(async (slug) => await getPostBySlug(slug));

  return Promise.all(posts);
}
