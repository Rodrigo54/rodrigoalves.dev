import { RouteMeta } from '@analogjs/router';
import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { Pagination } from '@app/shared/pagination.ng';
import PostItem from '@app/shared/post-item.ng';
import { frontMatterSignal } from '@utils/frontmatter';
import { map } from 'rxjs';
import { environment } from 'src/env/env';
import { postMetaResolver, postTitleResolver } from '../resolvers';

export const routeMeta: RouteMeta = {
  title: postTitleResolver,
  meta: postMetaResolver,
};

@Component({
  selector: 'blog-index-page',
  template: `
    <div class="posts">
      @for (post of postsPaginated().postsPaginated; track post.createAt) {
        <post-item [info]="post" />
      }
    </div>
    <pagination [total]="postsPaginated().totalPages" [page]="postsPaginated().currentPage" />
  `,
  styles: [`
    :host {
      display: flex;
      flex-direction: column;

      width: 100%;
      min-height: 100%;

    }
    h1 {
      font-size: 2rem;
      margin-bottom: 20px;
      color: var(--color3);
    }
    .posts {
      flex: 1;
      display: grid;
      grid-template-columns: 1fr;
      grid-auto-rows: 250px;
      gap: 20px;
      padding: 20px;
      @media (max-width: 768px) {
        grid-auto-rows: 1fr;
      }
    }
  `],
  imports: [PostItem, Pagination],
})
export default class BlogIndexPage {
  activeRoute = inject(ActivatedRoute);
  currentPage = toSignal(this.activeRoute.paramMap.pipe(
    map((params) => parseInt(params.get('page') ?? '1', 10)  )
  ), { initialValue: 1 });
  tag = toSignal(this.activeRoute.paramMap.pipe(
    map((params) => params.get('tag') ?? '' )
  ), { initialValue: '' });
  posts = frontMatterSignal('all');
  postsPaginated = computed(() => {
    const postsPerPage = environment.postsPerPage;
    const publishedPosts = this.posts();
    const totalPages = Math.ceil(publishedPosts.length / postsPerPage);
    const currentPage = this.currentPage();
    const tag = this.tag();
    const startIndex = (currentPage - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    const postsPaginated = publishedPosts.filter(
      post => tag ? post.tags.includes(tag) : true
    ).slice(startIndex, endIndex);
    return {
      currentPage,
      postsPaginated,
      postsPerPage,
      totalPages,
    }
  });
}
