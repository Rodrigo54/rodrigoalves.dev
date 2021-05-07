import React from 'react';
import { FacebookSquare } from '@styled-icons/boxicons-logos/FacebookSquare';
import { Github } from '@styled-icons/boxicons-logos/Github';
import { LinkedinSquare } from '@styled-icons/boxicons-logos/LinkedinSquare';
import { Twitter } from '@styled-icons/boxicons-logos/Twitter';
import * as S from './styles';

const Icons = {
  Github,
  Twitter,
  LinkedinSquare,
  FacebookSquare,
};

const SocialLinks: React.FC = () => {
  const links = [
    {
      icon: 'Github',
      label: 'Github',
      url: `https://github.com/rodrigo54`,
    },
    {
      icon: 'Twitter',
      label: 'Twitter',
      url: `https://twitter.com/rodrigo254mix`,
    },
    {
      icon: 'LinkedinSquare',
      label: 'Linkedin',
      url: `https://br.linkedin.com/in/rodrigo54`,
    },
    {
      icon: 'FacebookSquare',
      label: 'Facebook',
      url: `https://www.facebook.com/rodrigo54`,
    },
  ];

  return (
    <S.SocialLinksWrapper>
      <S.SocialLinksList>
        {links.map((link, i) => {
          const Icon = Icons[link.icon];

          return (
            <S.SocialLinksItem key={i}>
              <S.SocialLinksLink
                href={link.url}
                title={link.label}
                target='_blank'
                rel='noopener noreferrer'
              >
                <S.IconWrapper>
                  <Icon />
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
