/* eslint-disable @typescript-eslint/no-var-requires */
import { join } from 'node:path';

/**
 * This is a plugin for remark in mdx.
 * This should be a function that may take some options and
 * should return a function with the following signature
 * @param { import('mdast').Root } tree - the MDXAST
 * @param { import('vfile').VFile } file - the file node
 * @return void - it should mutate the tree if needed
 */
const plugin = (tree, file) => {
  // remove the thematicBreak "<hr />" to first heading
  // --- => thematicBreak
  // title: this
  // date: 2020-12-12 => becomes heading
  // ---
  if (tree.children[0].type === 'thematicBreak') {
    const firstHeadingIndex = tree.children.findIndex(
      (t) => t.type === 'heading'
    );
    if (firstHeadingIndex !== -1) {
      // we will mutate the tree.children by removing these nodes
      tree.children.splice(0, firstHeadingIndex + 1);
    }
  }

  tree.children.unshift({
    type: 'import',
    value: `import { getPostBySlug } from '@utils/posts';`,
  });

  tree.children.push({
    type: 'export',
    value: `export const getStaticProps = async () => {
      const frontMatter = await getPostBySlug('${file.stem}');
      return {
        props: { frontMatter },
      };
    }
    `,
  });

  const postsDirectory = join(file.cwd, 'src/pages/blog');

  if (postsDirectory === file.dirname) {
    tree.children.unshift({
      type: 'import',
      value: `import BlogPost from '@templates/blog-post';`,
    });

    tree.children.push({
      type: 'export',
      default: true,
      value: `export default function Layout({frontMatter, children}) {
        return <BlogPost data={frontMatter}>{children}</BlogPost>;
      }`,
    });
  }
};

export default () => plugin;
