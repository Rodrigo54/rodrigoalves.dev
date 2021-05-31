import getThemeColor from '@utils/getThemeColor';
import { getImage } from 'gatsby-plugin-image';
import React from 'react';
import { Clock } from '@styled-icons/fa-regular/Clock';
import { Music } from '@styled-icons/fa-solid/Music';

import * as S from './styles';
import PostInfo from '@components/post-info';

type Props = {
  slug: string,
  background?: string,
  featuredImage: any,
  category: string,
  date: string,
  timeToRead: number,
  title: string,
  description: string,
  tags: string[],
  music: {
    title: string,
    url: string,
  }
};

const PostItem: React.FC<Props> = ({
  slug,
  background,
  featuredImage,
  category,
  date,
  timeToRead,
  title,
  description,
  tags,
  music
}) => {
  const image = getImage(featuredImage) as any;

  return (
    <S.PostItemWrapper>
      <S.PostItemThumbnail alt={title} image={image} objectFit='cover' />
      <S.PostItemContent>
        <S.PostItemLink
          to={`/blog${slug}`}
          cover={true}
          direction='right'
          bg={getThemeColor()}
          duration={0.6}
        >
          <S.PostItemTitle>{title}</S.PostItemTitle>
          <S.PostItemDescription>{description}</S.PostItemDescription>
        </S.PostItemLink>
        <PostInfo info={{ timeToRead, date, music, tags }} />
      </S.PostItemContent>
    </S.PostItemWrapper>
  );
}

export default PostItem;
