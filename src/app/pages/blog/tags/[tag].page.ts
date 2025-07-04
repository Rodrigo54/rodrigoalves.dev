import { RouteMeta } from '@analogjs/router';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  numberAttribute,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostsList } from '@shared/posts-list.ng';
import { frontMatterSignal } from '@utils/frontmatter.signal';
import { paramSignal } from '@utils/param.signal';
import { queryParamSignal } from '@utils/query-param.signal';
import { environment } from 'src/env/env';
import { postMetaResolver, postTitleResolver } from '../resolvers';

export const routeMeta: RouteMeta = {
  title: postTitleResolver,
  meta: postMetaResolver,
};

@Component({
  selector: 'blog-tag-page',
  template: `<posts-list [postsPaginated]="postsPaginated()" />`,
  styles: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PostsList],
})
export default class BlogTagPage {
  activeRoute = inject(ActivatedRoute);
  currentPage = queryParamSignal({
    defaultValue: 1,
    queryParamKey: 'page',
    parse: numberAttribute,
  });
  tag = paramSignal({ defaultValue: '', paramKey: 'tag' });
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
