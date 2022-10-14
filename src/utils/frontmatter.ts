import { FrontMatter } from '@model/frontmatter';
import matter from 'gray-matter';
import { readFile } from 'node:fs/promises';
import readingTime from 'reading-time';

export async function makeFrontMatter(fullPath: string) {
  const fileContents = await readFile(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  const timeToRead = readingTime(content);

  return {
    ...data,
    content,
    timeToRead,
    fullPath,
  } as FrontMatter & { content: string };
}
