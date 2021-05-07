import styled from "styled-components"
import media from "styled-media-query"

export const SocialLinksWrapper = styled.nav`
  margin: auto auto 0px;
  width: 100%;
  ${media.lessThan("large")`
    display: none;
  `}
`;

export const SocialLinksList = styled.ul`
  align-items: center;
  display: flex;
  justify-content: space-around;
  list-style: none;
`;

export const SocialLinksItem = styled.li``;

export const SocialLinksLink = styled.a`
  color: var(--color1-contrast);
  text-decoration: none;
  transition: color 0.5s;
  &:hover {
    color: var(--color3-light);
  }
`;

export const IconWrapper = styled.div`
  width: 40px;
  height: 40px;
`;
