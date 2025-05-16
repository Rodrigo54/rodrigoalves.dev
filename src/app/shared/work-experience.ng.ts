import { Component, signal } from '@angular/core';
import { Works } from '@app/data/works';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  matCalendarMonth,
  matMapsHomeWork,
} from '@ng-icons/material-icons/baseline';
import { matWorkOutline } from '@ng-icons/material-icons/outline';
import { format, formatDistance } from 'date-fns';
import { ptBR } from 'date-fns/locale/pt-BR';
import { capitalize } from 'lodash';

const formatData = (data: string) =>
  capitalize(format(data, `MMMM 'de' yyyy`, { locale: ptBR }));

@Component({
  selector: 'work-experience',
  imports: [NgIcon],
  template: `
    <div>
      <h2>Experiências Profissionais</h2>
      @for (work of works(); track $index) {
      <div class="work-item">
        <div class="info-wrap">
          <h3>
            <ng-icon name="matWorkOutline" size="20" />
            {{ work.position }}
          </h3>
          <p>
            <ng-icon name="matMapsHomeWork" size="20" />
            {{ work.locale }}
          </p>
          <p>
            <ng-icon name="matCalendarMonth" size="20" />
            <time [dateTime]="work.duration.init">
              {{ work.duration.formatedInit }}
            </time>
            -
            <time [dateTime]="work.duration.end">
              {{ work.duration.formatedEnd }}
            </time>
            •
            <span>{{ work.duration.timeElapsed }}</span>
          </p>
        </div>
        <blockquote>{{ work.description }}</blockquote>
      </div>
      }
    </div>
  `,
  styles: [
    `
      .work-item {
        display: flex;
        flex-flow: column nowrap;
        margin-bottom: 15px;
        .info-wrap {
          display: flex;
          flex-flow: column nowrap;
          gap: 10px;
          padding: 0px 0px 0px 20px;
        }
        h3 {
          display: flex;
          flex-flow: row nowrap;
          align-items: center;
          gap: 10px;

          font-family: var(--font-serif);
          color: var(--color2-contrast);
          line-height: 1;
          font-weight: 500;
          font-size: 1.2rem;
        }
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
        blockquote {
          border-left: 0.3rem solid var(--color3-light);
          padding: 0px 15px;
          margin: 30px 27px;

          font-family: var(--font-sans-serif);
          line-height: 1.5;
          font-weight: 200;
          font-size: 1rem;
          font-style: italic;
          letter-spacing: 1px;
        }
      }
    `,
  ],
  providers: [
    provideIcons({
      matWorkOutline,
      matMapsHomeWork,
      matCalendarMonth,
    }),
  ],
})
export class WorkExperience {
  works = signal(
    Works.toSorted((a, b) =>
      b.duration.init.localeCompare(a.duration.init)
    ).map((work) => {
      const init = work.duration.init;
      const end = work.duration.end;
      const formatedInit = formatData(init);
      const formatedEnd = end ? formatData(end) : 'Até o momento';
      const timeElapsed = formatDistance(init, end ?? new Date(), {
        locale: ptBR,
      });
      return {
        ...work,
        duration: {
          init,
          end,
          formatedInit,
          formatedEnd,
          timeElapsed,
        },
      };
    })
  );
}
