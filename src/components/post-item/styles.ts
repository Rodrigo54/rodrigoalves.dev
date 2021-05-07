import AniLink from 'gatsby-plugin-transition-link/AniLink';
import styled from 'styled-components';
import media from 'styled-media-query';
import { GatsbyImage } from 'gatsby-plugin-image';

export const PostItemLink = styled(AniLink)`
  display: flex;
  flex-direction: row;
  text-decoration: none;
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
    h1{
      color: var(--color3-light);
    }
  }
`;

export const PostItemWrapper = styled.section`
  align-items: center;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 16px;
  flex: 1.5;
  body#grid & {
    width: 100%;
    height: 100%;
  }
`;

interface PostItemThumbnailProps {
  objectFit?: string;
};

export const PostItemThumbnail = styled(GatsbyImage)<PostItemThumbnailProps>`
  width: 100%;
  height: 200px;
  margin: 0px 0px 15px;
  body#list & {
    height: 240px;
    margin: 0px;
    flex: 1;
  }
`;

interface PostItemTagProps {
  background?: string;
}

export const PostItemTag = styled('div')<PostItemTagProps>`
  align-items: center;
  background: ${(props) => props.background ? props.background : 'var(--color3)'};
  color: var(--color3-contrast);
  display: flex;
  font-size: 1.3rem;
  font-weight: 700;
  justify-content: center;
  text-transform: uppercase;
  margin-top: auto;
  padding: .2rem .5rem;
  ${media.lessThan('large')`
    font-size: 1rem;
  `}
`;

export const PostItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0px 0px 20px;
  ${media.lessThan('large')`
    margin: 0;
  `}
`;

export const PostItemDate = styled.time`
  font-family: var(--font-sans-serif);
  font-size: 0.9rem;
`;

export const PostItemTitle = styled.h1`
  font-family: var(--font-serif);
  font-size: 1.6rem;
  margin: 10px 0px;
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
`;
