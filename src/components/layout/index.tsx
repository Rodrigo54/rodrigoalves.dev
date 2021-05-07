import { TransitionPortal } from 'gatsby-plugin-transition-link';
import React from 'react';

import MenuBar from '../menubar';
import Sidebar from '../sidebar';
import * as S from './styles';

type Props = {
  children: React.ReactNode,
};

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <S.LayoutWrapper>
      <TransitionPortal level='top'>
        <Sidebar />
      </TransitionPortal>
      <S.LayoutMain>
        {children}
      </S.LayoutMain>
      <TransitionPortal level='top'>
        <MenuBar></MenuBar>
      </TransitionPortal>
    </S.LayoutWrapper>
  );
}

export default Layout;