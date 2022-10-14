import { getPostBySlug } from '@utils/posts';
import { serialize } from 'next-mdx-remote/serialize';
import rehypeExternalLinks from 'rehype-external-links';
import rehypePrettyCode from 'rehype-pretty-code';

export const serializeMdx = async (slug: string) => {
  const data = await getPostBySlug(slug);
  const mdxText = data?.content ?? '';
  const frontMatter = { ...data };
  const mdxSource = await serialize(mdxText, {
    parseFrontmatter: true,
    mdxOptions: {
      useDynamicImport: true,
      remarkPlugins: [],
      rehypePlugins: [
        [
          rehypePrettyCode,
          {
            theme: {
              dark: 'dark-plus',
              light: 'light-plus',
            },
          },
        ],
        [
          rehypeExternalLinks,
          { target: '_blank', rel: ['nofollow', 'noopener', 'noreferrer'] },
        ],
      ],
    },
  });
  return { mdxSource, frontMatter };
};
