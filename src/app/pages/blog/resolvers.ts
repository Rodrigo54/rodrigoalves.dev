import { injectContentFiles } from '@analogjs/content';
import { MetaTag } from '@analogjs/router';
import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { FrontMatter, makeFrontMatter } from '@utils/frontmatter';
import { environment } from 'src/env/env';

function injectActivePostAttributes(
  route: ActivatedRouteSnapshot
): FrontMatter {
  const file = injectContentFiles<FrontMatter>().find((contentFile) => {
    return (
      contentFile.filename === `/src/content/${route.params['slug']}.md` ||
      contentFile.slug === route.params['slug']
    );
  });
  return makeFrontMatter(file);
}

export const postTitleResolver: ResolveFn<string> = (route) => {
  const postAttributes = injectActivePostAttributes(route);
  const suffixText = 'Rodrigo Alves';
  return `${postAttributes.title} | ${suffixText}`;
};

export const postMetaResolver: ResolveFn<MetaTag[]> = (route) => {
  const postAttributes = injectActivePostAttributes(route);
  const base = environment.siteUrl;
  const imageUrl = `${base}${postAttributes.featuredImage}`;
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
