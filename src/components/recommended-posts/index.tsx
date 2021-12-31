import React from 'react';
import { ArrowLeftS as Previous } from '@styled-icons/remix-line/ArrowLeftS';
import { ArrowRightS as Next } from '@styled-icons/remix-line/ArrowRightS';

import * as S from './styles';
import Link from 'next/link';

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
        <Link href={`/blog/${previous.slug}`} passHref>
          <S.RecommendedLink className="previous">
            <p>
              <Previous size="20" /> {previous.title}
            </p>
          </S.RecommendedLink>
        </Link>
      )}
      {next && (
        <Link href={`/blog/${next.slug}`} passHref>
          <S.RecommendedLink className="next">
            <p>
              {next.title} <Next size="20" />
            </p>
          </S.RecommendedLink>
        </Link>
      )}
    </S.RecommendedWrapper>
  );
};

export default RecommendedPosts;
