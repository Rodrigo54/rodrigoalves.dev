import { MetaTag } from '@analogjs/router';
import { ResolveFn } from '@angular/router';
import { FeaturedImagesMap } from '@app/data/featured-images';
import { injectActivePostAttributes } from '@utils/post-active';
import { environment } from 'src/env/env';

export const postTitleResolver: ResolveFn<string> = route => {
  const postAttributes = injectActivePostAttributes(route);
  const suffixText = 'Rodrigo Alves';
  return `${postAttributes.title} | ${suffixText}`;
};

export const postMetaResolver: ResolveFn<MetaTag[]> = route => {
  const postAttributes = injectActivePostAttributes(route);
  const base = environment.siteUrl;
  const imagePath = FeaturedImagesMap.get(postAttributes.featuredImage.raw)?.sizes['320x250'];
  const imageUrl = imagePath ? `${base}${imagePath}` : postAttributes.featuredImage.raw;
  const siteTitle = 'Rodrigo Alves'; // Adjust as needed

  return [
    {
      name: 'description',
      content: postAttributes.description,
    },
    {
      name: 'author',
      content: postAttributes.author,
    },
    {
      property: 'og:url',
      content: base,
    },
    {
      property: 'og:title',
      content: postAttributes.title,
    },
    {
      property: 'og:description',
      content: postAttributes.description,
    },
    {
      property: 'og:image',
      content: imageUrl,
    },
    {
      property: 'og:logo',
      content: `${base}/icons/icon-512x512.png`,
    },
    {
      property: 'twitter:image',
      content: imageUrl,
    },
    {
      property: 'og:type',
      content: 'website',
    },
    {
      property: 'og:site_name',
      content: siteTitle,
    },
    {
      property: 'twitter:card',
      content: 'summary_large_image',
    },
    {
      property: 'twitter:creator',
      content: postAttributes.author ?? '@rodrigo54',
    },
    {
      property: 'twitter:title',
      content: postAttributes.title,
    },
  ];
};
