import * as babel from '@babel/core';
import mdx from '@mdx-js/mdx';
import { mdx as createElement, MDXProvider } from '@mdx-js/react';
import AngularPagination from '@components/angular-pagination';
import * as remarkVscode from 'gatsby-remark-vscode';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { ServerStyleSheet } from 'styled-components';

const transform = (code) => {
  return babel.transformSync(code, {
    plugins: [
      ['styled-components', { ssr: true }],
      '@babel/plugin-transform-react-jsx',
      '@babel/plugin-proposal-object-rest-spread',
    ],
  }).code;
};

const renderWithReact = async (mdxCode) => {
  const jsx = await mdx(mdxCode, {
    skipExport: true,
    remarkPlugins: [
      [
        remarkVscode.remarkPlugin,
        {
          injectStyles: false,
          theme: {
            default: 'Dark+ (default dark)',
            parentSelector: {
              'body.dark': 'Dark+ (default dark)',
              'body.light': 'Light+ (default light)',
            },
          },
        },
      ],
    ],
  });
  const code = transform(jsx);
  const scope = { mdx: createElement };

  const fn = new Function(
    'React',
    ...Object.keys(scope),
    `${code}; return React.createElement(MDXContent)`
  );

  const element = fn(React, ...Object.values(scope));
  const components = {
    AngularPagination,
  };

  const elementWithProvider = React.createElement(
    MDXProvider,
    { components },
    element
  );

  return makeStyles(elementWithProvider);
};

export async function markdownToHtml(mdxString: string) {
  return renderWithReact(mdxString);
}

function makeStyles(component: React.ReactElement) {
  const sheet = new ServerStyleSheet();
  try {
    const html = renderToString(sheet.collectStyles(component));
    const styles = sheet.getStyleTags();
    return styles.concat(html);
  } catch (error) {
    // handle error
    console.error(error);
  } finally {
    sheet.seal();
  }
}
