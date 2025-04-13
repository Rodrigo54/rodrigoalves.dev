import { Component } from '@angular/core';
import Menubar from '@app/components/menubar.ng';
import Sidebar from '@app/components/sidebar.ng';

@Component({
  selector: 'layout',
  imports: [Menubar, Sidebar],
  template: `
    <aside class="sidebar">
      <sidebar />
    </aside>
    <main class="content" id="content">
      <ng-content></ng-content>
    </main>
    <aside class="menubar">
      <menubar />
    </aside>
  `,
  styles: [
    `:host {
      display: grid;
      grid-template-columns: 20rem 1fr 3.75rem;
      height: 100vh;
      width: 100vw;
      overflow: hidden;
      background: var(--color1);
      @media (max-width: 1170px) {
        grid-template-columns: 1fr;
        grid-template-rows: 3.75rem 1fr 3.75rem;
      }
    }
    .sidebar {
      background: var(--color1);
    }
    .content {
      background: var(--color1-shade);
      overflow: auto;
    }
    .menubar {
      background: var(--color1);
    }`
  ]
})
export default class LayoutComponent {}
