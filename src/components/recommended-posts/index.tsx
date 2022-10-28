import React from 'react';
import { ArrowLeftS as Previous } from '@styled-icons/remix-line/ArrowLeftS';
import { ArrowRightS as Next } from '@styled-icons/remix-line/ArrowRightS';

import * as S from './styles';

import { FrontMatter } from '@model/frontmatter';

type Props = {
  next: FrontMatter | null;
  previous: FrontMatter | null;
};

const RecommendedPosts: React.FC<Props> = ({ next, previous }) => {
  return (
    <S.RecommendedWrapper>
      {previous && (
        <S.RecommendedLink
          href={`/blog/${previous.slug}`}
          passHref
          className="previous"
        >
          <p>
            <Previous size="20" /> {previous.title}
          </p>
        </S.RecommendedLink>
      )}
      {next && (
        <S.RecommendedLink
          href={`/blog/${next.slug}`}
          passHref
          className="next"
        >
          <p>
            {next.title} <Next size="20" />
          </p>
        </S.RecommendedLink>
      )}
    </S.RecommendedWrapper>
  );
};

export default RecommendedPosts;
