import styled from 'styled-components';
import media from 'styled-media-query';
import { GatsbyImage } from "gatsby-plugin-image";

export const PostHeader = styled.header`
  margin: 0px 0px 20px;
`;

export const PostTitle = styled.h1`
  font-family: var(--font-serif);
  font-size: 2.5rem;
  font-weight: 400;
  letter-spacing: 0.05rem;
  margin: 0.8rem auto;
  ${media.lessThan('large')`
    font-size: 2.8rem;
    line-height: 1.1;
  `}
`;

export const PostDescription = styled.h2`
  font-family: var(--font-sans-serif);
  font-weight: 200;
  margin: 30px 0px 20px;
  font-size: 1.6rem;
  line-height: 1.3;
  ${media.lessThan('large')`
  `}
`;

export const PostThumbnail = styled(GatsbyImage)`
  z-index: 1;
  width: 100%;
  margin: auto;
  height: 350px;
`;

export const MainContent = styled.section`
  font-family: var(--font-sans-serif);
  margin: 0px 0px 80px;
  ${media.lessThan('large')`
    max-width: 100%;
  `}
  p,
  h1,
  h2,
  h3,
  h4,
  ul,
  ol,
  .tags,
  iframe,
  .button-post {
    color: var(--color2-contrast);
    font-size: 1rem;
    font-weight: 300;
    line-height: 1.7;
    letter-spacing: 0.02rem;
    word-break: break-word;
  }
  p {
    margin: 0 auto .4rem;
  }
  h1,
  h2,
  h3,
  h4,
  h5 {
    margin: 2rem auto 1rem;
  }
  ul,
  ol {
    list-style: decimal;
    padding-left: 2.5rem;
    margin: 0 auto 1.6rem;
  }
  li {
    padding: 0.625rem 0;
    & > ul {
      margin-bottom: 0;
    }
  }
  p,
  li {
    code {
      word-wrap: break-word;
    }
  }
  img {
    display: block;
    max-width: 100%;
  }
  iframe {
    padding: 0 1.6rem 1.6rem;
    width: 100%;
    ${media.lessThan('large')`
      padding: 0 1rem;
    `}
  }
  blockquote {
    color: var(--postColor);
    border-left: 0.3rem solid var(--color3-light);
    padding: 0 1.875rem;
    margin: 3.125rem auto;
  }
  hr {
    border: 1px solid var(--color3-light);
    margin: 3rem auto;
  }
  #twitter-widget-0,
  .instagram-media,
  .twitter-tweet {
    margin: 20px auto !important;
  }
  h1,
  h2,
  h3,
  h4,
  h5 {
    font-family: var(--font-serif);
    font-weight: 400;
    letter-spacing: 0.05rem;
    line-height: 1.4;
  }
  h1 {
    font-size: 2rem;
    ${media.lessThan('large')`
      font-size: 1.875rem;
    `}
  }
  h2 {
    font-size: 1.7rem;
    ${media.lessThan('large')`
      font-size: 1.375rem;
    `}
  }
  h3 {
    font-size: 1.3rem;
    ${media.lessThan('large')`
      font-size: 1.125rem;
    `}
  }
  h4 {
    font-size: 1rem;
  }
  h5 {
    font-size: 0.8rem;
  }
  strong {
    font-weight: 700;
  }
  .gatsby-resp-image-background-image {
    z-index: 2;
    opacity: 1 !important;
  }
  .gatsby-resp-image-image {
    box-shadow: none !important;
    transition: opacity 0.2s;
    &.lazyload {
      opacity: 0;
    }
    &.lazyloaded {
      opacity: 1;
      z-index: 3;
    }
  }
  .grvsc-container {
    font-family: consolas;
    line-height: 1.4;
    margin: 0px;
    ${media.lessThan('large')`
      margin: 0 0 1.6rem 0;
    `}
  }
  .instagram-media {
    margin: 1rem auto !important;
  }
  a {
    color: var(--color3-light);
    text-decoration: none;
    transition: border-bottom 0.5s;
    svg {
      color: var(--color3-light);
    }
    &:hover {
      border-bottom: 1px dashed var(--color3-light);
    }
  }
`;
