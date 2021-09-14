import AniLink from 'gatsby-plugin-transition-link/AniLink';
import styled from 'styled-components';
import media from 'styled-media-query';

export const MenuBarWrapper = styled.aside`
  align-items: center;
  background: var(--color1);
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: space-between;
  padding: 0.8rem 0;
  position: fixed;
  right: 0;
  width: 3.75rem;
  transition: background 0.5s;
  ${media.lessThan('large')`
    bottom: 0;
    flex-direction: row;
    height: auto;
    padding: 0;
    position: fixed;
    width: 100%;
  `}
`;

export const MenuBarGroup = styled.div`
  display: flex;
  flex-direction: column;
  ${media.lessThan('large')`
    flex-direction: row;
  `}
`;

export const MenuBarLink = styled(AniLink)`
  display: block;
  &.active {
    span {
      color: var(--color3-light);
    }
  }
`;

export const MenuBarItem = styled.span`
  color: var(--color1-contrast);
  cursor: pointer;
  display: block;
  height: 3.75rem;
  padding: 1.1rem;
  position: relative;
  width: 3.75rem;
  &:hover {
    color: var(--color3-light);
  }
  &.display {
    ${media.lessThan('large')`
      display: none;
    `}
  }
  ${media.greaterThan('large')`
    &:hover {
      color: var(--color3-light);
    }
  `}
  ${media.lessThan('large')`
    height: 3.2rem;
    padding: .9rem;
    position: relative;
    width: 3.2rem;
  `}
`;
