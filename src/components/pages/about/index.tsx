import React from 'react';

import * as S from './styles';
import ProfessionalExperience from './professional-experience';
import AcademicFormation from './formation';
import AllSocialLinks from './all-social-links';

const AboutPageContent: React.FC = () => {
  return (
    <S.MainContent>
      <S.Paragrafe>
        Meu nome é Rodrigo Alves Mesquita, nasci em São Luis - MA
      </S.Paragrafe>
      <S.Paragrafe>
        Sou um Web Developer amante da Tecnologia que gosta de aprender novas
        formas de programar. Eterno aluno de C e PHP, tento me esforçar para ser
        um bom artista da web. Meu objetivo é me tornar um profissional capaz de
        criar soluções eficazes e inovadoras para os problemas de hoje. Gosto de
        trabalhar em equipe e compartilhar minhas ideias com outras pessoas.
        Estou sempre aberto a novas tecnologias e tendências. No meu tempo
        livre, gosto de jogar video game, ler livros, assistir filmes e series,
        além de fazer trabalhos manuais. Meu sonho é viajar o mundo e conhecer
        culturas e povos diferentes.
      </S.Paragrafe>

      <S.Paragrafe>
        Acredito que a tecnologia tem o poder de mudar o mundo e me esforço para
        me tornar parte desse movimento. Aprender sempre é a melhor maneira de
        evoluir.
      </S.Paragrafe>

      <S.AbilitiesWrapper>
        <S.Title>Habilidades</S.Title>
        <S.AbilitiesUl>
          <S.AbilitiesLi>HTML5 (Web Components)</S.AbilitiesLi>
          <S.AbilitiesLi>CSS (Sass, Bootstrap, Materialize)</S.AbilitiesLi>
          <S.AbilitiesLi>Javascript, Typescript (Angular, React)</S.AbilitiesLi>
          <S.AbilitiesLi>Nodejs (Express, Nestjs, Nextjs)</S.AbilitiesLi>
          <S.AbilitiesLi>Git (Git flow, GitHub)</S.AbilitiesLi>
          <S.AbilitiesLi>Database (MySQL, PostgreSQL, MongoDB)</S.AbilitiesLi>
          <S.AbilitiesLi>Design Responsivo (Mobile First)</S.AbilitiesLi>
        </S.AbilitiesUl>
      </S.AbilitiesWrapper>

      <S.Paragrafe>
        Gosto sempre de aprender coisas novas e me aperfeiçoar nas que já
        conheço. 😉
      </S.Paragrafe>

      <ProfessionalExperience />
      <AcademicFormation />
      <AllSocialLinks />
    </S.MainContent>
  );
};

export default AboutPageContent;
