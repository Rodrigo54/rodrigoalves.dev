import { Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
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
  faBrandPaypal
} from '@ng-icons/font-awesome/brands';

@Component({
  selector: 'social-links',
  imports: [NgIcon],
  template: `
    @for (icon of socialLinksList; track icon.url) {
      @if (icon.show) {
        <a [href]="icon.url" target="_blank" rel="noopener noreferrer">
          <ng-icon [name]="icon.icon" />
        </a>
      }
    }
  `,
  styles: [
    `:host {
      display: flex;
      gap: 1rem;
      color: var(--color1-contrast);
    }
    a {
      color: var(--color1-contrast);
      transition: color 0.5s;
      --ng-icon__size: 2rem;
    }
    a:hover {
      color: var(--color3-light);
    }`
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
      faBrandPaypal
    })
  ]
})
export default class SocialLinks {
  socialLinksList = [
    {
      icon: 'faBrandGithub',
      label: 'Github',
      value: '@rodrigo54',
      url: `https://github.com/rodrigo54`,
      show: true,
    },
    {
      icon: 'faBrandStackOverflow',
      label: 'StackOverflow',
      value: '@rodrigo-alves-mesquita',
      url: `https://pt.stackoverflow.com/users/28224/rodrigo-alves-mesquita`,
      show: true,
    },
    {
      icon: 'faBrandWhatsapp',
      label: 'WhatsApp',
      value: '+55 98 98740-6885',
      url: `https://api.whatsapp.com/send?phone=5598987406885`,
      show: false,
    },
    {
      icon: 'faBrandTwitter',
      label: 'Twitter',
      value: '@rodrigo254mix',
      url: `https://twitter.com/rodrigo254mix`,
      show: true,
    },
    {
      icon: 'faBrandLinkedin',
      label: 'Linkedin',
      value: '@rodrigo54',
      url: `https://br.linkedin.com/in/rodrigo54`,
      show: true,
    },
    {
      icon: 'faBrandSpotify',
      label: 'Spotify',
      value: '@rodrigo54mix',
      url: `https://open.spotify.com/user/rodrigo54mix`,
      show: true,
    },
    {
      icon: 'faBrandSteam',
      label: 'Steam',
      value: '@rodrigo54mix',
      url: `https://steamcommunity.com/id/rodrigo54mix/`,
      show: false,
    },
    {
      icon: 'faBrandDiscord',
      label: 'Discord',
      value: '@rodrigo54mix',
      url: `https://discordapp.com/users/229740497571282945`,
      show: false,
    },
    {
      icon: 'faBrandChess',
      label: 'Chess.com',
      value: '@rodrigoalvesmesquita',
      url: `https://www.chess.com/member/rodrigoalvesmesquita`,
      show: false,
    },
    {
      icon: 'faBrandTwitch',
      label: 'Twitch',
      value: '@rodrigomix',
      url: `https://www.twitch.tv/rodrigomix`,
      show: false,
    },
    {
      icon: 'faBrandInstagram',
      label: 'Instagram',
      value: '@rodrigo.mix',
      url: `https://www.instagram.com/rodrigo.mix/`,
      show: false,
    },
    {
      icon: 'faBrandFacebook',
      label: 'Facebook',
      value: '@rodrigo54',
      url: `https://www.facebook.com/rodrigo54`,
      show: false,
    },
    {
      icon: 'faBrandTelegram',
      label: 'Telegram',
      value: '@rodrigo54',
      url: `https://t.me/rodrigo54`,
      show: false,
    },
    {
      icon: 'faBrandEmail',
      label: 'Email',
      value: 'rodrigo54mix@gmail.com',
      url: `mailto:rodrigo54mix@gmail.com`,
      show: false,
    },
    {
      icon: 'faBrandPaypal',
      label: 'Paypal',
      value: 'rodrigo54mix@gmail.com',
      url: `https://www.paypal.com/donate?hosted_button_id=XZSKVB3ARK4TJ`,
      show: false,
    },
  ];
}
