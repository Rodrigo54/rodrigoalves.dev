import { createGlobalStyle } from 'styled-components';

const ThemeStyles = createGlobalStyle`
  :root {
    --color1: #333;
    --color1-light: #4c475d;
    --color1-shade: #303030;
    --color1-contrast: #fff;

    --color2: #1e1e1e;
    --color2-light: #3c3c3c;
    --color2-shade: #2b2b2b;
    --color2-contrast: #fff;

    --color3: #4c0099;
    --color3-light: #b39ddb;
    --color3-shade: #311b92;
    --color3-contrast: #fff;

    --font-serif: 'Merriweather', serif;
    --font-sans-serif: 'Open Sans', sans-serif;
  }
  body.dark {
    --color1: rgb(30 30 30);
    --color1-light: #4c475d;
    --color1-shade: #303030;
    --color1-contrast: #fff;

    --color2: #1e1e1e;
    --color2-light: #3c3c3c;
    --color2-shade: #2b2b2b;
    --color2-contrast: #fff;

    --color3: rgb(110 169 255);
    --color3-light: #b39ddb;
    --color3-shade: #1565c0;
    --color3-contrast: #fff;

    pre:not([data-theme='dark']),
    code:not([data-theme='dark']) {
      display: none;
    }
  }
  body.light {
    --color1: #fafafa;
    --color1-light: #EEF1F4;
    --color1-shade: #fafafa;
    --color1-contrast: #292929;

    --color2: #fff;
    --color2-light: #eee;
    --color2-shade: #eee;
    --color2-contrast: #1b1b1b;

    --color3: #1565c0;
    --color3-light: #1976d2;
    --color3-shade: #0d47a1;
    --color3-contrast: #fff;

    pre:not([data-theme='light']),
    code:not([data-theme='light']) {
      display: none;
    }
  }
`;
export default ThemeStyles;
