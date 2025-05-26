import { Component, computed, input } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { matCalendarMonth } from '@ng-icons/material-icons/baseline';
import { formatDistance, intlFormat } from 'date-fns';
import { ptBR } from 'date-fns/locale/pt-BR';
import _ from 'lodash';

const formatData = (data: string) =>
  _.capitalize(
    intlFormat(new Date(data), {
      month: 'long',
      year: 'numeric',
      timeZone: 'UTC',
    })
  );

@Component({
  selector: 'duration',
  imports: [NgIcon],
  template: `
    <p>
      <ng-icon name="matCalendarMonth" size="20" />
      <time [dateTime]="init()">
        {{ formattedInit() }}
      </time>
      -
      <time [dateTime]="end()">
        {{ formattedEnd() }}
      </time>
      •
      <span>{{ timeElapsed() }}</span>
    </p>
  `,
  providers: [
    provideIcons({
      matCalendarMonth,
    }),
  ],
  styles: [
    `
      p {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        gap: 10px;

        line-height: 1;
        font-weight: 200;
        font-size: 1.1rem;
        margin: 0px;
      }
    `,
  ],
})
export default class DurationComponent {
  init = input.required<string>();
  end = input<string>();

  formattedInit = computed(() => formatData(this.init()));
  formattedEnd = computed(() => {
    const endDate = this.end();
    return endDate ? formatData(endDate) : 'Até o momento';
  });
  timeElapsed = computed(() => {
    const init = this.init();
    const end = this.end() ?? new Date();
    return formatDistance(init, end, {
      locale: ptBR,
    });
  });
}
