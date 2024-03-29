import { FrontMatter } from '@model/frontmatter';
import BlogList from '@templates/blog-list';
import { getAllPosts, paginate } from '@utils/posts';
import { chunk } from 'lodash';
import React from 'react';
import { Metadata } from '@model/metadata';

const PageSize = Metadata.paginationSize;

export async function getStaticProps() {
  const page = 1;
  const posts = await getAllPosts();
  const total = chunk(posts, PageSize).length;
  return {
    props: {
      pagination: {
        page,
        total,
      },
      posts: paginate(posts, { page: 1, size: 5 }),
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
