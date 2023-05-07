import { rgba } from 'polished';
import styled from 'styled-components';

interface PostTagProps {
  color: string;
}

export const PostTag = styled('span')<PostTagProps>`
  display: block;
  border-width: 1px;
  border-style: solid;
  border-color: ${({ color }) => color};
  border-radius: 80px;
  padding: 5px 15px;
  margin: 10px 0px;
  font-family: var(--font-serif);
  font-weight: 800;
  letter-spacing: 2px;
  text-transform: capitalize;
  font-size: 0.8rem;
  color: ${({ color }) => color};
  background: ${({ color }) => rgba(color, 0.1)};
  text-shadow: 1px 1px 0px rgb(0 0 0 / 25%);
`;
