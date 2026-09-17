import packageJson from '../../package.json';

export const environment = {
  siteUrl: `https://rodrigoalves.dev`,
  production: true,
  version: packageJson.version,
  postsPerPage: 6,
  allowDraftPosts: false,
};
