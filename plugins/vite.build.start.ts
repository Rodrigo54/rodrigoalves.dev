import { Plugin, UserConfig } from 'vite';
import { processImages } from '../scripts/process-unsplash-imgs';
import { processReadTimes } from '../scripts/reading-time';

const isDeployedOnNetlify = process.env['DEPLOYED_ON_NETLIFY'] === 'true';

export function unsplashImagePlugin(): Plugin {
  let config: UserConfig;
  return {
    name: 'vite-plugin-unsplash-image-processor',
    apply: 'build', // roda só em build
    config(_config) {
      config = _config;
    },
    async buildStart() {
      if (config.build?.ssr || isDeployedOnNetlify) {
        return;
      }
      await processImages();
    },
  };
}

export function readingTimePlugin(): Plugin {
  let config: UserConfig;
  return {
    name: 'vite-plugin-reading-time',
    apply: 'build', // roda só em build
    config(_config) {
      config = _config;
    },
    async buildStart() {
      if (config.build?.ssr || isDeployedOnNetlify) {
        return;
      }
      await processReadTimes();
    },
  };
}
