/// <reference types="vitest" />

import { defineConfig, PluginOption } from 'vite';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import analog from '@analogjs/platform';

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
      liveReload: false,
      ssr: true,
      static: true,
      content: {
        highlighter: 'shiki',
        shikiOptions: {
          highlight: {
            theme: 'dark-plus',
            // themes: {
            //   light: 'light-plus',
            //   dark: 'dark-plus',
            // },
            // transformers: [
            //   {
            //     pre(node) {
            //       node.properties['style'] = "background-color: var(--code-bg, white); color: var(--code-fg, black);";
            //     }
            //   }
            // ],
          },
          highlighter: {
            themes: ['light-plus', 'dark-plus'],
            additionalLangs: ['shellscript', 'bat'],
          },
        },
      },
      prerender: {
        routes: async () => [
          '/blog',
          {
            contentDir: 'src/content',
            transform: (file) => {
              // do not include files marked as draft in frontmatter
              if (file.attributes['draft']) {
                return false;
              }
              // use the slug from frontmatter if defined, otherwise use the files basename
              const slug = file.attributes['slug'] || file.name;
              return `/blog/${slug}`;
            }
          }
        ],
      },
      nitro: {
        prerender: {
          failOnError: true,
        },
      },
      vite: { experimental: { supportAnalogFormat: true } },
    }),
    nxViteTsPaths(),
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
