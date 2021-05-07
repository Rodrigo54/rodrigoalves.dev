import { graphql, useStaticQuery } from 'gatsby';
import { getImage, IGatsbyImageData } from 'gatsby-plugin-image';
import React from 'react';

import * as S from './styles';

type Props = {
  image?: IGatsbyImageData;
  alt?: string;
  children: React.ReactNode,
};

const PaperLayout: React.FC<Props> = ({
  image,
  alt,
  children
}) => {

  const data = useStaticQuery<{ file: IGatsbyImageData }>(graphql`
    query PaperDefaultImageQuery {
      file(
        relativePath: {eq: "post-bg.jpg"}
        sourceInstanceName: { eq: "images" }
      ) {
        childImageSharp {
          gatsbyImageData(
            layout: FULL_WIDTH,
            placeholder: BLURRED
          )
        }
      }
    }
  `);

  const featuredImage: IGatsbyImageData = image
    ? getImage(image) as any
    : getImage(data.file);

  return (
    <>
      <S.PostThumbnail alt={alt ?? 'Featured Image'} image={featuredImage} />
      <S.PostPaper>
        {children}
      </S.PostPaper>
    </>
  )
}

export default PaperLayout;
