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
        grid-template-rows: 100dvh;
        grid-template-areas: 'sidebar content menubar';
        max-height: 100dvh;
        max-width: 100dvw;
        overflow: hidden;
        background: var(--paper-color);
        @media (max-width: 1170px) {
          grid-template-columns: auto;
          grid-template-rows: 3.75rem 1fr 3.75rem;
          grid-template-areas: 'sidebar' 'content' 'menubar';
        }
      }
      .sidebar {
        display: block;
        grid-area: sidebar;
        background: var(--paper-color);
      }
      .content {
        display: block;
        grid-area: content;
        background: var(--background-color);
        overflow: auto;
      }
      .menubar {
        display: block;
        grid-area: menubar;
        background: var(--paper-color);
      }
    `,
  ],
})
export default class LayoutComponent {}
