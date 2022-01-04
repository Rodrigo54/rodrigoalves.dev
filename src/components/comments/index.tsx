import React from 'react';
import { DiscussionEmbed } from 'disqus-react';

import * as S from './styles';

type Props = {
  title: string;
  slug: string;
  identifier: number;
};

const Comments: React.FC<Props> = ({ slug, title, identifier }) => {
  const url = `https://rodrigoalves.dev/blog/${slug}`;

  return (
    <S.CommentsWrapper>
      <S.CommentsTitle>Comentários</S.CommentsTitle>
      <DiscussionEmbed
        shortname="rodrigo-io"
        config={{
          url,
          title,
          identifier: `${identifier}`,
          language: 'pt-BR',
        }}
      />
    </S.CommentsWrapper>
  );
};

export default Comments;
