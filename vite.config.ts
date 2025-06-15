/// <reference types="vitest" />

import analog from '@analogjs/platform';
import { defineConfig, PluginOption } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { anchorLinkExtension } from './marked-extensions';
import { getBlogPosts, getBlogTags } from './vite.prerender.utils';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  publicDir: 'src/assets',
  build: {
    target: ['es2020'],
  },
  resolve: {
    mainFields: ['module'],
  },
  plugins: [
    analog({
      static: true,
      content: {
        markedOptions: {
          extensions: [anchorLinkExtension],
        },
        highlighter: 'shiki',
        shikiOptions: {
          highlight: {
            themes: {
              light: 'light-plus',
              dark: 'dark-plus',
            },
            defaultColor: false,
            cssVariablePrefix: '--shiki-',
          },
          highlighter: {
            themes: ['light-plus', 'dark-plus'],
            additionalLangs: ['shellscript', 'bat'],
          },
        },
      },
      prerender: {
        routes: async () => ['/', '/blog', '/about', ...getBlogPosts(), ...getBlogTags()],
      },
      nitro: {
        prerender: {
          failOnError: true,
        },
      },
      vite: { experimental: { supportAnalogFormat: true } },
    }),
    tsconfigPaths(),
  ] as PluginOption[],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['src/test-setup.ts'],
    include: ['**/*.spec.ts'],
    reporters: ['default'],
  },
  define: {
    'import.meta.vitest': mode !== 'production',
  },
}));
