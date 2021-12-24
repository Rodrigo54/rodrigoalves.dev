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
  const next = undefined;
  const previous = undefined;

  const { body, slug, ...frontMatter } = data;
  const comments = frontMatter.comments ? (
    <Comments slug={slug} title={frontMatter.title} />
  ) : undefined;

  const featuredImage = frontMatter.featuredImage;

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
      <PaperLayout alt={frontMatter.title} image={featuredImage}>
        <S.PostHeader>
          <S.PostTitle>{frontMatter.title}</S.PostTitle>
          <S.PostDescription>{frontMatter.description}</S.PostDescription>
          <PostInfo info={frontMatter} />
        </S.PostHeader>
        <S.MainContent>
          {html ? <div dangerouslySetInnerHTML={{ __html: html }}></div> : null}
          {children}
        </S.MainContent>
        <RecommendedPosts next={next} previous={previous} />
        {comments}
      </PaperLayout>
    </Layout>
  );
};

export default BlogPost;
