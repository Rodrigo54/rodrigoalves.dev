import { graphql, useStaticQuery } from 'gatsby';
import { getImage, IGatsbyImageData } from 'gatsby-plugin-image';
import React from 'react';

import * as S from './styles';

type Props = {
  title?: string;
  subtitle?: string;
  image?: IGatsbyImageData;
  alt?: string;
  children: React.ReactNode,
};

const PaperLayout: React.FC<Props> = ({
  title,
  subtitle,
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
    <S.PaperWrapper>
      <S.Thumbnail alt={alt ?? 'Featured Image'} image={featuredImage} />
      <S.Header>
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </S.Header>
      <S.PaperContent>
        {children}
      </S.PaperContent>
    </S.PaperWrapper>
  )
}

export default PaperLayout;
