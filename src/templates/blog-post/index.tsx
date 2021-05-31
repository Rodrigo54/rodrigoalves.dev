
import Comments from '@components/comments';
import Layout from '@components/layout';
import PaperLayout from '@components/paper-layout';
import RecommendedPosts from '@components/recommended-posts';
import { Clock } from '@styled-icons/fa-regular/Clock';
import { Music } from '@styled-icons/fa-solid/Music';
import { CalendarAlt as Calendar } from '@styled-icons/fa-regular/CalendarAlt';
import SEO from '@components/seo';
import { Post } from '@model/post';
import { graphql } from 'gatsby';
import { getImage } from 'gatsby-plugin-image';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import React from 'react';

import * as S from './styles';
import PostInfo from '@components/post-info';

export const query = graphql`
  query PostQuery($slug: String!) {
    mdx( fields: { slug: { eq: $slug }}) {
      fields {
        slug
      }
      frontmatter {
        tags,
        title
        author
        description
        featuredImage {
          publicURL
          childImageSharp {
            gatsbyImageData(
              layout: FULL_WIDTH,
              placeholder: BLURRED
            )
          }
        }
        comments
        date(locale: "pt-br")
        music {
          title
          url
        }
      }
      timeToRead
      body
    }
  }
`;

type node = {
  fields: {
    slug: string,
  };
  frontmatter: {
    title: string,
  }
};

type Props = {
  data: { mdx: Post };
  pageContext: {
    nextPost: node,
    previousPost: node,
  };
};

const BlogPost: React.FC<Props> = ({ data, pageContext: { nextPost, previousPost } }) => {
  const next = nextPost ? {
    slug: nextPost.fields.slug,
    title: nextPost.frontmatter.title,
  } : undefined;

  const previous = previousPost ? {
    slug: previousPost.fields.slug,
    title: previousPost.frontmatter.title,
  } : undefined;

  const { frontmatter, timeToRead, body, fields: { slug } } = data.mdx;
  const identifier = new Date(frontmatter.date).getTime();
  const comments = frontmatter.comments ?
    (<Comments identifier={identifier} url={slug} title={frontmatter.title} />) : undefined;

  const featuredImage = getImage(frontmatter.featuredImage) as any;

  return (
    <Layout>
      <SEO
        title={frontmatter.title}
        description={frontmatter.description}
        image={frontmatter.featuredImage.publicURL}
      />
      <PaperLayout alt={frontmatter.title} image={featuredImage}>
        <S.PostHeader>
          <S.PostTitle>{frontmatter.title}</S.PostTitle>
          <S.PostDescription>{frontmatter.description}</S.PostDescription>
          <PostInfo info={{
            timeToRead,
            date: frontmatter.date,
            music: frontmatter.music,
            tags: frontmatter.tags,
          }} />
        </S.PostHeader>
        <MDXRenderer components={{wrapper: S.MainContent}}>{body}</MDXRenderer>
        <RecommendedPosts next={next} previous={previous} />
        {comments}
      </PaperLayout>
    </Layout>
  );
}

export default BlogPost;
