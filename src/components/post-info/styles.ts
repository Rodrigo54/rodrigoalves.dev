import styled from 'styled-components';
import media from 'styled-media-query';

export const PostInfoWrapper = styled.div`
  display: grid;
  grid-template: repeat(4, auto) / 100%;
`;

export const PostTagsRow = styled.div`
  display: flex;
  gap: 10px;
  margin: 5px 0px;
`;

export const PostDate = styled.time`
  display: flex;
  gap: 5px;
  font-family: var(--font-serif);
  font-size: 0.9rem;
  margin: 5px 0px;
  ${media.lessThan('small')`
    p > span:first-child {
      visibility: hidden;
      display: none;
    }
  `}
  body.grid & {
    p > span:first-child {
      visibility: hidden;
      display: none;
    }
  }
`;

export const PostReadTime = styled.p`
  display: flex;
  gap: 5px;
  font-family: var(--font-serif);
  font-size: 0.9rem;
  line-height: 1.2;
  margin: 5px 0px;
`;

export const PostMusic = styled.p`
  display: flex;
  gap: 5px;
  font-family: var(--font-serif);
  font-size: 0.9rem;
  line-height: 1.2;
  margin: 5px 0px;
  width: 100%;
  body.grid & {
    span {
      visibility: hidden;
      display: none;
    }
  }
  ${media.lessThan('small')`
    span {
      visibility: hidden;
      display: none;
    }
  `}
`;

export const PostMusicLink = styled.a`
  color: var(--color3-light);
  text-decoration: none;
  border-bottom: 1px dashed transparent;
  transition: border-bottom 0.3s;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 90%;
  &:hover {
    border-bottom: 1px dashed var(--color3-light);
  }
`;
