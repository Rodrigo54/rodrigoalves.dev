import React from 'react';
import { useRouter } from 'next/router';

import * as S from './styles';

const MenuLinks: React.FC = () => {
  const router = useRouter();

  const links = [
    {
      label: 'Home',
      url: '/',
      external: false,
    },
    {
      label: 'Sobre Mim',
      url: '/about',
      external: false,
    },
    {
      label: 'Resume',
      url: 'https://resume.rodrigoalves.dev/',
      external: true,
    },
  ];

  const ExternalLink = (link: typeof links[0]) => (
    <S.MenuLinksLink
      href={link.url}
      passHref
      target="_blank"
      rel="noopener noreferrer"
    >
      {link.label}
    </S.MenuLinksLink>
  );

  const LocalLink = (link: typeof links[0]) => (
    <S.MenuLinksLink
      href={link.url}
      passHref
      className={router.pathname === link.url ? 'active' : ''}
    >
      {link.label}
    </S.MenuLinksLink>
  );

  return (
    <S.MenuLinksWrapper>
      <S.MenuLinksList>
        {links.map((link, i) => (
          <S.MenuLinksItem key={i}>
            {link.external ? ExternalLink(link) : LocalLink(link)}
          </S.MenuLinksItem>
        ))}
      </S.MenuLinksList>
    </S.MenuLinksWrapper>
  );
};

export default MenuLinks;
