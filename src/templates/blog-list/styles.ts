import styled from 'styled-components';

export const ListWrapper = styled.section`
  body#grid & {
    display: grid;
    grid-area: posts;
    grid-gap: 20px;
    margin: 20px;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }
`;
