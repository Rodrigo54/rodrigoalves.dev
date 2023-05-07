/* eslint-disable @typescript-eslint/no-var-requires */
import nextConfigPWA from 'next-pwa';
import runtimeCaching from 'next-pwa/cache.js';

const withPWA = nextConfigPWA({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  runtimeCaching,
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'tsx', 'md', 'mdx'],
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    styledComponents: true,
  },
  experimental: {
    largePageDataBytes: 128 * 10000,
  },
};

export default withPWA(nextConfig);
