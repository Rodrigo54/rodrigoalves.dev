import React from 'react';
import * as S from './styles';
import { SocialLinksList as links } from '@model/social-links';

const SocialLinks: React.FC = () => {

  return (
    <S.SocialLinksWrapper>
      <S.SocialLinksList>
        {links.map((link, i) => {
          if(!link.show) { return; }
          const Icon = link.icon;
          return (
            <S.SocialLinksItem key={i}>
              <S.SocialLinksLink
                href={link.url}
                title={link.label}
                target='_blank'
                rel='noopener noreferrer'
              >
                <S.IconWrapper>
                  <Icon size={35} />
                </S.IconWrapper>
              </S.SocialLinksLink>
            </S.SocialLinksItem>
          );
        })}
      </S.SocialLinksList>
    </S.SocialLinksWrapper>
  );
}

export default SocialLinks;
