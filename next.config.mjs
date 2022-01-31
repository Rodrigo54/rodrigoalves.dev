/* eslint-disable @typescript-eslint/no-var-requires */
import nextConfigMDX from '@next/mdx';
import remarkVscode from 'gatsby-remark-vscode';
import withPWA from 'next-pwa';
import runtimeCaching from 'next-pwa/cache.js';
import rehypeExternalLinks from 'rehype-external-links';

import frontmatterRemarkPlugin from './frontmatter.mjs';

const withMDX = nextConfigMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [
      frontmatterRemarkPlugin,
      [
        remarkVscode.remarkPlugin,
        {
          injectStyles: false,
          extensions: ['vscode-ng-html'],
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
    rehypePlugins: [
      [
        rehypeExternalLinks,
        { target: '_blank', rel: ['nofollow', 'noopener', 'noreferrer'] },
      ],
    ],
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'tsx', 'md', 'mdx'],
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    styledComponents: true,
    esmExternals: true,
  },
  pwa: {
    disable: process.env.NODE_ENV === 'development',
    dest: 'public',
    runtimeCaching,
  },
  webpack: (config) => {
    config.cache = false;
    return config;
  },
};

export default withPWA(withMDX(nextConfig));
