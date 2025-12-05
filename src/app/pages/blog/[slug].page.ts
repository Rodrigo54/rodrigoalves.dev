import { MarkdownComponent } from '@analogjs/content';
import { Component } from '@angular/core';
import { Comments } from '@shared/comments.ng';
import PaperLayoutLoading from '@shared/paper-layout-loading.ng';
import PaperLayout from '@shared/paper-layout.ng';
import PostInfo from '@shared/post-info.ng';
import { RecommendedPosts } from '@shared/recommended-posts.ng';
import { frontMatterSignal } from '@utils/frontmatter.signal';
import { resolvePageMeta } from '@utils/meta-tags.resolvers';

export const routeMeta = resolvePageMeta();

@Component({
  imports: [PaperLayout, PaperLayoutLoading, PostInfo, MarkdownComponent, RecommendedPosts, Comments],
  template: `
    @if (post(); as postItem) {
    <paper-layout [image]="postItem.featuredImage.raw" [alt]="postItem.title">
      <ng-container slot="header">
        <h1>{{ postItem.title }}</h1>
        <p>{{ postItem.description }}</p>
        <post-info [info]="postItem" />
      </ng-container>
      <article>
        <analog-markdown [content]="postItem.body" />
      </article>
    </paper-layout>
    <recommended-posts [nextPost]="postItem.nextPost" [prevPost]="postItem.prevPost" />
    <comments />
    } @else {
    <paper-layout-loading />
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
