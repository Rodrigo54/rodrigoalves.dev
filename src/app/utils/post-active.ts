import { injectContentFiles } from '@analogjs/content';
import { ActivatedRouteSnapshot } from '@angular/router';
import { FrontMatter, makeFrontMatter } from '@utils/frontmatter.signal';

export function injectActivePostAttributes(
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
