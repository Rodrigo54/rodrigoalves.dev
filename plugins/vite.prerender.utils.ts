import fm from 'gray-matter';
import * as fs from 'node:fs';
import * as path from 'node:path';

import { FrontMatter } from '../src/app/utils/frontmatter.signal';

const POSTS_PATH = './src/content';

function getPublishedPosts() {
  return fs
    .readdirSync(POSTS_PATH)
    .map(contentFile => {
      const fileContents = fs.readFileSync(path.resolve(POSTS_PATH, contentFile), 'utf8');
      return {
        attributes: fm(fileContents).data as FrontMatter,
        body: fm(fileContents).content,
        file: contentFile,
      };
    })
    .filter(({ attributes }) => attributes.draft !== true)
    .toSorted((a, b) => new Date(b.attributes.createAt).getTime() - new Date(a.attributes.createAt).getTime());
}

export function getBlogPosts(): string[] {
  const publishedPosts = getPublishedPosts().map(post => {
    return `/blog/${path.parse(post.file).name}`;
  });
  return publishedPosts;
}

export function getBlogTags(): string[] {
  const uniqueTags = new Set<string>();

  getPublishedPosts().forEach(post => {
    if (post.attributes.tags?.length) {
      const tags = post.attributes.tags;
      tags.forEach(tag => uniqueTags.add(tag?.toLowerCase()));
    }
  });

  const uniqueTagsArray = Array.from(uniqueTags).toSorted((a, b) => a.localeCompare(b));

  return uniqueTagsArray.map(tag => `/blog/tags/${encodeURI(tag)}`);
}
