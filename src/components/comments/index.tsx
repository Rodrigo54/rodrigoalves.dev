import React from 'react';
import { Disqus } from 'gatsby-plugin-disqus';

import * as S from './styles';

type Props = {
  url: string,
  title: string,
  identifier: number,
};

const Comments: React.FC<Props> = ({
  url,
  title,
  identifier
}) => {
  const completeURL = `https://rodrigoalves.dev/blog${url}`;

  return (
    <S.CommentsWrapper>
      <S.CommentsTitle>Comentários</S.CommentsTitle>
      <Disqus
        identifier={`${identifier}`}
        title={title}
        url={completeURL}
      />
    </S.CommentsWrapper>
  );
}

export default Comments;
