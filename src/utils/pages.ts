import { FrontMatter } from '@model/frontmatter';
import { makeFrontMatter } from '@utils/frontmatter';

export async function getPageFrontmatter(
  fullPath: string,
  slug: string
): Promise<FrontMatter | null> {
  const data = await makeFrontMatter(fullPath);

  return {
    ...data,
    slug,
  } as FrontMatter;
}
