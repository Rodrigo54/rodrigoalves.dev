import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import LayoutComponent from '@app/shared/layout.ng';

@Component({
  selector: 'app-about-page',
  imports: [LayoutComponent, RouterOutlet],
  template: `
    <layout>
      <router-outlet></router-outlet>
    </layout>
  `,
  styles: [
    `
      :host {
        background-color: oklab(from var(--color1) 0.1 a b);
      }
    `,
  ],
})
export default class AboutPage {}
