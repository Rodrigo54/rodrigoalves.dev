import packageJson from '../../package.json';

export const environment = {
  production: false,
  version: packageJson.version,
  postsPerPage: 5,
  allowDraftPosts: false,
}
