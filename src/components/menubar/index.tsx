import getThemeColor from '@utils/getThemeColor';
import React, { useEffect, useState } from 'react';
import { UpArrowAlt as Arrow } from '@styled-icons/boxicons-regular/UpArrowAlt';
import { Grid } from '@styled-icons/boxicons-solid/Grid';
import { Home } from '@styled-icons/boxicons-solid/Home';
import { FormatColorFill as Light } from '@styled-icons/material/FormatColorFill';
import { ThList as List } from '@styled-icons/typicons/ThList';

import * as S from './styles';

const MenuBar: React.FC = () => {
  const [theme, setTheme] = useState<string | null>(null);
  const [display, setDisplay] = useState<string | null>(null);

  const isDarkMode = theme === 'dark';
  const isListMode = display === 'list';

  // useEffect(() => {
  //   setTheme(globalThis.__theme);
  //   setDisplay(globalThis.__config?.display);
  //   globalThis.__onThemeChange = () => setTheme(globalThis.__theme);
  //   globalThis.__onConfigChange = () => setDisplay(globalThis.__config.display);
  // }, []);

  const setPreferredTheme = () => {
    // if (globalThis?.__setPreferredTheme) {
    //   globalThis.__setPreferredTheme(isDarkMode ? 'light' : 'dark');
    // }
    // if (globalThis.DISQUS !== undefined) {
    //   setTimeout(() => {
    //     globalThis.DISQUS.reset({
    //       reload: true,
    //       config: {},
    //     });
    //   }, 300);
    // }
  };

  const setPreferredConfig = () => {
    // if (globalThis?.__setPreferredConfig) {
    //   globalThis.__setPreferredConfig({
    //     display: isListMode ? 'grid' : 'list',
    //   });
    // }
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
          <Light />
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
