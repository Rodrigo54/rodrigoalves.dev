import * as remarkVscode from 'gatsby-remark-vscode';

import AngularPagination from '@posts/components/angular-pagination';

import * as babel from '@babel/core';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import mdx from '@mdx-js/mdx';
import { MDXProvider, mdx as createElement } from '@mdx-js/react';

const transform = (code) =>
  babel.transform(code, {
    plugins: [
      '@babel/plugin-transform-react-jsx',
      '@babel/plugin-proposal-object-rest-spread',
      'babel-plugin-styled-components',
    ],
  }).code;

const renderWithReact = async (mdxCode) => {
  const jsx = await mdx(mdxCode, {
    skipExport: true,
    remarkPlugins: [
      remarkVscode.remarkPlugin,
      [
        {
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
    h1: ({ children }) =>
      React.createElement('h1', { style: { color: 'tomato' } }, children),
    AngularPagination,
  };

  const elementWithProvider = React.createElement(
    MDXProvider,
    { components },
    element
  );

  return renderToStaticMarkup(elementWithProvider);
};

export async function markdownToHtml(mdxString: string) {
  return renderWithReact(mdxString);
}
