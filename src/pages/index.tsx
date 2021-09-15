import Layout from '@components/layout';
import * as S from '@templates/blog-list/styles';
import Pagination from '@components/pagination';
import PostItem from '@components/post-item';
import SEO from '@components/seo';
import getThemeColor from '@utils/getThemeColor';
import Link from 'next/link';
import React from 'react';
import { getAllPosts, Post } from '@posts/render';

type IndexPageProps = { posts: Post[]; prevPosts: Post[]; nextPosts: Post[] };

const IndexPage: React.FC<IndexPageProps> = ({
  posts,
  prevPosts,
  nextPosts,
}) => {
  const postList = posts;
  return (
    <Layout>
      <SEO title="Home" />
      <S.ListWrapper>
        {postList.map((post, index) => (
          <PostItem
            key={index}
            slug={post.slug}
            category="JS"
            date={post.frontmatter.date}
            timeToRead={post.frontmatter.timeToRead}
            title={post.frontmatter.title}
            music={post.frontmatter.music}
            description={post.frontmatter.description}
            tags={post.frontmatter.tags}
            featuredImage={post.frontmatter.featuredImage}
          />
        ))}
      </S.ListWrapper>
      <Pagination>
        <Link href="/blog/">
          <a>Veja mais artigos</a>
        </Link>
      </Pagination>
    </Layout>
  );
};

export async function getStaticProps() {
  const posts = await getAllPosts();

  const startIndex = 0;
  const endIndex = 5;
  const prevPosts = null;
  const nextPosts = endIndex >= posts.length ? null : 2;

  return {
    props: { posts: posts.slice(startIndex, endIndex), prevPosts, nextPosts },
  };
}

export default IndexPage;
