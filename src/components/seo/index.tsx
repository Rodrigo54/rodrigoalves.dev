import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import { Helmet } from 'react-helmet';

type SEOProps = {
  description?: string;
  lang?: string;
  meta?: Array<{
    name: string,
    content: string,
  }>;
  title?: string;
  image?: string;
};

const SEO: React.FC<SEOProps> = ({
  description = '',
  lang = 'pt-br',
  meta = [],
  title,
  image
}) => {
  const { site, avatarImg } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
            siteUrl
          }
        }
        avatarImg: file(relativePath: { eq: "snapshot.jpg" }){
          publicURL
        }
      }
    `,
  );

  const metaDescription = description || site.siteMetadata.description;
  const url = site.siteMetadata.siteUrl;
  const ogImage = `${url}${image || avatarImg.publicURL}`;

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`%s | ${site.siteMetadata.title}`}
      link={[
        {
          rel:"preconnect",
          href:"https://fonts.gstatic.com"
        },
        {
          href:"https://fonts.googleapis.com/css2?family=Merriweather&family=Open+Sans&display=swap",
          rel:"stylesheet"
        }
      ]}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:image`,
          content: ogImage,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary_large_image`,
        },
        {
          name: `twitter:image:src`,
          content: ogImage,
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata.author,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
      ].concat(meta)}
    />
  );
}

export default SEO;
