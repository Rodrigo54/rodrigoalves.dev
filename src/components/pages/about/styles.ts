import styled from 'styled-components';
import media from 'styled-media-query';

export const MainContent = styled.section`
  font-family: var(--font-sans-serif);
  margin: 0px 0px 80px;
`;

export const Paragrafe = styled.p`
  color: var(--color2-contrast);
  font-size: 1rem;
  font-weight: 300;
  line-height: 1.7;
  letter-spacing: 0.05rem;
  word-break: break-word;
  margin: 0 auto 0.4rem;
`;

export const Title = styled.h2`
  font-family: var(--font-serif);
  color: var(--color2-contrast);
  font-weight: 400;
  letter-spacing: 0.05rem;
  line-height: 1.7;
  word-break: break-word;
  font-size: 1.7rem;
  margin: 2rem auto 1rem;
  ${media.lessThan('large')`
    font-size: 1.375rem;
  `}
`;

export const AbilitiesWrapper = styled.div`
  color: var(--color2-contrast);
  font-size: 1rem;
  font-weight: 300;
  line-height: 1.7;
  letter-spacing: 0.05rem;
  word-break: break-word;
`;

export const AbilitiesUl = styled.ul`
  list-style: disc;
  padding-left: 2.5rem;
  margin: 0 auto 1.6rem;
`;

export const AbilitiesLi = styled.li`
  padding: 0.4rem 0;
`;
