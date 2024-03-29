import PostInfo from '@components/post-info';
import { FrontMatter } from '@model/frontmatter';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import * as S from './styles';

type Props = {
  frontMatter: Pick<
    FrontMatter,
    | 'slug'
    | 'featuredImage'
    | 'createAt'
    | 'timeToRead'
    | 'title'
    | 'description'
    | 'tags'
    | 'music'
  >;
};

const PostItem: React.FC<Props> = ({ frontMatter }) => {
  const {
    slug,
    featuredImage,
    createAt,
    timeToRead,
    title,
    description,
    tags,
    music,
  } = frontMatter;

  return (
    <S.PostItemWrapper>
      <S.PostItemThumbnail>
        <Image alt={title} src={featuredImage} fill loading="lazy" />
      </S.PostItemThumbnail>
      <S.PostItemContent>
        <Link href={`/blog/${slug}`} passHref>
          <S.PostItemLink>
            <S.PostItemTitle>{title}</S.PostItemTitle>
            <S.PostItemDescription>{description}</S.PostItemDescription>
          </S.PostItemLink>
        </Link>
        <PostInfo info={{ timeToRead, createAt, music, tags }} />
      </S.PostItemContent>
    </S.PostItemWrapper>
  );
};

export default PostItem;
