import Comments from '@components/comments';
import Layout from '@components/layout';
import PaperLayout from '@components/paper-layout';
import PostInfo from '@components/post-info';
import RecommendedPosts from '@components/recommended-posts';
import SEO from '@components/seo';
import { FrontMatter } from '@model/frontmatter';
import React, { useEffect, useState } from 'react';

import * as S from './styles';

type Props = {
  data: FrontMatter;
};

const BlogPost: React.FC<Props> = ({ data, children }) => {
  const { body, slug, ...frontMatter } = data;

  const identifier = new Date(frontMatter.createAt).getTime();
  const comments = frontMatter.comments ? (
    <Comments identifier={identifier} slug={slug} title={frontMatter.title} />
  ) : null;

  const [html, setHtml] = useState('');

  useEffect(() => {
    body && setHtml(body);
  }, [body]);

  return (
    <Layout>
      <SEO
        title={frontMatter.title}
        description={frontMatter.description}
        image={frontMatter.featuredImage}
      />
      <PaperLayout alt={frontMatter.title} image={frontMatter.featuredImage}>
        <S.PostHeader>
          <S.PostTitle>{frontMatter.title}</S.PostTitle>
          <S.PostDescription>{frontMatter.description}</S.PostDescription>
          <PostInfo info={frontMatter} />
        </S.PostHeader>
        <S.MainContent>
          {html ? <div dangerouslySetInnerHTML={{ __html: html }}></div> : null}
          {children}
        </S.MainContent>
        <RecommendedPosts
          next={frontMatter.nextPost}
          previous={frontMatter.prevPost}
        />
        {comments}
      </PaperLayout>
    </Layout>
  );
};

export default BlogPost;
