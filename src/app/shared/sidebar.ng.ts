import { Component } from '@angular/core';
import Navigation from '@app/shared/navigation.ng';
import Profile from '@app/shared/profile.ng';
import SocialLinks from '@app/shared/social-links.ng';

@Component({
  selector: 'sidebar',
  imports: [Profile, SocialLinks, Navigation],
  template: `
    <profile />
    <social-links />
    <navigation />
  `,
  styles: [
    `:host {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      padding: 2rem;
      @media (max-width: 1170px) {
        align-items: flex-start;
        justify-content: center;
        padding: 1rem;
        navigation, social-links {
          display: none;
          visibility: hidden;
        }
      }
    }`
  ]
})
export default class Sidebar {}
