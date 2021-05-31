import AniLink from 'gatsby-plugin-transition-link/AniLink';
import styled from 'styled-components';
import media from 'styled-media-query';
import { GatsbyImage } from 'gatsby-plugin-image';

export const PostItemWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin: 20px;
  min-height: 240px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  transition: all 0.3s cubic-bezier(.25,.8,.25,1);
  background: var(--color2);
  color: var(--color1-contrast);
  body#grid & {
    flex-direction: column;
    margin: 0px;
  }
  &:hover {
    box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
  }
`;

export const PostItemLink = styled(AniLink)`
  text-decoration: none;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  color: var(--color1-contrast);
  margin-bottom: auto;
  &:hover {
    h1, p{
      color: var(--color3-light);
    }
  }
`;

interface PostItemThumbnailProps {
  objectFit?: string;
};

export const PostItemThumbnail = styled(GatsbyImage)<PostItemThumbnailProps>`
  width: 100%;
  height: 200px;
  margin: 0px;
  body#list & {
    height: 240px;
    flex: 1;
  }
`;

export const PostItemContent = styled.section`
  display: flex;
  flex-direction: column;
  font-family: var(--font-serif);
  font-size: 1.6rem;
  line-height: 1.3;
  padding: 15px;
  flex: 1.5;
`;

export const PostItemTitle = styled.h1`
  font-family: var(--font-serif);
  font-size: 1.6rem;
  line-height: 1.3;
  body#grid & {
    margin: 15px 0px;
  }
`;

export const PostItemDescription = styled.p`
  font-family: var(--font-sans-serif);
  font-size: 1.2rem;
  font-weight: 300;
  line-height: 1.2;
  margin: 10px 0px;
`;
