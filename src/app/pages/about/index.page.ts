import { Component } from '@angular/core';
import FormationComponent from '@shared/formation.ng';
import PaperLayout from '@shared/paper-layout.ng';
import SocialLinks from '@shared/social-links.ng';
import WorkExperience from '@shared/work-experience.ng';
import { resolvePageMeta } from '@utils/meta-tags.resolvers';

export const routeMeta = resolvePageMeta({
  title: 'Sobre Mim',
  featuredImage: '/img/about-bg.webp',
  description: 'Basta querer mudar o mundo através da web.',
});

@Component({
  selector: 'about-index-page',
  imports: [PaperLayout, SocialLinks, WorkExperience, FormationComponent],
  template: `
    <paper-layout [image]="featuredImage" [alt]="title">
      <ng-container slot="header">
        <h1>{{ title }}</h1>
        <p>{{ subtitle }}</p>
      </ng-container>
      <article>
        <p>Meu nome é Rodrigo Alves Mesquita, nasci em São Luis - MA.</p>
        <p>
          Sou um desenvolvedor web apaixonado por criar experiências digitais que impactam positivamente a vida das
          pessoas. Eterno aluno de Typescript e Javascript, tento me esforçar para ser um bom artista da web. Meu
          objetivo é me tornar um profissional capaz de criar soluções eficazes e inovadoras para os problemas de hoje.
          Gosto de trabalhar em equipe e compartilhar minhas ideias com outras pessoas. Estou sempre aberto a novas
          tecnologias e tendências. No meu tempo livre, gosto de jogar video game, ler livros, assistir filmes e series,
          além de fazer trabalhos manuais. Meu sonho é viajar o mundo e conhecer culturas e povos diferentes.
        </p>
        <p>
          Acredito que a tecnologia tem o poder de mudar o mundo e me esforço para me tornar parte desse movimento.
          Aprender sempre é a melhor maneira de evoluir.
        </p>
        <div class="abilities-wrapper">
          <h2>Habilidades</h2>
          <ul>
            <li>HTML5 (Web Components)</li>
            <li>CSS (Sass, Bootstrap, Materialize)</li>
            <li>Javascript, Typescript (Angular, React)</li>
            <li>Nodejs (Express, Nestjs, Nextjs)</li>
            <li>Git (Git flow, GitHub)</li>
            <li>Database (MySQL, PostgreSQL, MongoDB)</li>
            <li>Design Responsivo (Mobile First)</li>
          </ul>
        </div>
        <p>Gosto sempre de aprender coisas novas e me aperfeiçoar nas que já conheço. 😉</p>
        <work-experience />
        <formation />
        <social-links showAll />
      </article>
    </paper-layout>
  `,
  styles: [
    `
      :host {
        display: contents;
      }
      article {
        p {
          color: var(--text-color);
          font-size: 1.1rem;
          font-weight: 300;
          line-height: 1.7;
          letter-spacing: 0.05rem;
          word-break: break-word;
          margin: 0 auto 0.4rem;
        }
        h2 {
          font-family: var(--font-serif);
          color: var(--text-color);
          font-weight: 400;
          letter-spacing: 0.05rem;
          line-height: 1.7;
          word-break: break-word;
          font-size: 1.7rem;
          margin: 2rem auto 1rem;
          @media (max-width: 768px) {
            font-size: 1.4rem;
            margin: 1.5rem auto 0.8rem;
          }
        }
        .abilities-wrapper {
          color: var(--text-color);
          font-size: 1.1rem;
          font-weight: 300;
          line-height: 1.7;
          letter-spacing: 0.05rem;
          word-break: break-word;
          ul {
            list-style: disc;
            padding-left: 2.5rem;
            margin: 0 auto 1.6rem;
          }
          li {
            padding: 0.4rem 0;
          }
        }
      }
    `,
  ],
})
export default class AboutIndexPage {
  featuredImage = '/img/about-bg.webp';
  title = 'Sobre Mim';
  subtitle = 'Basta querer mudar o mundo através da web.';
}
