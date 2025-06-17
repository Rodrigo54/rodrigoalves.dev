/// <reference types="vitest" />

import analog from '@analogjs/platform';
import { augmentAppWithServiceWorker } from '@angular/build/private';
import * as path from 'node:path';
import { defineConfig, Plugin, PluginOption, UserConfig } from 'vite';
import devtoolsJson from 'vite-plugin-devtools-json';
import tsconfigPaths from 'vite-tsconfig-paths';
import { anchorLinkExtension } from './marked-extensions';
import { getBlogPosts, getBlogTags } from './vite.prerender.utils';

function swBuildPlugin(): Plugin {
  let config: UserConfig;
  return {
    name: 'analog-sw',
    config(_config) {
      config = _config;
    },
    async closeBundle() {
      if (config.build?.ssr) {
        return;
      }
      console.log('Building service worker');
      await augmentAppWithServiceWorker('.', process.cwd(), path.join(process.cwd(), 'dist/client'), '/');
    },
  };
}

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
        sitemap: {
          host: 'https://rodrigoalves.dev',
        },
      },
      nitro: {
        prerender: {
          failOnError: true,
        },
      },
      vite: { experimental: { supportAnalogFormat: true } },
    }),
    tsconfigPaths(),
    swBuildPlugin(),
    devtoolsJson(),
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
