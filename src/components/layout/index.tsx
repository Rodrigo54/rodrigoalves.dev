import GlobalStyles from '@styles/global';
import ThemeStyles from '@styles/theme';

import React from 'react';

import MenuBar from '../menubar';
import Sidebar from '../sidebar';
import * as S from './styles';

type Props = {
  children: React.ReactNode;
};

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <S.LayoutWrapper>
      <GlobalStyles />
      <ThemeStyles />
      <Sidebar />
      <S.LayoutMain>{children}</S.LayoutMain>
      <MenuBar />
    </S.LayoutWrapper>
  );
};

export default Layout;
