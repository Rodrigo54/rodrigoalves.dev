import getThemeColor from '@utils/getThemeColor';
import React from 'react';
import { ArrowLeftS as Previous } from '@styled-icons/remix-line/ArrowLeftS';
import { ArrowRightS as Next } from '@styled-icons/remix-line/ArrowRightS';

import * as S from './styles';

type Props = {
  next?: {
    slug: string;
    title: string;
  };
  previous?: {
    slug: string;
    title: string;
  };
};

const RecommendedPosts: React.FC<Props> = ({ next, previous }) => {
  return (
    <S.RecommendedWrapper>
      {previous && (
        <S.RecommendedLink
          to={`/blog${previous.slug}`}
          cover={true}
          direction='left'
          bg={getThemeColor()}
          className='previous'
        >
          <p><Previous size='20'/> {previous.title}</p>
        </S.RecommendedLink>
      )}
      {next && (
        <S.RecommendedLink
          to={`/blog${next.slug}`}
          cover={true}
          direction='right'
          bg={getThemeColor()}
          className='next'
        >
          <p>{next.title} <Next size='20'/></p>
        </S.RecommendedLink>
      )}
    </S.RecommendedWrapper>
  );
}

export default RecommendedPosts;
