import { createLogger, type Logger } from 'vite';

// @angular/platform-server ships fesm2022 bundles whose sourcemaps reference
// Google's internal monorepo paths instead of files that exist in the
// published package, so Vite's dev server can never resolve them. Both
// warnings below come from that upstream packaging issue, not from this
// project's own code.
const SILENCED_SUBSTRINGS = ['points to a source file outside its package', 'points to missing source files'];

function isSilenced(msg: string): boolean {
  return SILENCED_SUBSTRINGS.some(substring => msg.includes(substring));
}

export function createSilencedLogger(): Logger {
  const logger = createLogger();
  const { warn, warnOnce } = logger;

  logger.warn = (msg, options) => {
    if (!isSilenced(msg)) warn(msg, options);
  };

  logger.warnOnce = (msg, options) => {
    if (!isSilenced(msg)) warnOnce(msg, options);
  };

  return logger;
}
