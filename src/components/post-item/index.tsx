import React from 'react';

import * as S from './styles';
import PostInfo from '@components/post-info';
import Link from 'next/link';
import Image from 'next/image';

type Props = {
  slug: string;
  background?: string;
  featuredImage: string;
  category: string;
  date: string;
  timeToRead: number;
  title: string;
  description: string;
  tags: string[];
  music: {
    title: string;
    url: string;
  };
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
  music,
}) => {
  return (
    <S.PostItemWrapper>
      <S.PostItemThumbnail>
        <Image
          alt={title}
          src={featuredImage}
          objectFit="cover"
          layout="fill"
        />
      </S.PostItemThumbnail>
      <S.PostItemContent>
        <Link href={`/blog/${slug}`} passHref>
          <S.PostItemLink>
            <S.PostItemTitle>{title}</S.PostItemTitle>
            <S.PostItemDescription>{description}</S.PostItemDescription>
          </S.PostItemLink>
        </Link>
        <PostInfo info={{ timeToRead, date, music, tags }} />
      </S.PostItemContent>
    </S.PostItemWrapper>
  );
};

export default PostItem;
