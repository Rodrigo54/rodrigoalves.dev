import styled from 'styled-components';
import media from 'styled-media-query';

export const PaginationColumn = styled.div`
  display: flex;
  flex-flow: column nowrap;
  width: 270px;
  gap: 10px;
  margin: 30px;
  ${media.lessThan('large')`
    margin: 30px 0px;
  `}
`;

export const PaginationRow = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
`;
export const PageStrong = styled.span`
  background-color: var(--color3);
  color: var(--color3-contrast);
  padding: 5px;
  border-radius: 3px;
`;

export const PageSpan = styled.span`
  background-color: var(--color2);
  color: var(--color2-contrast);
  padding: 5px;
  border-radius: 3px;
`;
