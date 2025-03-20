import { ContentFile, injectContent, injectContentFiles } from '@analogjs/content';
import { inject, Injector, runInInjectionContext, Signal, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

type AdjacentPosts = { nextPost?: FrontMatter, prevPost?: FrontMatter };

export interface FrontMatter {
  slug: string;
  title: string;
  subtitle?: string;
  author: string;
  description: string;
  featuredImage: string;
  comments: boolean;
  tags: string[];
  createAt: string;
  body?: string;
  timeToRead: {
    minutes: number;
    words: number;
  };
  fullPath: string;
  music: {
    title: string;
    url: string;
  };
  nextPost: FrontMatter | null;
  prevPost: FrontMatter | null;
}


export function frontMatterSignal<T extends 'all' | 'slug' >(type = 'all' as T, injector?: Injector): T extends 'slug' ? Signal<FrontMatter> : Signal<FrontMatter[]> {
  injector ??= inject(Injector);
  const result = runInInjectionContext(injector, () => {
    const posts = injectContentFiles();
    const formattedPosts = makeArrayFrontMatter(posts);
    if (type === 'slug') {
      const post$ = injectContent('slug');
      const subscription$ = post$.pipe(
        map(post => {
          const adjacentPosts = formattedPosts.reduce<AdjacentPosts>((acc, curr, index) => {
            if (curr.slug === post.slug) {
              acc.nextPost = formattedPosts[index - 1] ?? null;
              acc.prevPost = formattedPosts[index + 1] ?? null;
            }
            return acc;
          }, {});
          return makeFrontMatter(post, adjacentPosts);
        }),
      );
      return toSignal(subscription$);
    }

    return signal(makeArrayFrontMatter(posts)).asReadonly();
  });

  return result as T extends 'slug' ? Signal<FrontMatter> : Signal<FrontMatter[]>;
}

export function makeFrontMatter(data?: ContentFile, adjacentPosts?: AdjacentPosts): FrontMatter {
  if (!data?.attributes) {
    return {
      title: 'Blog',
      description: 'Sou um Full Stack Web Developer que gosta de aprender novas formas de programar. Tento me esforçar para ser um bom artista na web.',
      slug: '',
      author: 'Rodrigo Alves',
      createAt: new Date().toISOString(),
      music: {
        title: '',
        url: '',
      },
      fullPath: '',
      timeToRead: {
        words: 0,
        minutes: 0,
      },
      featuredImage: '/img/snapshot.jpg',
      comments: false,
      tags: [],
      nextPost: null,
      prevPost: null,
    };
  }

  return {
    title: data.attributes['title'] ?? 'Default Title',
    description: data.attributes['description'] ?? '',
    slug: data['slug'] ?? '',
    featuredImage: data.attributes['featuredImage'] ?? '',
    comments: data.attributes['comments'] ?? false,
    tags: data.attributes['tags'] ?? [],
    author: data.attributes['author'] ?? '',
    createAt: data.attributes['createAt'] ?? new Date().toISOString(),
    body: data.content as string,
    fullPath: data.filename,
    timeToRead: data.attributes['timeToRead'] ?? {
      words: 0,
      minutes: 0,
    },
    music: data.attributes['music'] ?? {
      title: '',
      url: '',
    },
    nextPost: adjacentPosts?.nextPost ?? null,
    prevPost: adjacentPosts?.prevPost ?? null,
  };
}

export function makeArrayFrontMatter(data: ContentFile[]): FrontMatter[] {
  return data
    .map(post => makeFrontMatter(post))
    .toSorted((a, b) => new Date(b.createAt).getTime() - new Date(a.createAt).getTime());
}
