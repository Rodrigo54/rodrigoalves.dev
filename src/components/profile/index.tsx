import React from 'react';
import Avatar from '../avatar';
import * as S from './styles';
import SocialLinks from '../social-links';
import { Metadata } from '@model/metadata';
import Link from 'next/link';

const Profile: React.FC = () => {
  const { title, position, description } = Metadata;
  return (
    <S.ProfileWrapper>
      <Link href="/" passHref>
        <S.ProfileLink>
          <Avatar alt={title} />
          <S.ProfileAuthor>
            {title}
            <S.ProfilePosition>{position}</S.ProfilePosition>
          </S.ProfileAuthor>
        </S.ProfileLink>
      </Link>
      <S.ProfileDescription>{description}</S.ProfileDescription>
      <SocialLinks />
    </S.ProfileWrapper>
  );
};

export default Profile;
