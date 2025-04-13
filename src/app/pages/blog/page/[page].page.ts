import { RouteMeta } from '@analogjs/router';
import { Component } from '@angular/core';
import BlogIndexPage from '@app/pages/blog/index.page';
import { postMetaResolver, postTitleResolver } from '@app/pages/blog/resolvers';

export const routeMeta: RouteMeta = {
  title: postTitleResolver,
  meta: postMetaResolver,
};

@Component({
  selector: 'blog-index-pages',
  template: `<blog-index-page />`,
  imports: [BlogIndexPage],
})
export default class BlogIndexPages {
}
