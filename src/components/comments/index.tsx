import React, { useEffect, useState } from 'react';
import { DiscussionEmbed } from 'disqus-react';

import * as S from './styles';
import { BehaviorSubject } from 'rxjs';

export const disqusData = new BehaviorSubject<{
  url?: string;
  title?: string;
  identifier?: string;
  shortname: string;
  language: string;
}>({
  shortname: 'rodrigo-io',
  language: 'pt-BR',
});

type Props = {
  title: string;
  slug: string;
  identifier: number;
};

const Comments: React.FC<Props> = ({ slug, title, identifier }) => {
  const [disqusConfig, setDisqusConfig] = useState({});

  useEffect(() => {
    if (slug) {
      const url = `https://rodrigoalves.dev/blog/${slug}`;
      setDisqusConfig({
        url,
        title,
        identifier: `${identifier}`,
        language: 'pt-BR',
      });
      disqusData.next({
        url,
        title,
        identifier: `${identifier}`,
        shortname: 'rodrigo-io',
        language: 'pt-BR',
      });
    }
  }, [slug, identifier, title]);

  return (
    <S.CommentsWrapper>
      <S.CommentsTitle>Comentários</S.CommentsTitle>
      <DiscussionEmbed shortname="rodrigo-io" config={disqusConfig} />
    </S.CommentsWrapper>
  );
};

export default Comments;
