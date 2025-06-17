import { Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FeaturedImage } from '@shared/featured-image.ng';
import PostInfo from '@shared/post-info.ng';
import { FrontMatter } from '@utils/frontmatter.signal';
import { injectLocalStorage } from 'ngxtension/inject-local-storage';

type Info = Pick<
  FrontMatter,
  'title' | 'slug' | 'description' | 'featuredImage' | 'createAt' | 'timeToRead' | 'music' | 'tags'
>;

@Component({
  selector: 'post-item',
  imports: [FeaturedImage, RouterLink, PostInfo],
  host: {
    '[class]': 'gridType()',
  },
  template: `
    <a class="image" [routerLink]="['/blog', info().slug]">
      <featured-image [image]="image()" [alt]="info().title" />
    </a>
    <a class="title" [routerLink]="['/blog', info().slug]">
      <h2>{{ info().title }}</h2>
      <p>{{ description() }}</p>
    </a>
    <post-info [info]="info()" />
  `,
  styles: [
    `
      :host {
        width: 100%;
        height: 100%;
        display: grid;
        grid-template-columns: 320px 1fr;
        grid-template-rows: auto 1fr;
        grid-template-areas:
          'image title'
          'image info';
        gap: 22px;
        @media screen and (max-width: 768px) {
          grid-template-columns: 1fr;
          grid-template-rows: 120px auto 1fr;
          grid-template-areas:
            'image'
            'title'
            'info';
        }
      }
      :host(.cell) {
        grid-template-columns: 1fr;
        grid-template-rows: 120px auto 1fr;
        grid-template-areas:
          'image'
          'title'
          'info';

        @media screen and (max-width: 768px) {
          grid-template-columns: 1fr;
          grid-template-rows: 80px auto 1fr;
          grid-template-areas:
            'image'
            'title'
            'info';
        }
      }
      .title {
        grid-area: title;
        width: 100%;
        height: 100%;
        text-decoration: none;
        display: flex;
        flex-direction: column;
        gap: 12px;
      }
      .image {
        grid-area: image;
        overflow: hidden;
        & img {
          object-fit: cover;
          width: 100%;
          height: 100%;
          aspect-ratio: 16 / 9;
        }
      }
      h2 {
        color: var(--text-color);
        font-family: var(--font-serif);
        font-size: 1.4rem;
        font-weight: 400;
        line-height: 1.2;
        margin: 0px;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      p {
        color: var(--text-color-alt);
        font-size: 1.2rem;
        line-height: 1.3;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      post-info {
        grid-area: info;
        --post-info__font-size: 1rem;
      }
      :host:has(a:hover) {
        img {
          filter: brightness(0.8);
          transform: scale(1.1);
          transition: all 0.2s ease-in-out;
        }
        h2,
        p {
          color: var(--primary-color);
        }
      }
    `,
  ],
})
export default class PostItem {
  info = input.required<Info>();
  gridType = injectLocalStorage<'cell' | 'row'>('grid', { defaultValue: 'row' });

  image = computed(() => this.info().featuredImage || '/img/post-bg-01.jpg');
  description = computed(() => this.info().description);
}
