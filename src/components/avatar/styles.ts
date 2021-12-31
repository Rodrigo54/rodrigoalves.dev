import styled from 'styled-components';
import media from 'styled-media-query';

export const AvatarImage = styled.div`
  height: 9rem;
  width: 9rem;
  margin: auto;
  border-radius: 50%;
  position: relative;
  overflow: hidden;
  ${media.lessThan('large')`
      height: 1.875rem;
      width: 1.875rem;
  `}
`;
