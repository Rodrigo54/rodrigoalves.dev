import { Component, signal } from '@angular/core';
import { Courses, Formation } from '@app/data/formation';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { faSolidBuildingColumns, faSolidGraduationCap, faSolidUserGraduate } from '@ng-icons/font-awesome/solid';
import { matOndemandVideo } from '@ng-icons/material-icons/baseline';
import DurationComponent from '@shared/duration.ng';

@Component({
  selector: 'formation',
  imports: [NgIcon, DurationComponent],
  template: `
    <div>
      <h2>Formação Acadêmica</h2>
      <div class="formation-item">
        @for (formation of formations(); track $index) {
        <div class="info-wrap">
          <h3>
            <ng-icon name="faSolidUserGraduate" size="20" />
            <span>{{ formation.name }}</span>
          </h3>
          <p>
            <ng-icon name="faSolidBuildingColumns" size="20" />
            <span>{{ formation.locale }}</span>
          </p>
          <duration [init]="formation.duration.init" [end]="formation.duration.end" />
          <blockquote>{{ formation.description }}</blockquote>
        </div>
        }
      </div>
    </div>
    <div>
      <h2>Cursos</h2>
      <div class="formation-item">
        @for (course of courses(); track $index) {
        <a class="info-wrap" [href]="course.link" [title]="course.name" target="_blank" rel="noopener noreferrer">
          <h3>
            @if (course.online) {
            <ng-icon name="matOndemandVideo" size="20" />
            } @else {
            <ng-icon name="faSolidGraduationCap" size="20" />
            }
            {{ course.name }}
          </h3>
          <p>{{ course.locale }} - Ano: {{ course.year }}</p>
          <p>
            {{ numberFormat(course.duration) }}
            {{ course.online ? '( Online )' : '( Presencial )' }}
          </p>
        </a>
        }
      </div>
    </div>
  `,
  styles: [
    `
      .formation-item {
        display: flex;
        flex-flow: column nowrap;
        color: var(--text-color);
        gap: 30px;
        :last-child {
          margin-bottom: 0px;
        }
        a {
          color: var(--text-color);
          text-decoration: none;
          &:hover {
            color: var(--primary-color);
          }
        }
        .info-wrap {
          display: flex;
          flex-flow: column nowrap;
          gap: 10px;
          padding: 0px 0px 0px 20px;
          @media (max-width: 768px) {
            padding: 0px;
          }
        }
        h3 {
          display: flex;
          flex-flow: row nowrap;
          align-items: center;
          gap: 10px;
          font-family: var(--font-serif);
          color: currentColor;
          line-height: 1.2;
          font-weight: 500;
          font-size: 1.2rem;
          span {
            text-overflow: ellipsis;
            overflow: hidden;
          }
          @media (max-width: 768px) {
            font-size: 1rem;
            span {
              font-size: 1rem;
            }
          }
        }
        & p {
          display: flex;
          flex-flow: row nowrap;
          align-items: center;
          gap: 10px;
          color: currentColor;

          line-height: 1.2;
          font-weight: 200;
          font-size: 1rem;
          margin: 0px;
        }
        blockquote {
          border-left: 0.3rem solid var(--primary-color);
          padding: 0px 15px;
          margin: 15px 27px 15px 7px;

          font-family: var(--font-sans);
          line-height: 1.5;
          font-weight: 200;
          font-size: 1rem;
          font-style: italic;
          letter-spacing: 1px;
          @media (max-width: 768px) {
            margin: 15px 7px;
          }
        }
      }
      ng-icon {
        min-width: 20px;
        min-height: 20px;
      }
    `,
  ],
  providers: [
    provideIcons({
      faSolidUserGraduate,
      faSolidBuildingColumns,
      faSolidGraduationCap,
      matOndemandVideo,
    }),
  ],
})
export default class FormationComponent {
  formations = signal(Formation.toSorted((a, b) => b.duration.init.localeCompare(a.duration.init)));

  courses = signal(Courses.toSorted((a, b) => b.year.localeCompare(a.year)));

  numberFormat(number: number) {
    const stringNumber = Intl.NumberFormat('pt-BR').format(number);
    return `${stringNumber} Horas/Aulas`;
  }
}
