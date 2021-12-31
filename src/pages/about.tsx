import React from 'react';

import AboutPageContent from '@components/pages/about';
import PageLayout from '@templates/page-layout';

const AboutPage: React.FC = () => {
  const frontMatter = {
    title: 'Sobre Mim',
    subtitle: 'Basta querer mudar o mundo através da web.',
    featuredImage: '/img/about-bg.jpg',
  };
  return (
    <PageLayout data={frontMatter}>
      <AboutPageContent />
    </PageLayout>
  );
};

export default AboutPage;
