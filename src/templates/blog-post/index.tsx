
import Comments from '@components/comments';
import Layout from '@components/layout';
import RecommendedPosts from '@components/recommended-posts';
import SEO from '@components/seo';
import { Post } from '@model/post';
import { graphql } from 'gatsby';
import { getImage } from 'gatsby-plugin-image';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import React from 'react';

import * as S from './styles';

export const query = graphql`
  query PostQuery($slug: String!) {
    mdx( fields: { slug: { eq: $slug }}) {
      fields {
        slug
      }
      frontmatter {
        title
        author
        description
        featuredImage {
          publicURL
          childImageSharp {
            gatsbyImageData(
              layout: CONSTRAINED,
              width: 1440,
              placeholder: BLURRED
            )
          }
        }
        comments
        date_timestamp: date
        date(locale: "pt-br", formatString: "DD [de] MMMM [de] YYYY")
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
  const identifier = new Date(frontmatter.date_timestamp).getTime();
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
      <S.PostThumbnail alt={frontmatter.title} image={featuredImage} />
      <S.PostPaper>
        <S.PostHeader>
          <S.PostTitle>{frontmatter.title}</S.PostTitle>
          <S.PostDescription>{frontmatter.description}</S.PostDescription>
          <S.PostDate>
            {frontmatter.date} • {timeToRead} min de leitura
          </S.PostDate>
        </S.PostHeader>
        <MDXRenderer components={{wrapper: S.MainContent}}>{body}</MDXRenderer>
        <RecommendedPosts next={next} previous={previous} />
        {comments}
      </S.PostPaper>
    </Layout>
  );
}

export default BlogPost;
