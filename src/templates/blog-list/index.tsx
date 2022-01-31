import Layout from '@components/layout';
import Pagination from '@components/pagination';
import PostItem from '@components/post-item';
import SEO from '@components/seo';
import { FrontMatter } from '@model/frontmatter';
import React from 'react';

import * as S from './styles';

type Props = {
  postList: FrontMatter[];
  pagination: {
    page: number;
    total: number;
  };
};

const BlogList: React.FC<Props> = ({ postList, pagination }) => {
  return (
    <Layout>
      <SEO title="Blog" />
      <S.ListWrapper>
        {postList.map((post, index) => (
          <PostItem key={index} frontMatter={post} />
        ))}
      </S.ListWrapper>
      <Pagination {...pagination} />
    </Layout>
  );
};

export default BlogList;
