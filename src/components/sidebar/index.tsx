import React from 'react';

import Profile from '../profile';
import MenuLinks from '../menu-links';
import * as S from './styles';

const Sidebar: React.FC = () => (
  <S.SidebarWrapper>
    <Profile />
    <MenuLinks />
  </S.SidebarWrapper>
);

export default Sidebar;
