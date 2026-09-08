/// <reference types="vitest" />

import analog from '@analogjs/platform';
import { defineConfig, PluginOption } from 'vite';
import devtoolsJson from 'vite-plugin-devtools-json';
import { swBuildPlugin } from './plugins/analog-sw.ts';
import { anchorLinkExtension, tableWrapperExtension } from './plugins/marked-extensions.ts';
import { addCopyButton } from './plugins/shiki-transformer.ts';
import { createSilencedLogger } from './plugins/vite.silent-logger.ts';
import { readingTimePlugin, unsplashImagePlugin } from './plugins/vite.build.start.ts';
import { getBlogPosts, getBlogTags } from './plugins/vite.prerender.utils.ts';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  publicDir: 'src/assets',
  customLogger: createSilencedLogger(),
  build: {
    target: ['es2020'],
  },
  resolve: {
    mainFields: ['module'],
    tsconfigPaths: true,
  },
  plugins: [
    analog({
      static: true,
      content: {
        highlighter: 'shiki',
        markedOptions: {
          extensions: [anchorLinkExtension, tableWrapperExtension],
        },
        shikiOptions: {
          highlight: {
            transformers: [addCopyButton()],
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
    }),
    unsplashImagePlugin(),
    readingTimePlugin(),
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
