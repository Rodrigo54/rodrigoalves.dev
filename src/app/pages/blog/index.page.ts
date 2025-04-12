import { Component } from '@angular/core';
import PostItem from '@components/post-item.ng';
import { frontMatterSignal } from '@utils/frontmatter';
import { postMetaResolver, postTitleResolver } from './resolvers';
import { RouteMeta } from '@analogjs/router';

export const routeMeta: RouteMeta = {
  title: postTitleResolver,
  meta: postMetaResolver,
};

@Component({
  selector: 'blog-index-page',
  template: `
    <div class="posts">
      @for (post of posts(); track post.createAt) {
        <post-item [info]="post" />
      }
    </div>
  `,
  styles: [`
    :host {
      display: flex;
      flex-direction: column;
      padding: 20px;
      width: 100%;
    }
    h1 {
      font-size: 2rem;
      margin-bottom: 20px;
      color: var(--color3);
    }
    .posts {
      display: grid;
      grid-template-columns: 1fr;
      grid-auto-rows: 230px;
      gap: 20px;
      @media (max-width: 768px) {
        grid-auto-rows: 1fr;
      }
    }
  `],
  imports: [PostItem],
})
export default class BlogIndexPage {
  posts = frontMatterSignal('all');
}
