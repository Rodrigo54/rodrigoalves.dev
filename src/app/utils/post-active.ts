import { injectContentFiles } from '@analogjs/content';
import { ActivatedRouteSnapshot } from '@angular/router';
import { FrontMatter, makeFrontMatterFromContentFile } from '@utils/frontmatter.signal';

export function injectActivePostAttributes(route: ActivatedRouteSnapshot): FrontMatter {
  const file = injectContentFiles<FrontMatter>().find(contentFile => {
    const isSameFile = contentFile.filename === `/src/content/${route.params['slug']}.md`;
    const isSameSlug = contentFile.slug === route.params['slug'];
    return isSameFile || isSameSlug;
  });
  return makeFrontMatterFromContentFile(file);
}
