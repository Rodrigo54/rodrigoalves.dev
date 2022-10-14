import * as components from '@components/index';
import BlogPost from '@templates/blog-post';
import { serializeMdx } from '@utils/markdown-to-html';
import { getSlugList } from '@utils/posts';
import { GetStaticPropsContext } from 'next';
import { MDXRemote } from 'next-mdx-remote';

type PageParams = {
  post: string;
};

export default function PostPage({ mdxSource, frontMatter }) {
  return (
    <BlogPost data={frontMatter}>
      <MDXRemote {...mdxSource} components={components} />
    </BlogPost>
  );
}

export async function getStaticProps(
  context: GetStaticPropsContext<PageParams>
) {
  if (context.params?.post) {
    const props = await serializeMdx(context.params?.post);
    return { props };
  }
}

export const getStaticPaths = async () => {
  const posts = await getSlugList();
  const paths = posts.map((post) => ({ params: { post } }));

  return {
    paths,
    fallback: false,
  };
};
