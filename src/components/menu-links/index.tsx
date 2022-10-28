import Link from 'next/link';
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
    <Link href={link.url} passHref target="_blank" rel="noopener noreferrer">
      <S.MenuLinksLink>{link.label}</S.MenuLinksLink>
    </Link>
  );

  const LocalLink = (link: typeof links[0]) => (
    <Link
      href={link.url}
      passHref
      className={router.pathname === link.url ? 'active' : ''}
    >
      <S.MenuLinksLink>{link.label}</S.MenuLinksLink>
    </Link>
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
