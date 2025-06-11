import { booleanAttribute, Component, input, signal } from '@angular/core';
import { SocialLinksList } from '@app/data/social-links';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  faBrandDiscord,
  faBrandFacebook,
  faBrandGithub,
  faBrandInstagram,
  faBrandLinkedin,
  faBrandPaypal,
  faBrandSpotify,
  faBrandStackOverflow,
  faBrandSteam,
  faBrandTelegram,
  faBrandTwitch,
  faBrandTwitter,
  faBrandWhatsapp,
} from '@ng-icons/font-awesome/brands';
import { faEnvelope } from '@ng-icons/font-awesome/regular';
import { faSolidChessBoard } from '@ng-icons/font-awesome/solid';

@Component({
  selector: 'social-links',
  imports: [NgIcon],
  template: `
    @for (icon of socialLinksList(); track icon.url) { @if (!showAll() && icon.show) {
    <a [href]="icon.url" target="_blank" rel="noopener noreferrer">
      <ng-icon [name]="icon.icon" />
    </a>
    } } @if (showAll()) {
    <div>
      <h2>Redes Sociais</h2>
      <ul>
        @for (icon of socialLinksList(); track icon.url) {
        <li>
          <a [href]="icon.url" target="_blank" rel="noopener noreferrer">
            <ng-icon [name]="icon.icon" [size]="'36'" />
            <div>
              <h3>{{ icon.label }}</h3>
              <span>{{ icon.value }}</span>
            </div>
          </a>
        </li>
        }
      </ul>
    </div>
    }
  `,
  styles: [
    `
      :host {
        display: flex;
        gap: 1rem;
        color: var(--text-color);
      }
      a {
        color: var(--text-color);
        transition: color 0.5s;
        --ng-icon__size: 2rem;
      }
      a:hover {
        color: var(--primary-color);
      }
      ul {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        grid-template-rows: repeat(3, 1fr);
        gap: 22px 18px;
        li {
          a {
            display: flex;
            flex-flow: row nowrap;
            align-items: center;
            gap: 12px;
          }
        }
      }
    `,
  ],
  providers: [
    provideIcons({
      faBrandLinkedin,
      faBrandGithub,
      faBrandStackOverflow,
      faBrandWhatsapp,
      faBrandTwitter,
      faBrandSpotify,
      faBrandSteam,
      faBrandDiscord,
      faBrandTwitch,
      faBrandInstagram,
      faBrandFacebook,
      faBrandTelegram,
      faBrandPaypal,
      faEnvelope,
      faSolidChessBoard,
    }),
  ],
})
export default class SocialLinks {
  showAll = input(false, { transform: booleanAttribute });
  socialLinksList = signal(SocialLinksList);
}
