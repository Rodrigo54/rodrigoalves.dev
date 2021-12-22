/* eslint-disable @typescript-eslint/no-var-requires */
const mdx = require('@next/mdx');

const withMDX = mdx({
  extension: /\.mdx?$/,
});

/** @type {import('next').NextConfig} */
module.exports = withMDX({
  reactStrictMode: true,
  swcMinify: true,
  pageExtensions: ['js', 'jsx', 'tsx', 'md', 'mdx'],
  experimental: {
    styledComponents: true,
  },
  webpack: (config, { isServer }) => {
    // Fixes npm packages (mdx) that depend on `fs` module
    if (!isServer) {
      config.resolve.fallback.fs = false;
    }
    return config;
  },
});
