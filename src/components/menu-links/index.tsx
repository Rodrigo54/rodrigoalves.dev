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
    },
    {
      label: 'Sobre Mim',
      url: '/about',
    },
  ];

  return (
    <S.MenuLinksWrapper>
      <S.MenuLinksList>
        {links.map((link, i) => (
          <S.MenuLinksItem key={i}>
            <Link href={link.url} passHref>
              <S.MenuLinksLink
                className={router.pathname === link.url ? 'active' : ''}
              >
                {link.label}
              </S.MenuLinksLink>
            </Link>
          </S.MenuLinksItem>
        ))}
      </S.MenuLinksList>
    </S.MenuLinksWrapper>
  );
};

export default MenuLinks;
