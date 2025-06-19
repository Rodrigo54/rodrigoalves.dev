import { augmentAppWithServiceWorker } from '@angular/build/private';
import * as path from 'node:path';
import { Plugin, UserConfig } from 'vite';

export function swBuildPlugin(): Plugin {
  let config: UserConfig;
  return {
    name: 'analog-sw',
    apply: 'build',
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
