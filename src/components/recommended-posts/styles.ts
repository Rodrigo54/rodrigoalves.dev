import AniLink from 'gatsby-plugin-transition-link/AniLink';
import styled from 'styled-components';

export const RecommendedWrapper = styled.section`
  border-bottom: 1px solid var(--color2-light);
  border-top: 1px solid var(--color2-light);
  background: var(--color2);
  display: flex;
  flex-flow: row nowrap;
`;

export const RecommendedLink = styled(AniLink)`
  align-items: center;
  background: var(--color1);
  color: var(--color1-contrast);
  display: flex;
  padding: 3rem;
  text-decoration: none;
  transition: background 0.5s;
  width: 50%;
  &:hover {
    background: var(--color3-shade);
    color: var(--color3-contrast);
  }
  &.previous {
    border-right: 1px solid var(--color2-light);
    justify-content: flex-start;
    margin-right: auto;
  }
  &.next {
    justify-content: flex-end;
    margin-left: auto;
  }
  &.next:only-child {
    margin-left: auto;
    border-left: 1px solid var(--color2-light);
  }
`;
