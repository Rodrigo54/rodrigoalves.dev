import React from 'react';

import Layout from '@components/layout';
import SEO from '@components/seo';
import PaperLayout from '@components/paper-layout';

type Props = {
  children: React.ReactNode;
  data: {
    title: string;
    subtitle: string;
    featuredImage: string;
  };
};

const PageLayout: React.FC<Props> = ({ data, children }) => {
  return (
    <Layout>
      <SEO title={data.title} />
      <PaperLayout
        title={data.title}
        subtitle={data.subtitle}
        image={data.featuredImage}
        alt={data.title}
      >
        {children}
      </PaperLayout>
    </Layout>
  );
};

export default PageLayout;
