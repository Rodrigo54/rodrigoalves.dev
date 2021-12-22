import Comments from '@components/comments';
import Layout from '@components/layout';
import PaperLayout from '@components/paper-layout';
import PostInfo from '@components/post-info';
import RecommendedPosts from '@components/recommended-posts';
import SEO from '@components/seo';
import React from 'react';

import * as S from './styles';

type node = {
  fields: {
    slug: string;
  };
  frontmatter: {
    title: string;
  };
};

type Props = {
  data: any;
  pageContext: {
    nextPost: any;
    previousPost: any;
  };
};

const BlogPost: React.FC<Props> = ({
  data,
  pageContext: { nextPost, previousPost },
}) => {
  const next = nextPost
    ? {
        slug: nextPost.slug,
        title: nextPost.title,
      }
    : undefined;

  const previous = previousPost
    ? {
        slug: previousPost.slug,
        title: previousPost.title,
      }
    : undefined;

  const { frontmatter, timeToRead, body, slug } = data;
  const comments = frontmatter.comments ? (
    <Comments slug={slug} title={frontmatter.title} />
  ) : undefined;

  const featuredImage = frontmatter.featuredImage;

  return (
    <Layout>
      <SEO
        title={frontmatter.title}
        description={frontmatter.description}
        image={frontmatter.featuredImage}
      />
      <PaperLayout alt={frontmatter.title} image={featuredImage}>
        <S.PostHeader>
          <S.PostTitle>{frontmatter.title}</S.PostTitle>
          <S.PostDescription>{frontmatter.description}</S.PostDescription>
          <PostInfo
            info={{
              timeToRead,
              date: frontmatter.date,
              music: frontmatter.music,
              tags: frontmatter.tags,
            }}
          />
        </S.PostHeader>
        <S.MainContent dangerouslySetInnerHTML={{ __html: body }} />
        <RecommendedPosts next={next} previous={previous} />
        {comments}
      </PaperLayout>
    </Layout>
  );
};

export default BlogPost;
