import { RouteMeta } from '@analogjs/router';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { PostsList } from '@app/shared/posts-list.ng';
import { frontMatterSignal } from '@utils/frontmatter.signal';
import { map } from 'rxjs';
import { environment } from 'src/env/env';
import { postMetaResolver, postTitleResolver } from '../resolvers';

export const routeMeta: RouteMeta = {
  title: postTitleResolver,
  meta: postMetaResolver,
};

@Component({
  selector: 'blog-index-page',
  template: `<posts-list [postsPaginated]="postsPaginated()" />`,
  styles: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PostsList],
})
export default class BlogIndexPage {
  activeRoute = inject(ActivatedRoute);
  currentPage = toSignal(
    this.activeRoute.queryParamMap.pipe(
      map((params) => parseInt(params.get('page') ?? '1', 10))
    ),
    { initialValue: 1 }
  );
  tag = toSignal(
    this.activeRoute.paramMap.pipe(map((params) => params.get('tag') ?? '')),
    { initialValue: '' }
  );
  posts = frontMatterSignal('all');
  postsPaginated = computed(() => {
    const postsPerPage = environment.postsPerPage;
    const currentPage = this.currentPage();
    const tag = this.tag();
    const publishedPosts = this.posts().filter((post) =>
      tag ? post.tags.includes(tag) : true
    );
    const totalPages = Math.ceil(publishedPosts.length / postsPerPage);
    const startIndex = (currentPage - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    const postsPaginated = publishedPosts.slice(startIndex, endIndex);
    return {
      currentPage,
      postsPaginated,
      postsPerPage,
      totalPages,
    };
  });
}
