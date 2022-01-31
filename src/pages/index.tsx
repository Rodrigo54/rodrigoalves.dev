import Layout from '@components/layout';
import Pagination from '@components/pagination';
import PostItem from '@components/post-item';
import SEO from '@components/seo';
import { FrontMatter } from '@model/frontmatter';
import { Metadata } from '@model/metadata';
import * as S from '@templates/blog-list/styles';
import { getAllPosts, paginate } from '@utils/posts';
import { chunk } from 'lodash';
import React from 'react';

const PageSize = Metadata.paginationSize;

type IndexPageProps = {
  posts: FrontMatter[];
  pagination: {
    page: number;
    total: number;
  };
};

const IndexPage: React.FC<IndexPageProps> = ({ posts, pagination }) => {
  const postList = posts;
  return (
    <Layout>
      <SEO title="Home" />
      <S.ListWrapper>
        {postList.map((post, index) => (
          <PostItem key={index} frontMatter={post} />
        ))}
      </S.ListWrapper>
      <Pagination {...pagination} />
    </Layout>
  );
};

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
      posts: paginate(posts, { page, size: PageSize }),
    },
  };
}

export default IndexPage;
