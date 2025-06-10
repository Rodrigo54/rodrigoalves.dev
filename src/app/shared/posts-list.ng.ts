import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Pagination } from '@shared/pagination.ng';
import PostItem from '@shared/post-item.ng';
import { FrontMatter } from '@utils/frontmatter.signal';
import { injectLocalStorage } from 'ngxtension/inject-local-storage';

@Component({
  selector: 'posts-list',
  imports: [PostItem, Pagination],
  host: {
    '[class]': 'gridType()',
  },
  template: `
    <div class="posts" [class]="gridType()">
      @for (post of postsPaginated().postsPaginated; track post.createAt) {
      <post-item [info]="post" />
      }
    </div>
    <pagination [total]="postsPaginated().totalPages" [page]="postsPaginated().currentPage" />
  `,
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      width: 100%;
      min-height: 100%;
    }
    :host(.cell) {
      .posts{
        display: grid;
        grid-template-columns: repeat(3, minmax(300px, 1fr));
        grid-auto-rows: 1fr;
        @media (max-width: 768px) {
          grid-template-columns: 1fr;
          grid-auto-rows: 250px;
          grid-auto-rows: auto;
        }
      }
    }
    .posts {
      flex: 1;
      display: grid;
      grid-template-columns: 1fr;
      grid-auto-rows: 250px;
      gap: 20px;
      padding: 20px;
      @media (max-width: 768px) {
        grid-auto-rows: auto;
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostsList {
  postsPaginated = input.required<{
    currentPage: number;
    postsPaginated: FrontMatter[];
    postsPerPage: number;
    totalPages: number;
  }>();

  gridType = injectLocalStorage<'cell' | 'row'>('grid', { defaultValue: 'row' });
}
