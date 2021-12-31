import styled from 'styled-components';
import media from 'styled-media-query';

export const PaginationColumn = styled.div`
  display: flex;
  flex-flow: column nowrap;
  width: 270px;
  gap: 15px;
  margin: 30px;
  ${media.lessThan('large')`
    margin: 30px 0px;
  `}
`;

export const PaginationRow = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  gap: 15px;
`;
export const PageStrong = styled.span`
  background-color: var(--color3, green);
  color: var(--color3-contrast);
  padding: 5px;
  border-radius: 3px;
`;

export const PageSpan = styled.span`
  background-color: var(--color2, #fff);
  color: var(--color2-contrast, #000);
  padding: 5px;
  border-radius: 3px;
`;
