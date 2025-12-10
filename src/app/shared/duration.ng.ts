import { Component, computed, input } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { matCalendarMonth } from '@ng-icons/material-icons/baseline';
import { formatDuration, intervalToDuration } from 'date-fns';
import { ptBR } from 'date-fns/locale/pt-BR';
import { capitalize } from 'lodash-es';

const formatData = (data: string | Date, type: 'full' | 'short') => {
  const dateFormat = new Intl.DateTimeFormat('pt-BR', {
    month: type === 'full' ? 'long' : '2-digit',
    year: 'numeric',
    timeZone: 'UTC',
  });
  if (typeof data === 'string') {
    data = new Date(data);
  }
  if (isNaN(data.getTime())) {
    return 'Data inválida';
  }
  return capitalize(dateFormat.format(data));
};

const durationFormat = ({ init, end }: { init: string | Date; end: string | Date }) => {
  const duration = intervalToDuration({
    start: init instanceof Date ? init : new Date(init),
    end: end instanceof Date ? end : new Date(end),
  });
  return formatDuration(duration, {
    format: ['years', 'months'],
    locale: ptBR,
  });
};

@Component({
  selector: 'duration',
  imports: [NgIcon],
  template: `
    <p class="full-date">
      <ng-icon name="matCalendarMonth" size="20" />
      <time [dateTime]="init()">
        {{ fullInit() }}
      </time>
      -
      <time [dateTime]="end()">
        {{ fullEnd() }}
      </time>
      •
      <span>{{ fullTimeElapsed() }}</span>
    </p>
    <p class="short-date">
      <ng-icon name="matCalendarMonth" size="20" />
      <time [dateTime]="init()">
        {{ shortInit() }}
      </time>
      -
      <time [dateTime]="end()">
        {{ shortEnd() }}
      </time>
    </p>
  `,
  providers: [
    provideIcons({
      matCalendarMonth,
    }),
  ],
  styles: [
    `
      :host {
        display: block;
        color: var(--text-color);
        font-family: var(--font-sans);
        margin: 0px;
        container-type: inline-size;
        width: 100%;
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

        @container (width < 525px) {
          p.full-date {
            display: none;
          }
          p.short-date {
            display: flex;
          }
        }

        @container (width >= 525px) {
          p.full-date {
            display: flex;
          }
          p.short-date {
            display: none;
          }
        }
      }
    `,
  ],
})
export default class DurationComponent {
  init = input.required<string>();
  end = input<string>();

  fullInit = computed(() => {
    const init = this.init();
    return formatData(init, 'full');
  });

  fullEnd = computed(() => {
    const endDate = this.end();
    return endDate ? formatData(endDate, 'full') : 'Até o momento';
  });
  fullTimeElapsed = computed(() => {
    const init = this.init();
    const end = this.end() ?? new Date();
    return durationFormat({ init, end });
  });

  shortInit = computed(() => {
    const init = this.init();
    return formatData(init, 'short');
  });
  shortEnd = computed(() => {
    const end = this.end();
    return end ? formatData(end, 'short') : 'Atualmente';
  });
}
