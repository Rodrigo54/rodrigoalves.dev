import { Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { matArrowBackIosOutline, matArrowForwardIosOutline } from '@ng-icons/material-icons/outline';

@Component({
  selector: 'pagination',
    imports: [NgIcon, RouterLink],
    providers: [
      provideIcons({
        matArrowBackIosOutline,
        matArrowForwardIosOutline
      }),
    ],
  template: `
    <div class="pagination-prev">
      @if (!isFirst()) {
        <a [routerLink]="['/blog/page', previousPage()]">
          <ng-icon name="matArrowBackIosOutline" />
          <span>Página Anterior</span>
        </a>
      }
    </div>
    <div class="pagination-info" >
      <p>Página {{ page() }} de {{ total() }}</p>
    </div>
    <div class="pagination-next">
      @if (!isLast()) {
        <a [routerLink]="['/blog/page', nextPage()]">
          <span>Próxima Página</span>
          <ng-icon name="matArrowForwardIosOutline" />
        </a>
      }
    </div>
  `,
  styles: [`
    :host {
      align-items: center;
      border-top: 1px solid var(--color1-light);
      color: var(--color2-contrast);
      display: flex;
      padding: 1.5rem 3rem;
      margin-top: auto;
      justify-content: space-between;
      a {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        color: var(--color2-contrast);
        text-decoration: none;
        transition: color 0.5s;
        &:hover {
          color: var(--color3-light);
        }
        span {
          margin: 0px 10px;
        }
      }
    }
  `]
})
export class Pagination {
  page = input(1);
  total = input.required<number>();

  isFirst = computed(() => this.page() === 1);
  isLast = computed(() => this.page() === this.total());

  nextPage = computed(() => this.page() + 1);
  previousPage = computed(() => this.page() - 1);
}
