import React from 'react';
import { DiscussionEmbed } from 'disqus-react';

import * as S from './styles';

type Props = {
  title: string;
  slug: string;
};

const Comments: React.FC<Props> = ({ slug, title }) => {
  const url = `https://rodrigoalves.dev/blog/${slug}`;

  return (
    <S.CommentsWrapper>
      <S.CommentsTitle>Comentários</S.CommentsTitle>
      <DiscussionEmbed
        shortname="rodrigo-io"
        config={{
          url,
          title,
          identifier: slug,
          language: 'pt-BR',
        }}
      />
    </S.CommentsWrapper>
  );
};

export default Comments;
