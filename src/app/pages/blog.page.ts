import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import LayoutComponent from '@shared/layout.ng';

@Component({
  selector: 'app-blog-page',
  imports: [LayoutComponent, RouterOutlet],
  template: `
    <layout>
      <router-outlet></router-outlet>
    </layout>
  `,
  styles: [``],
})
export default class BlogPage {}
