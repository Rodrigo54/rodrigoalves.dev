import { Component } from '@angular/core';
import Menubar from '@shared/menubar.ng';
import Sidebar from '@shared/sidebar.ng';

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
    `
      :host {
        display: grid;
        grid-template-columns: 20rem 1fr 3.75rem;
        height: 100vh;
        width: 100vw;
        overflow: hidden;
        background: var(--paper-color);
        @media (max-width: 1170px) {
          grid-template-columns: 1fr;
          grid-template-rows: 3.75rem 1fr 3.75rem;
        }
      }
      .sidebar {
        background: var(--paper-color);
      }
      .content {
        background: var(--background-color);
        overflow: auto;
      }
      .menubar {
        background: var(--paper-color);
      }
    `,
  ],
})
export default class LayoutComponent {}
