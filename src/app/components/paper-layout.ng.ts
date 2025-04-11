import { Component, input } from '@angular/core';

@Component({
  selector: 'paper-layout',
  template: `
    <div class="thumbnail">
      <img [src]="image()" [alt]="alt()" width="1920" height="1080" loading="eager" fetchPriority="high" />
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
  styles: [`
    :host {
      display: flex;
      flex-flow: column nowrap;
      position: relative;
      align-items: center;
    }
    .thumbnail {
      z-index: 1;
      width: 100%;
      height: 450px;
      overflow: hidden;
      position: relative;
      img {
        aspect-ratio: 16 / 9;
        object-fit: cover;
        position: absolute;
        height: 100%;
        width: 100%;
        inset: 0px;
      }
    }
    .paper-box {
      z-index: 2;
      margin: -200px auto 0px;
      max-width: 1200px;
      width: 90%;
      box-shadow: 0 14px 28px rgba(0, 0, 0, 0.1), 0 10px 10px rgba(0, 0, 0, 0.1);
    }
    .paper-header {
      display: flex;
      flex-flow: column nowrap;
      align-items: flex-start;
      justify-content: center;
      gap: 1.4rem;
      color: var(--color2-contrast);
      background: var(--color2);
      padding: 25px;
      padding-bottom: 0px;
      h1 {
        font-family: var(--font-serif);
        font-weight: 800;
        letter-spacing: 0.1rem;
        line-height: 1.4;
        word-break: break-word;
        font-size: 2.2rem;
      }
      p {
        font-family: var(--font-sans-serif);
        line-height: 1.4;
        font-size: 1.5rem;
        font-weight: 300;
      }
    }
    .paper-content {
      color: var(--color2-contrast);
      background: var(--color2);
      padding: 25px;
    }
  `],
})
export default class PaperLayout {
  alt = input('Featured Image');
  image = input('/img/post-bg-01.jpg');
}
