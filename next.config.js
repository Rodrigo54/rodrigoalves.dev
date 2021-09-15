/* eslint-disable @typescript-eslint/no-var-requires */
const mdx = require('@next/mdx');
const remarkVscode = require('gatsby-remark-vscode');

const withMDX = mdx({
  extension: /\.mdx?$/,
  pageExtensions: ['js', 'jsx', 'mdx'],
  options: {
    remarkPlugins: [remarkVscode.remarkPlugin],
    rehypePlugins: [],
  },
});

/** @type {import('next').NextConfig} */
module.exports = withMDX({
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    // Fixes npm packages (mdx) that depend on `fs` module
    if (!isServer) {
      config.resolve.fallback.fs = false;
    }
    return config;
  },
});
