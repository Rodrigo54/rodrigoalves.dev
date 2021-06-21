import React from "react";

import Layout from "@components/layout";
import SEO from "@components/seo";
import PaperLayout from "@components/paper-layout";
import AboutPageContent from "@components/pages/about";
import { graphql, useStaticQuery } from "gatsby";

const AboutPage: React.FC = () => {

  const data = useStaticQuery(graphql`
    query AboutImageQuery {
      file(
        relativePath: {eq: "about-bg.jpg"}
        sourceInstanceName: { eq: "images" }
      ) {
        childImageSharp {
          gatsbyImageData(
            layout: FULL_WIDTH,
            placeholder: BLURRED
          )
        }
      }
    }
  `);

  return (
    <Layout>
      <SEO title="Sobre Mim" />
      <PaperLayout
        image={data.file}
        alt="Sobre Mim"
      >
        <AboutPageContent />
      </PaperLayout>
    </Layout>
  );
};

export default AboutPage;
