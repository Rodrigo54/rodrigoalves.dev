import * as fs from 'fs';
import * as path from 'path';
import fm from 'front-matter';

import { FrontMatter } from './src/app/utils/frontmatter';
import { environment } from './src/env/env';

const POSTS_PATH = './src/content';

function getPublishedPosts() {
  return fs
    .readdirSync(POSTS_PATH)
    .map((contentFile) => {
      const fileContents = fs.readFileSync(
        path.resolve(POSTS_PATH, contentFile),
        'utf8',
      );
      return {
        attributes: fm(fileContents).attributes as FrontMatter,
        body: fm(fileContents).body,
        file: contentFile,
      };
    })
    .filter(({ attributes }) => attributes.draft !== true)
    .toSorted((a, b) => new Date(b.attributes.createAt).getTime() - new Date(a.attributes.createAt).getTime());
}

export function getBlogPosts(): string[] {
  const publishedPosts = getPublishedPosts().map((post) => {
    return `/blog/${path.parse(post.file).name}`;
  });
  return publishedPosts;
}

export function getBlogTags(): string[] {
  const uniqueTags = new Set<string>();

  getPublishedPosts().forEach((post) => {
    if (post.attributes.tags?.length) {
      const tags = post.attributes.tags;
      tags.forEach((tag) => uniqueTags.add(tag?.toLowerCase()));
    }
  });

  const uniqueTagsArray = Array.from(uniqueTags).toSorted((a, b) => a.localeCompare(b));

  return uniqueTagsArray.map((tag) => `/blog/tag/${encodeURI(tag)}`);
}

export function getBlogPagination(): string[] {
  const postsPerPage = environment.postsPerPage;
  const publishedPosts = getPublishedPosts();
  const totalPages = Math.ceil(publishedPosts.length / postsPerPage);
  const paginationLinks: string[] = [];

  for (let i = 1; i <= totalPages; i++) {
    paginationLinks.push(`/blog/page/${i}`);
  }

  return paginationLinks;
}
