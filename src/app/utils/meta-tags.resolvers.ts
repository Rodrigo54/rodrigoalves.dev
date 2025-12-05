import { MetaTag, RouteMeta } from '@analogjs/router';
import { ResolveFn } from '@angular/router';
import { FeaturedImagesMap } from '@app/data/featured-images';
import { injectActivePostAttributes } from '@utils/post-active';
import { environment } from 'src/env/env';

interface PageMetaParams {
  title?: string;
  description?: string;
  featuredImage?: string;
}

export function resolvePageMeta(params?: PageMetaParams): RouteMeta {
  return {
    title: postTitleResolver(params),
    meta: postMetaResolver(params),
  };
}

function postTitleResolver(params?: PageMetaParams): ResolveFn<string> {
  return route => {
    const postAttributes = injectActivePostAttributes(route);
    const titleFromParam = params?.title ?? postAttributes.title;
    const suffixText = 'Rodrigo Alves';
    return `${titleFromParam} | ${suffixText}`;
  };
}

function postMetaResolver(params?: PageMetaParams): ResolveFn<MetaTag[]> {
  return route => {
    const postAttributes = injectActivePostAttributes(route);
    const siteTitle = 'Blog | Rodrigo Alves';
    const title = params?.title ?? postAttributes.title;
    const description = params?.description ?? postAttributes.description;
    const base = environment.siteUrl;
    const imagePath = FeaturedImagesMap.get(postAttributes.featuredImage.raw)?.sizes['320x250'];
    const postImageFromParam = params?.featuredImage ?? imagePath;
    const imageUrl = postImageFromParam ? `${base}${postImageFromParam}` : postAttributes.featuredImage.raw;

    return [
      // HTML Meta Tags
      {
        name: 'description',
        content: description,
      },
      {
        name: 'author',
        content: postAttributes.author,
      },
      // Google / Search Engine Tags
      // Unsupported in Analog Router for now
      // {
      //   itemprop: 'name',
      //   content: postAttributes.title,
      // },
      // {
      //   itemprop: 'description',
      //   content: postAttributes.description,
      // },
      // {
      //   itemprop: 'image',
      //   content: imageUrl,
      // },
      // Open Graph Meta Tags
      {
        property: 'og:locale',
        content: 'pt-BR',
      },
      {
        property: 'og:url',
        content: base,
      },
      {
        property: 'og:type',
        content: 'website',
      },
      {
        property: 'og:title',
        content: title,
      },
      {
        property: 'og:description',
        content: description,
      },
      {
        property: 'og:image',
        content: imageUrl,
      },
      {
        property: 'og:site_name',
        content: siteTitle,
      },
      {
        property: 'og:logo',
        content: `${base}/icons/icon-512x512.png`,
      },

      // Twitter Meta Tags
      {
        property: 'twitter:image',
        content: imageUrl,
      },
      {
        property: 'twitter:card',
        content: 'summary_large_image',
      },
      {
        property: 'twitter:title',
        content: title,
      },
      {
        property: 'twitter:description',
        content: description,
      },
      {
        property: 'twitter:creator',
        content: '@Rodrigo254mix',
      },
    ];
  };
}
