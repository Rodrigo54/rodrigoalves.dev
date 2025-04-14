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
      @if (showPrev()) {
        <a [routerLink]="['.']" [queryParams]="{ page: previousPage() }">
          <ng-icon name="matArrowBackIosOutline" />
          <span>Página Anterior</span>
        </a>
      }
    </div>
    <div class="pagination-info" >
      <p>Página {{ page() }} de {{ total() }}</p>
    </div>
    <div class="pagination-next">
      @if (showNext()) {
        <a [routerLink]="['.']" [queryParams]="{ page: nextPage() }">
          <span>Próxima Página</span>
          <ng-icon name="matArrowForwardIosOutline" />
        </a>
      }
    </div>
  `,
  styles: [`
    :host {
      border-top: 1px solid var(--color1-light);
      margin-top: auto;
      padding: 1.5rem 3rem;
      color: var(--color2-contrast);
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      grid-template-rows: 1fr;
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
      .pagination-next{
        justify-self: end;
      }
      .pagination-prev{
        justify-self: start;
      }
      .pagination-info {
        justify-self: center;
        text-align: center;
        p {
          margin: 0px;
          font-size: 1rem;
        }
      }
      @media (max-width: 1170px) {
        padding: 1rem 2rem;
        font-size: 0.8rem;
        a {
          span {
            display: none;
            visibility: hidden;
          }
        }
      }
    }
  `]
})
export class Pagination {
  page = input(1);
  total = input.required<number>();

  showPrev = computed(() => {
    const isFirst = this.page() === 1;
    return !isFirst && this.total() > 1;
  });

  showNext = computed(() => {
    const isLast = this.page() === this.total();
    return !isLast && this.total() > 1;
  });

  nextPage = computed(() => this.page() + 1);
  previousPage = computed(() => this.page() - 1);
}
