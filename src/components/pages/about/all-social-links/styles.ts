import styled from 'styled-components';
import media from 'styled-media-query';

export const Title = styled.h2`
  font-family: var(--font-serif);
  color: var(--color2-contrast);
  word-break: break-word;
  letter-spacing: 0.05rem;
  line-height: 1.7;
  font-weight: 400;
  font-size: 1.7rem;
  margin: 2rem auto 1.4rem;
  ${media.lessThan('large')`
    font-size: 1.375rem;
  `}
`;

export const SocialLinksWrapper = styled.section`
  font-family: var(--font-sans-serif);
`;

export const SocialLinksList = styled.ul`
  display: flex;
  flex-flow: row wrap;
  align-content: flex-start;
  justify-content: flex-start;
  gap: 30px 45px;
  list-style: none;
`;

export const SocialLinksItem = styled.li`
  display: block;
`;

export const SocialLinksLink = styled.a`
  color: var(--color1-contrast);
  text-decoration: none;
  transition: color 0.5s;
  &:hover {
    color: var(--color3-light);
  }
`;

export const IconWrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
`;

export const TextWrapper = styled.div`
  margin-left: 15px;
`;

export const Name = styled.h3`
  font-family: var(--font-serif);
  margin-bottom: 5px;
`;

export const Nickname = styled.span`
  font-style: italic;
`;
