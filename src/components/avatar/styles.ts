import styled from "styled-components";
import media from "styled-media-query";

export const AvatarWrapper = styled.div`
  .gatsby-image-wrapper {
    height: 9rem;
    width: 9rem;
    margin: auto;
    border-radius: 50%;
    ${media.lessThan("large")`
      height: 1.875rem;
      width: 1.875rem;
  `}
  }
`;
