import { MarkdownComponent } from '@analogjs/content';
import { RouteMeta } from '@analogjs/router';
import { Component } from '@angular/core';
import { Comments } from '@shared/comments.ng';
import PaperLayout from '@shared/paper-layout.ng';
import PostInfo from '@shared/post-info.ng';
import { RecommendedPosts } from '@shared/recommended-posts.ng';
import { frontMatterSignal } from '@utils/frontmatter.signal';
import { postMetaResolver, postTitleResolver } from './resolvers';

export const routeMeta: RouteMeta = {
  title: postTitleResolver,
  meta: postMetaResolver,
};

@Component({
  imports: [PaperLayout, PostInfo, MarkdownComponent, RecommendedPosts, Comments],
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
      <recommended-posts [nextPost]="postItem.nextPost" [prevPost]="postItem.prevPost" />
    </paper-layout>
    <comments />
    } @else {
    <p>Loading...</p>
    }
  `,
  styles: [``],
})
export default class BlogSlugPage {
  post = frontMatterSignal('slug');

  makeHref(slug: string): string {
    return `/blog/${slug}`;
  }
}
