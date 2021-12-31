import React from 'react';
import Head from 'next/head';
import { Metadata } from '@model/metadata';

type SEOProps = {
  description?: string;
  lang?: string;
  meta?: Array<{
    name: string;
    content: string;
  }>;
  title?: string;
  image?: string;
};

const SEO: React.FC<SEOProps> = ({
  description = Metadata.description,
  title,
  image = '/img/snapshot.jpg',
}) => {
  const ogImage = image;
  const { title: siteTitle, author } = Metadata;

  return (
    <Head>
      <title>{`${title} | ${siteTitle}`}</title>
      <meta name="description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content={siteTitle} />
      <meta property="twitter:image:src" content={ogImage} />
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:creator" content={author} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
    </Head>
  );
};

export default SEO;
