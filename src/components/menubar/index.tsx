import { UpArrowAlt as Arrow } from '@styled-icons/boxicons-regular/UpArrowAlt';
import { Grid } from '@styled-icons/boxicons-solid/Grid';
import { Home } from '@styled-icons/boxicons-solid/Home';
import { LightMode } from '@styled-icons/material-outlined/LightMode';
import { DarkMode } from '@styled-icons/material-outlined/DarkMode';
import { ThList as List } from '@styled-icons/typicons/ThList';
import { useDisplayCss, useThemeCss } from '@utils/theme';
import React, { useEffect } from 'react';

import * as S from './styles';
import { isNil } from 'lodash';

const MenuBar: React.FC = () => {
  const [theme, setTheme] = useThemeCss();
  const [display, setDisplay] = useDisplayCss();

  const isDarkMode = theme === 'dark';
  const isListMode = display === 'list';

  useEffect(() => {
    setTheme(theme ?? 'dark');
    setDisplay(display ?? 'list');
  }, []);

  function setPreferredTheme() {
    setTheme(isDarkMode ? 'light' : 'dark');
    if (!isNil(globalThis.DISQUS)) {
      setTimeout(() => {
        globalThis.DISQUS.reset({
          reload: true,
          config: {},
        });
      }, 300);
    }
  }

  function setPreferredConfig() {
    setDisplay(isListMode ? 'grid' : 'list');
  }

  function toTop() {
    globalThis.scroll({ top: 0, behavior: 'smooth' });
  }

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
          {isListMode ? <Grid /> : <List />}
        </S.MenuBarItem>
        <S.MenuBarItem title="Ir para o Topo" onClick={() => toTop()}>
          <Arrow />
        </S.MenuBarItem>
      </S.MenuBarGroup>
    </S.MenuBarWrapper>
  );
};

export default MenuBar;
