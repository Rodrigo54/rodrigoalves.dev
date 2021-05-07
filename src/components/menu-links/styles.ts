import AniLink from 'gatsby-plugin-transition-link/AniLink';
import styled from 'styled-components';
import media from 'styled-media-query';

export const MenuLinksWrapper = styled.nav`
  margin: 40px auto auto;
  width: 100%;
  ${media.lessThan('large')`
    display: none;
  `}
`;

export const MenuLinksList = styled.ul`
  width: 100%;
  font-size: 1.2rem;
  font-weight: 300;
`;

export const MenuLinksItem = styled.li`
  width: 100%;
  padding: 0.5rem 0;
  .active {
    color: var(--color3-light);
  }
`;

export const MenuLinksLink = styled(AniLink)`
  color: var(--color1-contrast);
  font-family: var(--font-sans-serif);
  text-decoration: none;
  transition: color 0.5s;
  width: 100%;
  &:hover {
    color: var(--color3-light);
  }
`;
