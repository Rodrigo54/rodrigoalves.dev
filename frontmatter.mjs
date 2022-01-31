import { join } from 'node:path';

/**
 * Remove Front Matter
 * remove the thematicBreak "<hr />" to first heading
 * @example
 * --- //=> thematicBreak
 * title: this
 * date: 2020-12-12 => becomes heading
 * ---
 * @typedef { import('mdast').Root } Tree - the MDXAST
 * @param { Tree } tree - the MDXAST
 * @return { Tree } tree
 */
const removeFrontMatter = (tree) => {
  if (tree.children[0].type === 'thematicBreak') {
    const firstHeadingIndex = tree.children.findIndex(
      (t) => t.type === 'heading'
    );
    if (firstHeadingIndex !== -1) {
      // we will mutate the tree.children by removing these nodes
      tree.children.splice(0, firstHeadingIndex + 1);
    }
  }

  return tree;
};

/**
 * Get Post Front Matter
 * @param { import('mdast').Root } tree - the MDXAST
 * @param { string } slug - slug post
 * @return { import('mdast').Root } tree
 */
const getPostFrontMatter = (tree, slug) => {
  tree.children.unshift({
    type: 'import',
    value: `import { getPostBySlug } from '@utils/posts';`,
  });

  tree.children.push({
    type: 'export',
    value: `export const getStaticProps = async () => {
      const frontMatter = await getPostBySlug('${slug}');
      return {
        props: { frontMatter },
      };
    }
    `,
  });

  return tree;
};

/**
 * Set Post Layout
 * @param { import('mdast').Root } tree - the MDXAST
 * @return { import('mdast').Root } tree
 */
const setPostLayout = (tree) => {
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

  return tree;
};

/**
 * Get Page Front Matter
 * @param { import('mdast').Root } tree - the MDXAST
 * @param { import('vfile').VFile } file - the file node
 * @return { import('mdast').Root } tree
 */
const getPageFrontMatter = (tree, file) => {
  const dirname = file.dirname.replaceAll('\\', '/');
  const fullPath = `${dirname}/${file.basename}`;

  tree.children.unshift({
    type: 'import',
    value: `import { getPageFrontmatter } from '@utils/pages';`,
  });

  tree.children.push({
    type: 'export',
    value: `export const getStaticProps = async () => {
      const frontMatter = await getPageFrontmatter('${fullPath}', '${file.stem}');
      return {
        props: { frontMatter },
      };
    }
    `,
  });

  return tree;
};

/**
 * Set Page Layout
 * @param { import('mdast').Root } tree - the MDXAST
 * @return { import('mdast').Root } tree
 */
const setPageLayout = (tree) => {
  tree.children.unshift({
    type: 'import',
    value: `import PageLayout from '@templates/page-layout';`,
  });

  tree.children.push({
    type: 'export',
    default: true,
    value: `export default function Layout({frontMatter, children}) {
      return <PageLayout data={frontMatter}>{children}</PageLayout>;
    }`,
  });

  return tree;
};

/**
 * This is a plugin for remark in mdx.
 * This should be a function that may take some options and
 * should return a function with the following signature
 * @param { import('mdast').Root } tree - the MDXAST
 * @param { import('vfile').VFile } file - the file node
 * @return void - it should mutate the tree if needed
 */
const plugin = (tree, file) => {
  tree = removeFrontMatter(tree);

  const postsDirectory = join(file.cwd, 'src/pages/blog');
  if (postsDirectory === file.dirname) {
    tree = getPostFrontMatter(tree, file.stem);
    tree = setPostLayout(tree);
  } else {
    tree = getPageFrontMatter(tree, file);
    tree = setPageLayout(tree);
  }

  return tree;
};

export default () => plugin;
