import styled from 'styled-components';
import media from 'styled-media-query';


export const ContentWrapper = styled.section`
  font-family: var(--font-sans-serif);
`;

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

export const FormationWrap = styled.section`
  display: flex;
  flex-flow: column nowrap;
  margin-bottom: 15px;
`;

export const CourseWrap = styled.a`
  display: flex;
  flex-flow: column nowrap;
  margin-bottom: 40px;
  color: var(--color2-contrast);
  text-decoration: none;
  &:hover {
    color: var(--color3-light);
  }
`;

export const InfoWrap = styled.div`
  display: flex;
  flex-flow: column nowrap;
  gap: 10px;
  padding: 0px 0px 0px 20px;
`;

export const InfoName = styled.h3`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  gap: 10px;

  font-family: var(--font-serif);
  line-height: 1;
  font-weight: 500;
  font-size: 1.2rem;
`;

export const InfoLocale = styled.p`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  gap: 10px;

  line-height: 1;
  font-weight: 200;
  font-size: 1rem;
`;

export const InfoDate = styled.p`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  gap: 10px;

  line-height: 1;
  font-weight: 200;
  font-size: 1rem;
`;

export const Description = styled.blockquote`
  border-left: 0.3rem solid var(--color3-light);
  padding: 0px 15px;
  margin: 30px 27px;

  font-family: var(--font-sans-serif);
  line-height: 1.5;
  font-weight: 200;
  font-size: 1rem;
  font-style: italic;
  letter-spacing: 1px;
`;
