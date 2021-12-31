import React from 'react';
import * as S from './styles';
import { SocialLinksList as links } from '@model/social-links';

const AllSocialLinks: React.FC = () => {
  return (
    <S.SocialLinksWrapper>
      <S.Title>Redes Sociais</S.Title>
      <S.SocialLinksList>
        {links.map((link, i) => {
          const Icon = link.icon;
          return (
            <S.SocialLinksItem key={i}>
              <S.SocialLinksLink
                href={link.url}
                title={link.label}
                target="_blank"
                rel="noopener noreferrer"
              >
                <S.IconWrapper>
                  <Icon size={50} />
                  <S.TextWrapper>
                    <S.Name> {link.label} </S.Name>
                    <S.Nickname> {link.nickname} </S.Nickname>
                  </S.TextWrapper>
                </S.IconWrapper>
              </S.SocialLinksLink>
            </S.SocialLinksItem>
          );
        })}
      </S.SocialLinksList>
    </S.SocialLinksWrapper>
  );
};

export default AllSocialLinks;
