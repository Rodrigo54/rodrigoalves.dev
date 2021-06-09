import styled from 'styled-components';
import media from 'styled-media-query';
import { GatsbyImage } from "gatsby-plugin-image";

export const PostPaper = styled.div`
  background: var(--color2);
  color: var(--color2-contrast);
  z-index: 2;
  margin: -120px auto 0px;
  padding: 25px;
  max-width: 1200px;
  width: 90%;
  box-shadow: 0 14px 28px rgba(0,0,0,0.10), 0 10px 10px rgba(0,0,0,0.10);
  ${media.lessThan('large')`
    width: 90vw;
    max-width: 900px;
  `}
`;

export const PostThumbnail = styled(GatsbyImage)`
  z-index: 1;
  width: 100%;
  margin: auto;
  height: 350px;
`;

