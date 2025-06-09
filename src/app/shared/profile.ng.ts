import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import Avatar from '@shared/avatar.ng';

@Component({
  selector: 'profile',
  imports: [RouterLink, Avatar],
  template: `
    <a [routerLink]="['/blog']">
      <avatar />
      <h1>{{ userInfo.name }}</h1>
      <h2>{{ userInfo.position }}</h2>
    </a>
    <p>{{ userInfo.description }}</p>
  `,
  styles: [
    `
      :host {
        display: block;
        text-align: center;
      }
      a {
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: 1fr auto auto;
        grid-template-areas: 'avatar' 'name' 'position';
        gap: 0 1rem;
        color: var(--color1-contrast);
        text-decoration: none;
        transition: color 0.5s;
        &:hover {
          color: var(--color3-light);
        }
        avatar {
          grid-area: avatar;
        }
        h1 {
          grid-area: name;
          display: block;
          font-family: var(--font-serif);
          font-size: 1.6rem;
          margin-top: 1.5rem;
          font-weight: normal;
        }
        h2 {
          grid-area: position;
          display: block;
          font-family: var(--font-sans-serif);
          font-size: 1rem;
          margin-top: 1rem;
          font-weight: normal;
        }
      }
      p {
        color: var(--color1-contrast);
        margin: 1.6rem 0rem 2rem;
        font-family: var(--font-sans-serif);
        font-size: 1rem;
        text-wrap: balance;
        font-weight: 300;
        line-height: 1.4;
      }
      @media (max-width: 1170px) {
        a {
          grid-template-columns: auto 1fr;
          grid-template-rows: auto auto;
          grid-template-areas: 'avatar name' 'avatar position';
          --avatar-size: 2rem;
          h1 {
            font-size: 1rem;
            margin-top: 0;
            text-align: left;
            height: 1rem;
          }
          h2 {
            font-size: 0.8rem;
            height: 0.8rem;
            margin-top: 0;
            text-align: left;
          }
        }
        p {
          display: none;
          visibility: hidden;
        }
      }
    `,
  ],
})
export default class Profile {
  userInfo = {
    name: `Rodrigo Alves`,
    position: `Desenvolvedor Web Full Stack`,
    description: `Sou um Full Stack Web Developer que gosta de aprender novas formas de programar. Tento me esforçar para ser um bom artista na web.`,
  };
}
