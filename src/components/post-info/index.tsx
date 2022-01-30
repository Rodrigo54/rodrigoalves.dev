import React from 'react';
import { Clock } from '@styled-icons/fa-regular/Clock';
import { Music } from '@styled-icons/fa-solid/Music';
import { CalendarAlt as Calendar } from '@styled-icons/fa-regular/CalendarAlt';
import { parse } from 'date-fns';

import * as S from './styles';
import PostTag from '@components/tag';
import { FrontMatter } from '@model/frontmatter';

type Props = {
  info: Pick<FrontMatter, 'createAt' | 'timeToRead' | 'music' | 'tags'>;
};

const PostInfo: React.FC<Props> = ({
  info: { createAt, timeToRead, music, tags },
}) => {
  function dateFormat() {
    const dateObj = parse(createAt, 'yyyy-MM-dd HH:mm:ss XX', new Date());
    let prefix = '';
    switch (dateObj.getDay()) {
      case 1:
        prefix = 'na segunda feira';
        break;
      case 2:
        prefix = 'na terça feira';
        break;
      case 3:
        prefix = 'na quarta feira';
        break;
      case 4:
        prefix = 'na quinta feira';
        break;
      case 5:
        prefix = 'na sexta feira';
        break;
      case 6:
        prefix = 'no sábado';
        break;
      case 7:
        prefix = 'no domingo';
        break;
    }
    const stringDate = new Intl.DateTimeFormat('pt-BR', {
      dateStyle: 'long',
    }).format(dateObj);
    return (
      <p>
        <span>Postado {prefix},</span>
        <span> {stringDate}</span>
      </p>
    );
  }

  return (
    <S.PostInfoWrapper>
      <S.PostDate>
        <Calendar size="15" /> {dateFormat()}
      </S.PostDate>
      <S.PostReadTime>
        <Clock size="15" /> Leia em {Math.round(timeToRead.minutes)} min
      </S.PostReadTime>
      <S.PostMusic>
        <Music size="15" /> <span>Ouvindo </span>
        <S.PostMusicLink
          href={music.url}
          rel="noopener noreferrer"
          target="_blank"
        >
          {music.title}
        </S.PostMusicLink>
      </S.PostMusic>
      <S.PostTagsRow>
        {tags?.map((tag, index) => (
          <PostTag key={index} tag={tag} />
        ))}
      </S.PostTagsRow>
    </S.PostInfoWrapper>
  );
};

export default PostInfo;
