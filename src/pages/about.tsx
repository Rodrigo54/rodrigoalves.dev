import React from 'react';

import Layout from '@components/layout';
import SEO from '@components/seo';
import PaperLayout from '@components/paper-layout';
import AboutPageContent from '@components/pages/about';

const AboutPage: React.FC = () => {
  return (
    <Layout>
      <SEO title="Sobre Mim" />
      <PaperLayout
        title="Sobre Mim"
        subtitle="Basta querer mudar o mundo através da web."
        image="/img/about-bg.jpg"
        alt="Sobre Mim"
      >
        <AboutPageContent />
      </PaperLayout>
    </Layout>
  );
};

export default AboutPage;
