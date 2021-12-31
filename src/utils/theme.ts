import { useLocalStore } from '@utils/local-storage';
import { isNil } from 'lodash';

export function useThemeCss(): [string | null, (value: string) => void] {
  const [theme, setTheme] = useLocalStore('theme');

  const setThemeValue = (value: string) => {
    if (!isNil(globalThis.document) && !isNil(value)) {
      if (theme) {
        document.body.classList.remove(theme);
      }
      document.body.classList.toggle(value);
      setTheme(value);
    }
  };
  return [theme, setThemeValue];
}

export function useDisplayCss(): [string | null, (value: string) => void] {
  const [display, setDisplay] = useLocalStore('display');

  const setDisplayValue = (value: string) => {
    if (!isNil(globalThis.document) && !isNil(value)) {
      if (display) {
        document.body.classList.remove(display);
      }
      document.body.classList.toggle(value);
      setDisplay(value);
    }
  };

  return [display, setDisplayValue];
}
