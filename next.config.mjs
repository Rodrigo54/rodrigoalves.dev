/* eslint-disable @typescript-eslint/no-var-requires */
import nextConfigPWA from 'next-pwa';
import runtimeCaching from 'next-pwa/cache.js';

const withPWA = nextConfigPWA({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
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
};

export default withPWA(nextConfig);
