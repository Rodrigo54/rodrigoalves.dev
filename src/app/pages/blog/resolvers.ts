import { injectContentFiles } from '@analogjs/content';
import { MetaTag } from '@analogjs/router';
import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { FrontMatter } from './frontmatter';

// temporary
function injectActivePostAttributes(
  route: ActivatedRouteSnapshot,
): FrontMatter {
  const file = injectContentFiles<FrontMatter>().find((contentFile) => {
    return (
      contentFile.filename === `/src/content/${route.params['slug']}.md` ||
      contentFile.slug === route.params['slug']
    );
  });

  return file?.attributes || {
    title: 'Default Title',
    description: '',
    slug: '',
    featuredImage: '',
    comments: false,
    tags: [],
    author: '',
    createAt: new Date().toISOString(),
    updateAt: new Date().toISOString(),
    music: { title: '', url: '' },
    fullPath: '',
    timeToRead: { text: '', minutes: 0, time: 0, words: 0 },
    nextPost: null,
    prevPost: null
  };
}

export const postTitleResolver: ResolveFn<string> = (route) => {
  const postAttributes = injectActivePostAttributes(route);
  return postAttributes.title || 'Default Title';
};

export const postMetaResolver: ResolveFn<MetaTag[]> = (route) => {
  const postAttributes = injectActivePostAttributes(route);
  const base =
    import.meta.env['VITE_ANALOG_BASE_URL'] || 'http://localhost:3000';
  const imageUrl = `${base}${postAttributes.featuredImage}`;

  return [
    {
      name: 'description',
      content: postAttributes.description,
    },
    {
      name: 'author',
      content: 'Analog Team',
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
