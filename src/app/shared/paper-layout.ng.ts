import { Component, input } from '@angular/core';
import { FeaturedImage } from '@shared/featured-image.ng';

@Component({
  selector: 'paper-layout',
  imports: [FeaturedImage],
  template: `
    <div class="thumbnail">
      <featured-image [image]="image()" [alt]="alt()" fullWidth />
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
      }
      .thumbnail {
        display: block;
        z-index: 1;
        width: 100%;
        height: 600px;
        overflow: hidden;
        position: relative;
        background: var(--paper-color);
        mask-image: linear-gradient(var(--paper-color), transparent);

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
        display: block;
        z-index: 2;
        margin: -350px auto 60px auto;
        max-width: 1200px;
        width: 90%;
        box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1);
        border-radius: 6px;
        background: var(--paper-color);
      }
      .paper-header {
        display: flex;
        flex-flow: column nowrap;
        align-items: flex-start;
        justify-content: center;
        gap: 1.4rem;
        color: var(--text-color);
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
          font-family: var(--font-sans);
          line-height: 1.4;
          font-size: 1.5rem;
          font-weight: 300;
        }
      }
      .paper-content {
        display: block;
        color: var(--text-color);
        padding: 25px;
      }
    `,
  ],
})
export default class PaperLayout {
  alt = input('Featured Image');
  image = input('/img/post-bg-01.jpg');
}
