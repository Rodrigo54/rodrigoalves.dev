import { FrontMatter } from '@model/frontmatter';
import matter from 'gray-matter';
import fs from 'node:fs/promises';
import readingTime from 'reading-time';

export async function makeFrontMatter(fullPath: string): Promise<FrontMatter> {
  const fileContents = await fs.readFile(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  const timeToRead = readingTime(content);

  return {
    ...data,
    timeToRead,
    fullPath,
  } as FrontMatter;
}
