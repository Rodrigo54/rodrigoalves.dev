import { unified } from 'unified';
import remarkParse from 'remark-parse';
import * as remarkVscode from 'gatsby-remark-vscode';
import remarkToRehype from 'remark-rehype';
import rehypeRaw from 'rehype-raw';
import rehypeStringify from 'rehype-stringify';

export async function markdownToHtml(mdxString: string) {
  // const processor = remark().use(remarkVscode.remarkPlugin, {
  //   theme: 'Dark+ (default dark)',
  // });
  // const jsx = await processor.process(mdxString);

  // const jsx = await mdx(mdxString);
  // const jsx = await mdx.sync(mdxString, {
  //   remarkPlugins: [remarkVscode.remarkPlugin],
  // });

  // return jsx;

  const { remark } = await import('remark');
  const mdx = await import('remark-mdx');

  const processor = remark()
    .use(mdx)
    .use(remarkVscode.remarkPlugin, {
      theme: {
        default: 'Dark+ (default dark)',
        parentSelector: {
          'body.dark': 'Dark+ (default dark)',
          'body.light': 'Light+ (default light)',
        },
      },
    })
    .use(remarkToRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeStringify, {
      allowDangerousHtml: true,
      closeSelfClosing: true,
    });

  const jsx = await processor.process(mdxString);

  // console.log(result);
  return jsx.value;
}
