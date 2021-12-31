import Layout from '@components/layout';
import Pagination from '@components/pagination';
import PostItem from '@components/post-item';
import SEO from '@components/seo';
import { FrontMatter } from '@model/frontmatter';
import React from 'react';

import * as S from './styles';

type Props = {
  postList: FrontMatter[];
};

const BlogList: React.FC<Props> = ({ postList }) => {
  return (
    <Layout>
      <SEO title="Blog" />
      <S.ListWrapper>
        {postList.map((post, index) => (
          <PostItem key={index} frontMatter={post} />
        ))}
      </S.ListWrapper>
      <Pagination />
    </Layout>
  );
};

export default BlogList;
