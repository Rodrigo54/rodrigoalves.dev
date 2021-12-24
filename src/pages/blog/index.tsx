import { FrontMatter } from '@model/frontmatter';
import BlogList from '@templates/blog-list';
import { getAllPosts, paginate } from '@utils/posts';
import React from 'react';

export async function getStaticProps() {
  const posts = await getAllPosts();
  return {
    props: { posts: paginate(posts, { page: 1, size: 5 }) },
  };
}

type Props = {
  posts: FrontMatter[];
};

const BlogListPage: React.FC<Props> = ({ posts }) => {
  return <BlogList postList={posts} />;
};

export default BlogListPage;
