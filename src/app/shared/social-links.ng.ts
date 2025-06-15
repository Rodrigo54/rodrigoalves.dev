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
  host: {
    '[class.show-all]': 'showAll()',
  },
  template: `
    @for (icon of socialLinksList(); track icon.url) { @if (!showAll() && icon.show) {
    <a [href]="icon.url" target="_blank" rel="noopener noreferrer">
      <ng-icon [name]="icon.icon" [size]="'36'" />
    </a>
    } } @if (showAll()) {
    <div class="social-links">
      <h2>Redes Sociais</h2>
      <ul>
        @for (icon of socialLinksList(); track icon.url) {
        <li>
          <a [href]="icon.url" target="_blank" rel="noopener noreferrer">
            <ng-icon [name]="icon.icon" [size]="'32'" />
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
        justify-content: space-between;
        color: var(--text-color);
        width: 100%;
        a {
          color: var(--text-color);
          transition: color 0.5s;
          &:hover {
            color: var(--primary-color);
          }
        }
      }

      :host(.show-all) {
        container-type: inline-size;
        display: block;
        width: 100%;
        .social-links {
          display: contents;
          ul {
            list-style: none;
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            grid-template-rows: repeat(3, 1fr);
            gap: 16px 14px;
            li {
              display: contents;
              a {
                display: flex;
                flex-flow: row nowrap;
                align-items: center;
                gap: 8px;
                ng-icon {
                  flex-shrink: 0;
                }
                div {
                  display: block;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  line-height: 1.2;
                  span {
                    font-size: 0.9rem;
                  }
                }
              }
            }
          }
          @container (width < 1150px) {
            ul {
              grid-template-columns: repeat(3, 1fr);
              grid-template-rows: repeat(4, 1fr);
            }
          }
          @container (width < 830px) {
            ul {
              grid-template-columns: repeat(2, 1fr);
              grid-template-rows: repeat(auto-fill, 1fr);
            }
          }
          @container (width < 480px) {
            ul {
              grid-template-columns: repeat(1, 1fr);
              grid-template-rows: repeat(auto-fill, 1fr);
            }
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
