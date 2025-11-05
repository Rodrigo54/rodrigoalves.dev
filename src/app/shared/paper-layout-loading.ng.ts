import { Component } from '@angular/core';

@Component({
  selector: 'paper-layout-loading',
  template: `
    <div class="thumbnail">
      <div class="loading-thumbnail"></div>
    </div>
    <div class="paper-box">
      <header class="paper-header">
        <ng-content select="[slot=header]"></ng-content>
      </header>
      <section class="paper-content">
        <ng-content></ng-content>
      </section>
    </div>
  `,
  styles: [
    `
      :host {
        display: flex;
        flex-flow: column nowrap;
        position: relative;
        align-items: center;
        --thumbnail-bg: oklab(from var(--paper-color) calc(l - 0.15) a b);
      }
      .thumbnail {
        display: block;
        z-index: 1;
        width: 100%;
        height: 600px;
        overflow: hidden;
        position: relative;
        background: var(--thumbnail-bg);
        mask-image: linear-gradient(to bottom, var(--thumbnail-bg) 1% 30%, transparent);
      }
      .paper-box {
        display: block;
        z-index: 2;
        margin: -350px auto 60px auto;
        max-width: 1200px;
        width: 90%;
        box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1);
        border-radius: 6px;
        background: var(--paper-color);
      }
      .paper-content {
        display: block;
        color: var(--text-color);
        padding: 25px;
        min-height: 900px;
      }
    `,
  ],
})
export default class PaperLayoutLoading {}
