import getThemeColor from '@utils/getThemeColor';
import React from 'react';

import * as S from './styles';

const MenuLinks: React.FC = () => {
  const links = [
    {
      label: 'Home',
      url: '/',
    },
    {
      label: 'Sobre Mim',
      url: '/about/',
    },
  ];

  return (
    <S.MenuLinksWrapper>
      <S.MenuLinksList>
        {links.map((link, i) => (
          <S.MenuLinksItem key={i}>
            <S.MenuLinksLink
              cover={true}
              direction='left'
              bg={getThemeColor()}
              to={link.url}
              activeClassName='active'
            >
              {link.label}
            </S.MenuLinksLink>
          </S.MenuLinksItem>
        ))}
      </S.MenuLinksList>
    </S.MenuLinksWrapper>
  );
}

export default MenuLinks;
