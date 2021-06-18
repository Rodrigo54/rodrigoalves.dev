import React from "react";

import Layout from "@components/layout";
import SEO from "@components/seo";
import PaperLayout from "@components/paper-layout";
import { graphql, useStaticQuery } from "gatsby";
import * as S from './styles';
import ProfessionalExperience from "./professional-experience";
import AcademicFormation from "./formation";

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
        <S.MainContent>
          <S.Paragrafe>Meu nome é Rodrigo Alves Mesquita, nasci em São Luis - MA</S.Paragrafe>
          <S.Paragrafe>
            Sou um Web Developer amante da Tecnologia que gosta de aprender novas
            formas de programar. Eterno aluno de C e PHP, tento me esforçar para
            ser um bom artista da web.
          </S.Paragrafe>

          <S.AbilitiesWrapper>
            <S.Title>Habilidades</S.Title>
            <S.AbilitiesUl>
              <S.AbilitiesLi>HTML5</S.AbilitiesLi>
              <S.AbilitiesLi>Design Responsivo (Mobile First)</S.AbilitiesLi>
              <S.AbilitiesLi>CSS (Sass, Less)</S.AbilitiesLi>
              <S.AbilitiesLi>Css Frameworks (Bootstrap, Materialize)</S.AbilitiesLi>
              <S.AbilitiesLi>Javascript (Jquery, AngularJS)</S.AbilitiesLi>
              <S.AbilitiesLi>Typescript (Angular 2)</S.AbilitiesLi>
              <S.AbilitiesLi>Git (GitHub)</S.AbilitiesLi>
              <S.AbilitiesLi>PHP (Codeigniter)</S.AbilitiesLi>
              <S.AbilitiesLi>MySQL, PostgreSQL</S.AbilitiesLi>
              <S.AbilitiesLi>Gosto sempre de aprender coisas novas 😉</S.AbilitiesLi>
            </S.AbilitiesUl>
          </S.AbilitiesWrapper>

          <ProfessionalExperience />
          <AcademicFormation />

        </S.MainContent>
      </PaperLayout>
    </Layout>
  );
};

export default AboutPage;
