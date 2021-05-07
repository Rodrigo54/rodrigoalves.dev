import styled from 'styled-components';
import media from 'styled-media-query';

export const PaginationWrapper = styled.section`
  align-items: center;
  border-top: 1px solid var(--color1-light);
  color: var(--color2-contrast);
  display: flex;
  padding: 1.5rem 3rem;
  justify-content: space-between;
  ${media.lessThan('large')`
    font-size: .8rem;
    padding: 1rem;
  `}
  a {
    color: var(--color2-contrast);
    text-decoration: none;
    transition: color 0.5s;
    &:hover {
      color: var(--color3-light);
    }
  }
`;
