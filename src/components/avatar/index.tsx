import React from 'react';
import Image from 'next/image';

import * as S from './styles';

const Avatar = ({ alt = 'Profile Photo' }) => {
  return (
    <S.AvatarImage>
      <Image
        src="/img/profile-photo.jpg"
        alt={alt}
        layout="fill"
        priority
      ></Image>
    </S.AvatarImage>
  );
};

export default Avatar;
