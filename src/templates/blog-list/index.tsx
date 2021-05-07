import Layout from '@components/layout';
import Pagination from '@components/pagination';
import PostItem from '@components/post-item';
import SEO from '@components/seo';
import { graphql } from 'gatsby';
import { Post } from 'model/Post';
import React from 'react';

import * as S from './styles';

export const query = graphql`
  query PostList($skip: Int!, $limit: Int!) {
    allMdx(
      sort: { fields: frontmatter___date, order: DESC }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
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
                  width: 400,
                  placeholder: BLURRED
                )
              }
            }
            date(locale: "pt-br", formatString: "DD [de] MMMM [de] YYYY")
            music {
              title
              url
            }
          }
          timeToRead
        }
      }
    }
  }
`;

type Props = {
  pageContext: {
    currentPage: number,
    numPages: number,
  };
  data: {
    allMdx: { edges: { node: Post }[] }
  };
};

const BlogList: React.FC<Props> = ({ pageContext, data }) => {
  const { currentPage, numPages } = pageContext;
  const isFirst = currentPage === 1;
  const isLast = currentPage === numPages;
  const prevPage = currentPage - 1 === 1 ? '/blog/' : `/blog/page/${currentPage - 1}`;
  const nextPage = `/blog/page/${currentPage + 1}`;
  const postList = data.allMdx.edges.map(({node}) => ({
    ...node.frontmatter,
    timeToRead: node.timeToRead,
    slug: node.fields.slug,
  }));
  return (
    <Layout>
      <SEO title='Blog' />
      <S.ListWrapper>
        {postList.map((post, index) => (
          <PostItem
            key={index}
            slug={post.slug}
            category='JS'
            date={post.date}
            timeToRead={post.timeToRead}
            title={post.title}
            description={post.description}
            featuredImage={post.featuredImage}
          />
        ))}
      </S.ListWrapper>
      <Pagination
        isFirst={isFirst}
        isLast={isLast}
        currentPage={currentPage}
        numPages={numPages}
        prevPage={prevPage}
        nextPage={nextPage}
      />
    </Layout>
  );
}

export default BlogList;
