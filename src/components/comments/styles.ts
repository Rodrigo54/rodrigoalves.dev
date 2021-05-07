import styled from 'styled-components';
import media from 'styled-media-query';

export const CommentsWrapper = styled.section`
  margin: 30px;
  font-size: 2rem;
  ${media.lessThan('large')`
    padding: 3rem 1.4rem 0;
    max-width: 100%;
  `}
  iframe[src*="ads-iframe"] {
    display: none;
  }
  #disqus_thread {
    a {
      color: var(--color3-light) !important;
    }
  }
`;

export const CommentsTitle = styled.h2`
  color: var(--color2-contrast);
  font-family: var(--font-serif);
  font-size: 2.1rem;
  padding-bottom: 2rem;
  ${media.lessThan('large')`
    font-size: 1.375rem;
  `}
`;
