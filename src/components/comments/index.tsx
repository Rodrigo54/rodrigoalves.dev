import React from 'react';
import ReactDisqusComments from 'react-disqus-comments';

import * as S from './styles';

type Props = {
  url: string,
  title: string,
  identifier: number,
};

const Comments: React.FC<Props> = ({ url, title, identifier }) => {
  const completeURL = `https://rodrigoalves.me/blog${url}`;
  const disqusShortname = 'rodrigo-io';

  return (
    <S.CommentsWrapper>
      <S.CommentsTitle>Comentários</S.CommentsTitle>
      <ReactDisqusComments
        shortname={disqusShortname}
        identifier={`${identifier}`}
        title={title}
        url={completeURL}
      />
    </S.CommentsWrapper>
  );
}

export default Comments;
