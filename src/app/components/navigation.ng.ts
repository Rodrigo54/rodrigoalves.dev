import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'navigation',
  imports: [RouterLink, RouterLinkActive],
  template: `
  <nav>
    <ul>
      @for (link of links; track link.url) {
        <li>
          @if (link.external) {
            <a [href]="link.url" target="_blank" rel="noopener noreferrer">
              {{ link.label }}
            </a>
          } @else {
            <a [routerLink]="[link.url]" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">
              {{ link.label }}
            </a>
          }
        </li>
      }
    </ul>
  </nav>
  `,
  styles: [
    `
      :host {
        display: block;
        padding: 1.3rem 0rem;
        width: 100%;
      }
      ul {
        width: 100%;
        font-weight: 300;
      }
      li {
        list-style: none;
        padding: 0.5rem 0;
        text-align: center;
      }
      a {
        color: var(--color1-contrast);
        font-family: var(--font-sans-serif);
        font-size: 1.2rem;
        text-decoration: none;
        transition: all 0.3s;
      }
      a:hover,
      a.active {
        color: var(--color3-light);
      }
      a.active {
        font-weight: bold;
      }
    `,
  ],
})
export default class Navigation {
  links = [
    {
      label: 'Home',
      url: '/blog',
      external: false,
    },
    {
      label: 'Sobre Mim',
      url: '/about',
      external: false,
    },
    {
      label: 'Resume',
      url: 'https://resume.rodrigoalves.dev/',
      external: true,
    },
  ];
}
