import styled from 'styled-components';
import media from 'styled-media-query';

export const PaginationWrapper = styled.section`
  align-items: center;
  border-top: 1px solid var(--color1-light);
  color: var(--color2-contrast);
  display: flex;
  padding: 1.5rem 3rem;
  margin-top: auto;
  justify-content: space-between;
  ${media.lessThan('large')`
    font-size: .8rem;
    padding: 1rem;
  `}
  a {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    color: var(--color2-contrast);
    text-decoration: none;
    transition: color 0.5s;
    &:hover {
      color: var(--color3-light);
    }
    span {
      margin: 0px 10px;
    }
  }
`;

export const FirstCol = styled.div`
  display: flex;
  flex: 1;
  a {
    margin-right: auto;
    text-align: left;
  }
`;
export const MiddleCol = styled.div`
  display: flex;
  flex: 1;
  p {
    margin: 0px auto;
    text-align: center;
  }
`;
export const LastCol = styled.div`
  display: flex;
  flex: 1;
  a {
    margin-left: auto;
    text-align: right;
  }
`;
