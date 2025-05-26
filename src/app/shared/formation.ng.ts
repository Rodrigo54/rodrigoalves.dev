import { Component, signal } from '@angular/core';
import { Formation } from '@app/data/formation';
import DurationComponent from '@app/shared/duration.ng';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  faSolidBuildingColumns,
  faSolidUserGraduate,
} from '@ng-icons/font-awesome/solid';

@Component({
  selector: 'formation',
  imports: [NgIcon, DurationComponent],
  template: `
    <div>
      <h2>Formação Acadêmica</h2>
      @for (formation of formations(); track $index) {

      <div class="formation-item">
        <div class="info-wrap">
          <h3>
            <ng-icon name="faSolidUserGraduate" size="20" />
            {{ formation.name }}
          </h3>
          <p>
            <ng-icon name="faSolidBuildingColumns" size="20" />
            {{ formation.locale }}
          </p>
          <duration
            [init]="formation.duration.init"
            [end]="formation.duration.end"
          />
        </div>
        <blockquote>{{ formation.description }}</blockquote>
      </div>
      }
    </div>
  `,
  styles: [
    `
      .formation-item {
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
      faSolidUserGraduate,
      faSolidBuildingColumns,
    }),
  ],
})
export default class FormationComponent {
  formations = signal(
    Formation.toSorted((a, b) => b.duration.init.localeCompare(a.duration.init))
  );
}
