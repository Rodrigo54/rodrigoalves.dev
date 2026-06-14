import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import LayoutComponent from '@shared/layout.ng';

@Component({
  selector: 'app-about-page',
  imports: [LayoutComponent, RouterOutlet],
  template: `
    <layout>
      <router-outlet></router-outlet>
    </layout>
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
  styles: [``],
})
export default class AboutPage {}
