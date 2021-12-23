/* eslint-disable @typescript-eslint/no-var-requires */
import remarkVscode from 'gatsby-remark-vscode';
import frontmatterRemarkPlugin from './frontmatter.mjs';
import nextConfigMDX from '@next/mdx';

const withMDX = nextConfigMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [
      frontmatterRemarkPlugin,
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
  webpack: (config) => {
    config.cache = false;
    return config;
  },
};

export default withMDX(nextConfig);
