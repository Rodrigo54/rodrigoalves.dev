import { FrontMatter } from '@model/frontmatter';
import BlogList from '@templates/blog-list';
import { getAllPosts, paginate } from '@utils/posts';
import { chunk } from 'lodash';
import React from 'react';
import { GetStaticPropsContext } from 'next';
import { Metadata } from '@model/metadata';

const PageSize = Metadata.paginationSize;

type PageParams = {
  page: string;
};

export async function getStaticPaths() {
  const posts = await getAllPosts();
  const paths = chunk(posts, PageSize).map((posts, index) => ({
    params: { page: `${index + 1}` },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(
  context: GetStaticPropsContext<PageParams>
) {
  const page = Number(context.params?.page ?? 1);
  const posts = await getAllPosts();
  const total = chunk(posts, PageSize).length;
  return {
    props: {
      pagination: {
        page,
        total,
      },
      posts: paginate(posts, { page, size: PageSize }),
    },
  };
}

type Props = {
  posts: FrontMatter[];
  pagination: {
    page: number;
    total: number;
  };
};

const BlogListPage: React.FC<Props> = ({ posts, pagination }) => {
  return <BlogList postList={posts} pagination={pagination} />;
};

export default BlogListPage;
