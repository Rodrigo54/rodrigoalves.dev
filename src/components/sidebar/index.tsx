import React from 'react';

import Profile from '../profile';
import MenuLinks from '../menu-links';
import SocialLinks from '../social-links';
import * as S from './styles';

const Sidebar: React.FC = () => (
  <S.SidebarWrapper>
    <Profile />
    <MenuLinks />
    <SocialLinks />
  </S.SidebarWrapper>
);

export default Sidebar;
