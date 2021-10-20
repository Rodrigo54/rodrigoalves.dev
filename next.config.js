/* eslint-disable @typescript-eslint/no-var-requires */
const mdx = require('@next/mdx');
const remarkVscode = require('gatsby-remark-vscode');

const withMDX = mdx({
  extension: /\.mdx?$/,
  options: {
    // remarkPlugins: [
    //   remarkVscode.remarkPlugin,
    //   [
    //     {
    //       theme: {
    //         default: 'Dark+ (default dark)',
    //         parentSelector: {
    //           'body.dark': 'Dark+ (default dark)',
    //           'body.light': 'Light+ (default light)',
    //         },
    //       },
    //     },
    //   ],
    // ],
  },
});

/** @type {import('next').NextConfig} */
module.exports = withMDX({
  reactStrictMode: true,
  pageExtensions: ['js', 'jsx', 'tsx', 'md', 'mdx'],
  webpack: (config, { isServer }) => {
    // Fixes npm packages (mdx) that depend on `fs` module
    if (!isServer) {
      config.resolve.fallback.fs = false;
    }
    return config;
  },
});
