import { ChangeDetectionStrategy, Component, computed, inject, numberAttribute } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostsList } from '@shared/posts-list.ng';
import { frontMatterSignal } from '@utils/frontmatter.signal';
import { resolvePageMeta } from '@utils/meta-tags.resolvers';
import { queryParamSignal } from '@utils/query-param.signal';
import { environment } from 'src/env/env';

export const routeMeta = resolvePageMeta();

@Component({
  selector: 'blog-index-page',
  template: `<posts-list [postsPaginated]="postsPaginated()" />`,
  styles: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PostsList],
})
export default class BlogIndexPage {
  activeRoute = inject(ActivatedRoute);
  currentPage = queryParamSignal({
    defaultValue: 1,
    queryParamKey: 'page',
    parse: numberAttribute,
  });
  posts = frontMatterSignal('all');
  postsPaginated = computed(() => {
    const postsPerPage = environment.postsPerPage;
    const publishedPosts = this.posts();
    const totalPages = Math.ceil(publishedPosts.length / postsPerPage);
    const currentPage = this.currentPage();
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
