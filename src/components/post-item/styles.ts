import styled from 'styled-components';
import media from 'styled-media-query';

export const PostItemWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin: 20px;
  height: 250px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  background: var(--color2);
  color: var(--color1-contrast);
  &:hover {
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  }
  body#grid & {
    flex-direction: column;
    margin: 0px;
    height: 600px;
    ${media.lessThan('small')`
      height: 350px;
    `}
  }
  ${media.lessThan('small')`
    height: 350px;
  `}
`;

export const PostItemLink = styled.a`
  text-decoration: none;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  color: var(--color1-contrast);
  margin-bottom: auto;
  &:hover {
    h1,
    p {
      color: var(--color3-light);
    }
  }
`;

export const PostItemThumbnail = styled.div`
  height: 200px;
  max-width: 400px;
  margin: 0px;
  position: relative;
  body#list & {
    height: 250px;
    flex: 1;
  }
  ${media.lessThan('small')`
    visibility: hidden;
    display: none;
  `}
`;

export const PostItemContent = styled.section`
  display: flex;
  flex-direction: column;
  padding: 15px;
  flex: 1.5;
  width: 100%;
`;

export const PostItemTitle = styled.h1`
  font-family: var(--font-serif);
  font-size: 1.6rem;
  line-height: 1.3;
  body#grid & {
    margin: 15px 0px;
  }
  ${media.lessThan('large')`
    font-size: 1.4rem;
  `}
`;

export const PostItemDescription = styled.p`
  font-family: var(--font-sans-serif);
  font-size: 1.2rem;
  font-weight: 300;
  line-height: 1.2;
  margin: 10px 0px;
  ${media.lessThan('large')`
    font-size: 1rem;
  `}
`;
