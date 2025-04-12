import { MarkdownComponent } from '@analogjs/content';
import { RouteMeta } from '@analogjs/router';
import { Component } from '@angular/core';
import PaperLayout from '@components/paper-layout.ng';
import PostInfo from '@components/post-info.ng';
import { frontMatterSignal } from '@utils/frontmatter';
import { postMetaResolver, postTitleResolver } from './resolvers';

export const routeMeta: RouteMeta = {
  title: postTitleResolver,
  meta: postMetaResolver,
};

@Component({
  imports: [PaperLayout, PostInfo, MarkdownComponent],
  template: `
    @if (post(); as postItem) {
      <paper-layout [image]="postItem.featuredImage" [alt]="postItem.title">
        <ng-container slot="header">
          <h1>{{ postItem.title }}</h1>
          <p>{{ postItem.description }}</p>
          <post-info [info]="postItem" />
        </ng-container>
        <article>
          <analog-markdown [content]="postItem.body" />
        </article>
        <div class="adjacent-posts">
          @if (postItem.nextPost) {
            <p>Next Post: <a [href]="makeHref(postItem.nextPost.slug)">{{ postItem.nextPost.title }}</a></p>
          }
          @if (postItem.prevPost) {
            <p>Previous Post: <a [href]="makeHref(postItem.prevPost.slug)">{{ postItem.prevPost.title }}</a></p>
          }
        </div>
      </paper-layout>
    } @else {
      <p>Loading...</p>
    }
  `,
  styles: [
    `
      .post__image {
        max-height: 40vh;
      }
    `,
  ],
})
export default class BlogSlugPage {
  post = frontMatterSignal('slug');

  makeHref(slug: string): string {
    return `/blog/${slug}`;
  }
}
