import getThemeColor from '@utils/getThemeColor';
import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import Avatar from '../avatar';
import * as S from './styles';

type site = {
  site: {
    siteMetadata: {
      title: string,
      position: string,
      description: string,
    }
  }
}

const Profile: React.FC = () => {
  const { site: { siteMetadata } } = useStaticQuery<site>(
    graphql`
      query {
        site {
          siteMetadata {
            title
            position
            description
          }
        }
      }
    `,
  );
  const { title, position, description } = siteMetadata;
  return (
    <S.ProfileWrapper>
      <S.ProfileLink
        to='/'
        cover={true}
        direction='left'
        bg={getThemeColor()}
        duration={0.6}
      >
        <Avatar alt={title} />
        <S.ProfileAuthor>
          {title}
          <S.ProfilePosition>{position}</S.ProfilePosition>
        </S.ProfileAuthor>
      </S.ProfileLink>
      <S.ProfileDescription>{description}</S.ProfileDescription>
    </S.ProfileWrapper>
  );
}

export default Profile;
