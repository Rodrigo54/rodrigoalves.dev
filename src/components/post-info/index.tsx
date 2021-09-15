import React from 'react';
import { Clock } from '@styled-icons/fa-regular/Clock';
import { Music } from '@styled-icons/fa-solid/Music';
import { CalendarAlt as Calendar } from '@styled-icons/fa-regular/CalendarAlt';

import * as S from './styles';
import PostTag from '@components/tag';

type Props = {
  info: {
    date: string;
    timeToRead: number;
    tags: string[];
    music: {
      title: string;
      url: string;
    };
  };
};

const PostInfo: React.FC<Props> = ({
  info: { date, timeToRead, music, tags },
}) => {
  function dateFormat() {
    const dateObj = new Date(date);
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
    const stringDate = Intl.DateTimeFormat('pt-BR', {
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
        <Clock size="15" /> Leia em {timeToRead} min
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
