import Layout from '@components/layout';
import * as S from '@templates/blog-list/styles';
import Pagination from '@components/pagination';
import PostItem from '@components/post-item';
import SEO from '@components/seo';
import Link from 'next/link';
import React from 'react';
import { getAllPosts, paginate } from '@utils/posts';
import { FrontMatter } from '@model/frontmatter';

type IndexPageProps = {
  posts: FrontMatter[];
};

const IndexPage: React.FC<IndexPageProps> = ({ posts }) => {
  const postList = posts;
  return (
    <Layout>
      <SEO title="Home" />
      <S.ListWrapper>
        {postList.map((post, index) => (
          <PostItem key={index} frontMatter={post} />
        ))}
      </S.ListWrapper>
      <Pagination>
        <Link href="/blog/" passHref>
          <a>Veja mais artigos</a>
        </Link>
      </Pagination>
    </Layout>
  );
};

export async function getStaticProps() {
  const posts = await getAllPosts();
  return {
    props: { posts: paginate(posts, { page: 1, size: 5 }) },
  };
}

export default IndexPage;
