import { NgOptimizedImage } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'avatar',
  imports: [NgOptimizedImage],
  template: ` <img [ngSrc]="'/img/profile-photo.webp'" [alt]="alt()" width="200" height="200" loading="eager" /> `,
  styles: [
    `
      :host {
        display: block;
        height: var(--avatar-size, 9rem);
        width: var(--avatar-size, 9rem);
        margin: auto;
        border: 4px solid var(--paper-color-shade);
        border-radius: 50%;
        position: relative;
        overflow: hidden;
      }
    `,
  ],
})
export default class Avatar {
  alt = input('Profile Photo');
}
