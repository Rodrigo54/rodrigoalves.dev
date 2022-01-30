import { List } from '@styled-icons/bootstrap/List';
import { UpArrowAlt as Arrow } from '@styled-icons/boxicons-regular/UpArrowAlt';
import { Grid } from '@styled-icons/boxicons-solid/Grid';
import { Home } from '@styled-icons/boxicons-solid/Home';
import { DarkMode } from '@styled-icons/material-outlined/DarkMode';
import { LightMode } from '@styled-icons/material-outlined/LightMode';
import { useDisplayCss, useThemeCss } from '@utils/theme';
import { isNil } from 'lodash';
import React from 'react';

import * as S from './styles';

const MenuBar: React.FC = () => {
  const [theme, setTheme] = useThemeCss('dark');
  const [display, setDisplay] = useDisplayCss('list');

  const isDarkMode = theme === 'dark';
  const isListMode = display === 'list';

  const setPreferredTheme = () => {
    setTheme(isDarkMode ? 'light' : 'dark');
    if (!isNil(globalThis.DISQUS)) {
      globalThis.DISQUS.reset({
        reload: true,
      });
    }
  };

  const setPreferredConfig = () => {
    setDisplay(isListMode ? 'grid' : 'list');
  };

  const toTop = () => {
    globalThis.scroll({ top: 0, behavior: 'smooth' });
  };

  return (
    <S.MenuBarWrapper>
      <S.MenuBarGroup>
        <S.MenuBarLink href="/">
          <a title="Voltar para Home">
            <S.MenuBarItem>
              <Home />
            </S.MenuBarItem>
          </a>
        </S.MenuBarLink>
      </S.MenuBarGroup>
      <S.MenuBarGroup>
        <S.MenuBarItem title="Mudar o tema" onClick={() => setPreferredTheme()}>
          {isDarkMode ? <DarkMode /> : <LightMode />}
        </S.MenuBarItem>
        <S.MenuBarItem
          title="Mudar visualização"
          className="display"
          onClick={() => setPreferredConfig()}
        >
          {isListMode ? <List /> : <Grid />}
        </S.MenuBarItem>
        <S.MenuBarItem title="Ir para o Topo" onClick={() => toTop()}>
          <Arrow />
        </S.MenuBarItem>
      </S.MenuBarGroup>
    </S.MenuBarWrapper>
  );
};

export default MenuBar;
