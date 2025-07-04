import { Component, computed, DOCUMENT, effect, inject, linkedSignal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { boxHomeSolid } from '@ng-icons/boxicons/solid';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { iconoirArrowUp, iconoirCell2x2, iconoirTableRows } from '@ng-icons/iconoir';
import { matDarkModeOutline, matLightModeOutline } from '@ng-icons/material-icons/outline';
import { getTheme } from '@utils/theme.class';
import { injectLocalStorage } from 'ngxtension/inject-local-storage';

@Component({
  selector: 'menubar',
  template: `
    <div class="top-icons">
      <ng-icon name="boxHomeSolid" [routerLink]="['/blog']" aria-hidden="false" aria-label="Go to blog" />
    </div>
    <div class="bottom-icons">
      <ng-icon (click)="toggleTheme()" [name]="themeIcon()" aria-label="Toggle theme" />
      <ng-icon class="grid-icon" [name]="gridIcon()" (click)="toggleGrid()" aria-label="Toggle grid" />
      <ng-icon (click)="toTop()" name="iconoirArrowUp" aria-label="Scroll to top" />
    </div>
  `,
  styles: [
    `
      :host {
        --ng-icon__size: 2rem;
        color: var(--text-color);
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: 2rem 1fr auto;
        grid-template-areas: 'top-icons' '.' 'bottom-icons';
        height: 100%;
        padding: 2rem 0.8rem;
        @media (max-width: 1170px) {
          --ng-icon__size: 1.6rem;
          grid-template-columns: 2rem 1fr auto;
          grid-template-rows: 1fr;
          grid-template-areas: 'top-icons . bottom-icons';
          padding: 0.8rem 1rem;
        }
        @media (max-width: 768px) {
          .grid-icon {
            display: none;
          }
        }
      }
      .top-icons,
      .bottom-icons {
        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        align-items: center;
        gap: 2rem;
        @media (max-width: 1170px) {
          flex-flow: row nowrap;
          gap: 2rem;
        }
      }
      .top-icons {
        grid-area: top-icons;
      }
      .bottom-icons {
        grid-area: bottom-icons;
      }
      ng-icon {
        cursor: pointer;
        transition: color 0.5s;
        &:hover {
          color: var(--primary-color);
        }
      }
    `,
  ],
  imports: [NgIcon, RouterLink],
  viewProviders: [
    provideIcons({
      boxHomeSolid,
      iconoirArrowUp,
      iconoirCell2x2,
      iconoirTableRows,
      matDarkModeOutline,
      matLightModeOutline,
    }),
  ],
})
export default class Menubar {
  document = inject(DOCUMENT);
  gridType = injectLocalStorage<'cell' | 'row'>('grid', { defaultValue: 'row' });
  theme = injectLocalStorage<'light' | 'dark'>('theme', { defaultValue: 'dark' });
  themeIcon = linkedSignal(() => (this.theme() === 'dark' ? 'matDarkModeOutline' : 'matLightModeOutline'));
  gridIcon = linkedSignal(() => (this.gridType() === 'row' ? 'iconoirCell2x2' : 'iconoirTableRows'));

  themeObject = computed(() => {
    const theme = this.theme();
    return theme === 'dark' ? getTheme('default-dark') : getTheme('default-light');
  });

  #themeRef = effect(() => {
    const themeObject = this.themeObject();
    this.document.documentElement.setAttribute('data-theme', themeObject.themeName);
    const styleThemeTag = this.document.createElement('style');
    styleThemeTag.setAttribute('id', 'currentTheme');
    const themeStyle = `body { ${themeObject.createCssVariables()} }`;
    styleThemeTag.innerHTML = themeStyle;
    const existingThemeTag = this.document.getElementById('currentTheme');
    if (existingThemeTag) {
      existingThemeTag.replaceWith(styleThemeTag);
    } else {
      this.document.head.appendChild(styleThemeTag);
    }
  });

  toTop() {
    this.document.getElementById('content')?.scroll({ top: 0, behavior: 'smooth' });
  }

  toggleGrid() {
    this.gridType.update((icon) => (icon === 'row' ? 'cell' : 'row'));
  }

  toggleTheme() {
    this.theme.update((theme) => (theme === 'dark' ? 'light' : 'dark'));
    this.document.documentElement.setAttribute('data-theme', this.theme());
  }
}
