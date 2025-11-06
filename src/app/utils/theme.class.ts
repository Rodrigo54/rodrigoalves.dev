import chroma from 'chroma-js';

const themeColorsKeys = ['primary-color', 'background-color', 'paper-color'] as const;
export type ThemeColorsKey = (typeof themeColorsKeys)[number];
// Represents a key color contrast key (e.g., 'primary-contrast').
type ThemeColorsKeyContrast = `${ThemeColorsKey}-contrast`;
type PaletteObject = Record<ThemeColorsKey, string> & Record<ThemeColorsKeyContrast, string>;

export class Theme {
  public themeName: string = 'default-dark';
  public fontSerif: string = '"Merriweather", serif';
  public fontSans: string = '"Open Sans", sans-serif';
  public fontMono: string = '"Fira Code", monospace';
  public fontSize: string = '16px';
  public palette: PaletteObject = {
    'primary-color': '#6ea9ff',
    'background-color': '#303030',
    'paper-color': '#1e1e1e',
    'primary-color-contrast': this.createContrast('#6ea9ff'),
    'background-color-contrast': this.createContrast('#303030'),
    'paper-color-contrast': this.createContrast('#1e1e1e'),
  };

  public get isDark() {
    const chromaColor = chroma(this.palette['background-color']);
    return chroma.contrast(chromaColor, 'white') > 4.5;
  }

  public get isLight() {
    const chromaColor = chroma(this.palette['background-color']);
    return chroma.contrast(chromaColor, 'black') > 4.5;
  }

  public get extendedVariables() {
    return {
      'text-color': 'var(--paper-color-contrast)',
      'text-color-contrast': 'var(--paper-color)',
      'text-color-tint': this.createTint('text-color'),
      'text-color-shade': this.createShade('text-color'),
      'text-color-alt': this.createAlt('text-color'),
      'primary-color-tint': this.createTint('primary-color'),
      'primary-color-shade': this.createShade('primary-color'),
      'primary-color-alt': this.createAlt('primary-color'),
      'background-color-tint': this.createTint('background-color'),
      'background-color-shade': this.createShade('background-color'),
      'background-color-alt': this.createAlt('background-color'),
      'paper-color-tint': this.createTint('paper-color'),
      'paper-color-shade': this.createShade('paper-color'),
      'paper-color-alt': this.createAlt('paper-color'),
      'border-color': 'var(--background-color-alt)',
      'font-serif': this.fontSerif,
      'font-sans': this.fontSans,
      'font-size': this.fontSize,
    };
  }

  constructor(
    data: Partial<{
      themeName: string;
      primary: string;
      background: string;
      paper: string;
      fontSerif: string;
      fontSans: string;
      fontMono: string;
      fontSize: string;
    }> = {},
  ) {
    if (data) {
      this.themeName = data.themeName ?? this.themeName;
      this.fontSerif = data.fontSerif ?? this.fontSerif;
      this.fontSans = data.fontSans ?? this.fontSans;
      this.fontMono = data.fontMono ?? this.fontMono;
      this.fontSize = data.fontSize ?? this.fontSize;
      this.palette = {
        'primary-color': data.primary ?? this.palette['primary-color'],
        'background-color': data.background ?? this.palette['background-color'],
        'paper-color': data.paper ?? this.palette['paper-color'],
        'primary-color-contrast': this.createContrast(data.primary ?? this.palette['primary-color']),
        'background-color-contrast': this.createContrast(data.background ?? this.palette['background-color']),
        'paper-color-contrast': this.createContrast(data.paper ?? this.palette['paper-color']),
      };
    }
  }

  createContrast(hex: string) {
    const chromaColor = chroma(hex);
    const whiteColor = chroma('white');
    const blackColor = chroma('black');
    return chroma.contrast(chromaColor, 'white') > 4.5 ? whiteColor.hex() : blackColor.hex();
  }

  createTint(key: ThemeColorsKey | 'text-color') {
    // Tint: cor mais forte (mais próxima do contraste)
    return `color-mix(in srgb, var(--${key}-contrast) 60%, var(--${key}) 40%)`;
  }

  createShade(key: ThemeColorsKey | 'text-color') {
    // Shade: cor mais suave (mais próxima da cor base)
    return `color-mix(in srgb, var(--${key}-contrast) 10%, var(--${key}) 90%)`;
  }

  createAlt(key: ThemeColorsKey | 'text-color') {
    // Alt: cor com 25% de contraste
    return `color-mix(in srgb, var(--${key}-contrast) 25%, var(--${key}) 75%)`;
  }

  public createCssVariables() {
    const palette = Object.entries(this.palette).reduce((cssVariables, [key, value]) => {
      cssVariables += `--${key}: ${value};\n`;
      return cssVariables;
    }, '');
    const extendedVariables = Object.entries(this.extendedVariables).reduce((cssVariables, [key, value]) => {
      cssVariables += `--${key}: ${value};\n`;
      return cssVariables;
    }, '');
    return palette + extendedVariables;
  }
}

const themesNames = ['default-dark', 'default-light'] as const;
export type ThemeName = (typeof themesNames)[number];

const ThemesMap = new Map<ThemeName, Theme>([
  [
    'default-dark',
    new Theme({
      themeName: 'default-dark',
      primary: 'oklch(70.7% 0.165 254.624)',
      background: 'oklch(14.7% 0.004 49.25)',
      paper: 'oklch(20.5% 0 0)',
    }),
  ],
  [
    'default-light',
    new Theme({
      themeName: 'default-light',
      primary: 'oklch(59.6% 0.145 163.225)',
      background: 'oklch(92.3% 0.003 48.717)',
      paper: 'oklch(98.5% 0 0)',
    }),
  ],
]);

export function getTheme(themeName: ThemeName): Theme {
  if (!ThemesMap.has(themeName)) {
    throw new Error(`Theme "${themeName}" not found.`);
  }
  return ThemesMap.get(themeName)!;
}
