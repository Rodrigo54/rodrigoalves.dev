
import { Component, inject, linkedSignal, DOCUMENT } from '@angular/core';
import { RouterLink } from '@angular/router';
import { boxHomeSolid } from '@ng-icons/boxicons/solid';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { iconoirArrowUp, iconoirCell2x2, iconoirPalette, iconoirTableRows } from '@ng-icons/iconoir';
import { localStorageSignal } from '@utils/local-storage.signal';

@Component({
  selector: 'menubar',
  template: `
    <div class="top-icons">
      <ng-icon name="boxHomeSolid" [routerLink]="['/blog']" />
    </div>
    <div class="bottom-icons">
      <ng-icon (click)="toTop()" name="iconoirPalette" />
      <ng-icon [name]="gridIcon()" (click)="toggleGrid()" />
      <ng-icon (click)="toTop()" name="iconoirArrowUp" />
    </div>
  `,
  styles: [`
    :host {
      --ng-icon__size: 2rem;
      color: var(--color1-contrast);
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
    }
    .top-icons, .bottom-icons {
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
        color: var(--color3-light);
      }
    }
  `],
  imports: [NgIcon, RouterLink],
  viewProviders: [provideIcons({
    boxHomeSolid,
    iconoirArrowUp,
    iconoirCell2x2,
    iconoirTableRows,
    iconoirPalette,
  })],
})
export default class Menubar {
  document = inject(DOCUMENT);
  gridType = localStorageSignal<'cell' | 'row'>('cell', 'grid');
  gridIcon = linkedSignal(() => this.gridType() === 'row' ? 'iconoirTableRows' : 'iconoirCell2x2');

  toTop() {
    this.document.getElementById('content')?.scroll({ top: 0, behavior: 'smooth' });
  }

  toggleGrid() {
    this.gridType.update(icon => icon === 'row' ? 'cell' : 'row');
  }
}
