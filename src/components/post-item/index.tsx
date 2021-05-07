import getThemeColor from '@utils/getThemeColor';
import { getImage } from 'gatsby-plugin-image';
import React from 'react';

import * as S from './styles';

type Props = {
  slug: string,
  background?: string,
  featuredImage: any,
  category: string,
  date: string,
  timeToRead: number,
  title: string,
  description: string,
};

const PostItem: React.FC<Props> = ({
  slug,
  background,
  featuredImage,
  category,
  date,
  timeToRead,
  title,
  description
}) => {
  const image = getImage(featuredImage) as any;

  return (
    <S.PostItemLink
      to={`/blog${slug}`}
      cover={true}
      direction='right'
      bg={getThemeColor()}
      duration={0.6}
    >
      <S.PostItemThumbnail alt={title} image={image} objectFit='cover' />
      <S.PostItemWrapper>
        <S.PostItemInfo>
          <S.PostItemDate>
            {date} • {timeToRead} min de leitura
          </S.PostItemDate>
          <S.PostItemTitle>{title}</S.PostItemTitle>
          <S.PostItemDescription>{description}</S.PostItemDescription>
        </S.PostItemInfo>
        <S.PostItemTag background={background}>{category}</S.PostItemTag>
      </S.PostItemWrapper>
    </S.PostItemLink>
  );
}

export default PostItem;
