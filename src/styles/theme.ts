import { createGlobalStyle } from 'styled-components';

const ThemeStyles = createGlobalStyle`
  :root {
    --color1: #292435;
    --color1-light: #4c475d;
    --color1-shade: #26232d;
    --color1-contrast: #fff;

    --color2: #35373a;
    --color2-light: #4a545a;
    --color2-shade: #2b2b2b;
    --color2-contrast: #fff;

    --color3: #1985A1;
    --color3-light: #2fd4ff;
    --color3-shade: #105567;
    --color3-contrast: #fff;

    --font-serif: 'Merriweather', serif;
    --font-sans-serif: 'Open Sans', sans-serif;
  }
  body.dark {
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
  }
`;
export default ThemeStyles;
