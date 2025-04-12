import { Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import PostInfo from '@components/post-info.ng';
import { FrontMatter } from '@utils/frontmatter';

type Info = Pick<FrontMatter, 'title' | 'slug' | 'description' | 'featuredImage' | 'createAt' | 'timeToRead' | 'music' | 'tags'>;

@Component({
  selector: 'post-item',
  standalone: true,
  imports: [RouterLink, PostInfo],
  template: `
    <a class="image" [routerLink]="['/blog', info().slug]">
      <img [src]="image()" [alt]="info().title" width="1920" height="1080" loading="eager" fetchPriority="high" />
    </a>
    <a class="title" [routerLink]="['/blog', info().slug]">
      <h2>{{ info().title }}</h2>
      <p>{{ description() }}</p>
    </a>
    <post-info [info]="info()" />
  `,
  styles: [`
    :host {
      width: 100%;
      height: 100%;
      display: grid;
      grid-template-columns: 1fr 2.6fr;
      grid-template-rows: auto 1fr;
      grid-template-areas:
        'image title'
        'image info';
      gap: 12px;
      @media screen and (max-width: 768px) {
        grid-template-columns: 1fr;
        grid-template-rows: 200px auto auto;
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
      color: var(--color1-contrast);
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
      color: hsl(from var(--color1-contrast) h s 80%);
      font-size: 1.2rem;
      line-height: 1.3;
      height: calc(1.3 * 2 * 1.3rem);
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    post-info {
      color: var(--color3-contrast);
      grid-area: info;
      --post-info__font-size: 1rem;
    }
    :is(.image, .title):hover {
      img {
        filter: brightness(0.8);
        transform: scale(1.1);
        transition: all 0.2s ease-in-out;
      }
      h2, p {
        color: var(--color3-light);
      }
    }
  `],
})
export default class PostItem {
  info = input.required<Info>();

  image = computed(() => this.info().featuredImage || '/img/post-bg-01.jpg');
  description = computed(() => this.info().description);
}
