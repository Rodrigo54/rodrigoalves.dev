import { useLocalStore } from '@utils/local-storage';
import { isNil } from 'lodash';
import { useEffect, useState } from 'react';

export function useThemeCss(
  initialValue?: string
): [string | null, (value: string) => void] {
  const [themeLocalStore, setThemeLocalStore] = useLocalStore('theme');
  const [theme, setTheme] = useState<string | null>(null);

  useEffect(() => {
    if (initialValue && !themeLocalStore) {
      setThemeValue(initialValue);
    }
    if (themeLocalStore) {
      setThemeValue(themeLocalStore);
    }
  }, []);

  const setThemeValue = (value: string) => {
    if (!isNil(globalThis.document) && !isNil(value)) {
      if (theme) {
        document.body.classList.remove(theme);
      }
      document.body.classList.add(value);
      setThemeLocalStore(value);
      setTheme(value);
    }
  };
  return [theme, setThemeValue];
}

export function useDisplayCss(
  initialValue?: string
): [string | null, (value: string) => void] {
  const [displayLocalStore, setDisplayLocalStore] = useLocalStore('display');
  const [display, setDisplay] = useState<string | null>(null);

  useEffect(() => {
    if (initialValue && !displayLocalStore) {
      setDisplayValue(initialValue);
    }
    if (displayLocalStore) {
      setDisplayValue(displayLocalStore);
    }
  }, []);

  const setDisplayValue = (value: string) => {
    if (!isNil(globalThis.document) && !isNil(value)) {
      if (display) {
        document.body.classList.remove(display);
      }
      document.body.classList.add(value);
      setDisplay(value);
      setDisplayLocalStore(value);
    }
  };

  return [display, setDisplayValue];
}
