import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { matArrowLeft, matArrowRight } from '@ng-icons/material-icons/baseline';
import { FrontMatter } from '@utils/frontmatter.signal';

@Component({
  selector: 'recommended-posts',
  imports: [NgIcon],
  template: `
    <div class="recommended-posts">
      <h2>Próximos Artigos</h2>
      <div class="recommended-posts-list">
        @if (prevPost(); as prevPostItem) {
        <a [href]="makeHref(prevPostItem.slug)" class="prev-post">
          <ng-icon name="matArrowLeft" size="60" />
          <div>
            <h5>{{ prevPostItem.title }}</h5>
          </div>
        </a>

        } @if (nextPost(); as nextPostItem) {
        <a [href]="makeHref(nextPostItem.slug)" class="next-post">
          <ng-icon name="matArrowRight" size="60" />
          <div>
            <h5>{{ nextPostItem.title }}</h5>
          </div>
        </a>
        }
      </div>
    </div>
  `,
  styles: `
  h2 {
    margin: 2rem auto 1rem;
    font-size: 1.7rem;
    font-family: var(--font-serif);
    font-weight: 400;
    letter-spacing: 0.05rem;
    line-height: 1.4;
  }

  .recommended-posts-list {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr;
    align-items: center;
    align-content: stretch;
    @media (max-width: 768px) {
      grid-template-columns: 1fr;
      grid-template-rows: repeat(2, auto);
    }
    .prev-post {
      grid-column: 1;
      text-align: left;
      grid-template-areas: "icon title";
      @media (max-width: 768px) {
        grid-column: 1;
      }
    }
    .next-post {
      grid-column: 2;
      text-align: right;
      grid-template-columns: 1fr 60px;
      grid-template-areas: "title icon";
      @media (max-width: 768px) {
        grid-column: 1;
      }
    }

    a {
      display: grid;
      grid-template-columns: 60px 1fr;
      grid-template-rows: auto;
      grid-template-areas: "icon title";
      align-content: stretch;
      align-items: center;
      padding: 10px 8px;
      grid-gap: 0px;
      height: 100%;
      color: var(--text-color);
      border-radius: 0.5rem;
      ng-icon {
        grid-area: icon;
        align-self: center;
        justify-self: center;
      }
      div {
        grid-area: title;
      }
      h5 {
        margin: 0;
        font-weight: 500;
        font-size: 1.1rem;
      }
      &:hover {
        color: var(--primary-color);
      }
    }
  }

  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    provideIcons({
      matArrowLeft,
      matArrowRight,
    }),
  ],
})
export class RecommendedPosts {
  nextPost = input<FrontMatter | null>(null);
  prevPost = input<FrontMatter | null>(null);
  newPost = input<FrontMatter | null>(null);

  makeHref(slug: string): string {
    return `/blog/${slug}`;
  }
}
