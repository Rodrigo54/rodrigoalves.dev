import { injectContentFiles } from '@analogjs/content';
import { MetaTag } from '@analogjs/router';
import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { FrontMatter, makeFrontMatter } from '@utils/frontmatter';

function injectActivePostAttributes(
  route: ActivatedRouteSnapshot,
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
  const base = import.meta.env['VITE_ANALOG_BASE_URL'] || 'http://localhost:3000';
  const imageUrl = `${base}${postAttributes.featuredImage}`;

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
      property: 'twitter:image',
      content: imageUrl,
    },
  ];
};
