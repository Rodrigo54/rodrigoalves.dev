import styled from 'styled-components';
import media from 'styled-media-query';


export const PostInfoWrapper = styled.div`
  display: grid;
  grid-template: repeat(auto, 3) / 1fr;
  ${media.lessThan('large')`
    grid-template: repeat(auto, 3) / 1fr;
  `}
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
`;

export const PostReadTime = styled.span`
  display: flex;
  gap: 5px;
  font-family: var(--font-serif);
  font-size: 0.9rem;
  line-height: 1.2;
  margin: 5px 0px;
`;

export const PostMusic = styled.span`
  display: flex;
  gap: 5px;
  font-family: var(--font-serif);
  font-size: 0.9rem;
  line-height: 1.2;
  margin: 5px 0px;
`;

export const PostMusicLink = styled.a`
  color: var(--color3-light);
  text-decoration: none;
  border-bottom: 1px dashed transparent;
  transition: border-bottom 0.3s;
  &:hover {
    border-bottom: 1px dashed var(--color3-light);
  }
`;
