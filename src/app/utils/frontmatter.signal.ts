import { ContentFile, injectContent, injectContentFiles } from '@analogjs/content';
import { computed, inject, Injector, runInInjectionContext, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { environment } from 'src/env/env';

type AdjacentPosts = { nextPost?: FrontMatter; prevPost?: FrontMatter };

export interface FrontMatter {
  slug: string;
  title: string;
  author: string;
  description: string;
  comments: boolean;
  tags: string[];
  createAt: string;
  body?: string;
  draft?: boolean;
  fullPath: string;
  featuredImage: {
    raw: string;
    name: string;
    url: string;
    author: string;
  };
  timeToRead: {
    minutes: number;
    words: number;
  };
  music: {
    title: string;
    url: string;
  };
  nextPost: FrontMatter | null;
  prevPost: FrontMatter | null;
}

export function frontMatterSignal<T extends 'all' | 'slug'>(type = 'all' as T, injector?: Injector) {
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
          return makeFrontMatterFromContentFile(post, adjacentPosts);
        }),
      );
      return toSignal(subscription$);
    }

    return computed(() => makeArrayFrontMatter(posts));
  });

  return result as T extends 'slug' ? Signal<FrontMatter> : Signal<FrontMatter[]>;
}

export function makeFrontMatter(data?: Partial<FrontMatter>, adjacentPosts?: AdjacentPosts): FrontMatter {
  // Valores padrão
  const defaults: FrontMatter = {
    title: 'Blog',
    description:
      'Sou um Full Stack Web Developer que gosta de aprender novas formas de programar. Tento me esforçar para ser um bom artista na web.',
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
    featuredImage: {
      name: 'snapshot.jpg',
      author: 'Rodrigo Alves',
      url: '/img/snapshot.jpg',
      raw: '/img/snapshot.jpg',
    },
    comments: false,
    tags: [],
    nextPost: null,
    prevPost: null,
  };

  if (!data || Object.keys(data).length === 0) {
    return defaults;
  }

  return {
    ...defaults,
    title: data.title ?? defaults.title,
    description: data.description ?? defaults.description,
    slug: data.slug ?? defaults.slug,
    comments: data.comments ?? defaults.comments,
    tags: data.tags ?? defaults.tags,
    author: data.author ?? defaults.author,
    createAt: data.createAt ?? defaults.createAt,
    fullPath: data.fullPath ?? defaults.fullPath,
    featuredImage: data.featuredImage ?? defaults.featuredImage,
    draft: data.draft ?? defaults.draft,
    timeToRead: data.timeToRead ?? defaults.timeToRead,
    music: data.music ?? defaults.music,
    nextPost: adjacentPosts?.nextPost ?? defaults.nextPost,
    prevPost: adjacentPosts?.prevPost ?? defaults.prevPost,
    body: data.body as string,
  };
}

export function makeFrontMatterFromContentFile(post?: ContentFile, adjacentPosts?: AdjacentPosts): FrontMatter {
  if (!post) {
    return makeFrontMatter();
  }

  return makeFrontMatter(
    {
      ...post.attributes,
      fullPath: post.filename,
      slug: post.slug,
      body: post.content as string,
    },
    adjacentPosts,
  );
}

export function makeArrayFrontMatter(data: ContentFile[]): FrontMatter[] {
  return data
    .map(post => makeFrontMatterFromContentFile(post))
    .filter(post => !post.draft || (post.draft && environment.allowDraftPosts))
    .toSorted((a, b) => new Date(b.createAt).getTime() - new Date(a.createAt).getTime());
}
