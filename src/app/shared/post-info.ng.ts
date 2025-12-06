import { Component, computed, input } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { faClock } from '@ng-icons/font-awesome/regular';
import { faSolidMusic, faSolidTags } from '@ng-icons/font-awesome/solid';
import { matCalendarMonth } from '@ng-icons/material-icons/baseline';
import TagComponent from '@shared/tag.ng';
import { FrontMatter } from '@utils/frontmatter.signal';
import { format, formatISO, parse } from 'date-fns';
import { ptBR } from 'date-fns/locale/pt-BR';

type Info = Pick<FrontMatter, 'createAt' | 'timeToRead' | 'music' | 'tags'>;

@Component({
  selector: 'post-info',
  standalone: true,
  imports: [NgIcon, TagComponent],
  providers: [
    provideIcons({
      matCalendarMonth,
      faClock,
      faSolidMusic,
      faSolidTags,
    }),
  ],
  template: `
    <div class="post-date">
      <ng-icon name="matCalendarMonth" />
      <time [attr.datetime]="formattedDateISO()" class="post-date-long">{{ formattedDateLong() }}</time>
      <time [attr.datetime]="formattedDateISO()" class="post-date-short">{{ formattedDateShort() }}</time>
    </div>
    <div class="post-read-time">
      <ng-icon name="faClock" />
      <span>{{ formattedReadTime() }}</span>
    </div>
    <div class="post-music">
      <ng-icon name="faSolidMusic" />
      <span>Ouvindo </span>
      <a [href]="music().url" rel="noopener noreferrer" target="_blank">
        <span>{{ music().title }}</span>
      </a>
    </div>
    <div class="post-tags">
      <ng-icon name="faSolidTags" />
      @for (tag of tags(); track tag) {
      <tag [tag]="tag" />
      }
    </div>
  `,
  styles: [
    `
      :host {
        display: flex;
        flex-direction: column;
        width: 100%;
        gap: 9px;
        --ng-icon__size: calc(var(--post-info__font-size, 1rem) + 0.1rem);
        color: var(--text-color);
        div {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: flex-start;
          gap: 12px;
          ng-icon {
            flex: 0 0 var(--ng-icon__size);
            vertical-align: text-top;
          }
          * {
            font-size: var(--post-info__font-size, 1rem);
            font-family: var(--font-serif);
          }
        }
      }
      .post-date {
        container-type: inline-size;
        .post-date-short {
          display: none;
        }
        .post-date-long {
          display: block;
        }
        @container (width < 425px) {
          .post-date-long {
            display: none;
          }
          .post-date-short {
            display: block;
          }
        }
      }
      .post-music {
        container-type: inline-size;
        a {
          color: var(--primary-color);
          transition: color 0.5s;
          line-height: 1.2;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
          &:hover {
            text-decoration: underline dashed;
            text-decoration-thickness: 0.1rem;
            text-underline-offset: 0.2rem;
          }
        }
        @container (width < 425px) {
          & > span {
            display: none;
          }
        }
      }
      .post-tags {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        line-height: 1.7rem;
      }
    `,
  ],
})
export default class PostInfo {
  info = input.required<Info>();
  parsedDate = computed(() => parse(this.info().createAt, 'yyyy-MM-dd HH:mm:ss XXX', new Date()));
  formattedDateISO = computed(() => formatISO(this.parsedDate()));
  formattedDateShort = computed(() => format(this.parsedDate(), `d 'de' MMMM 'de' yyyy`, { locale: ptBR }));
  formattedDateLong = computed(() => {
    const dayOfWeek = format(this.parsedDate(), 'EEEE', { locale: ptBR });
    const prefix = ['sábado', 'domingo'].includes(dayOfWeek) ? 'no' : 'na';
    return format(this.parsedDate(), `'Postado ${prefix}' EEEE, d 'de' MMMM 'de' yyyy`, { locale: ptBR });
  });
  formattedReadTime = computed(() => {
    const { minutes } = this.info().timeToRead;
    return `Leia em ${minutes} minuto${minutes > 1 ? 's' : ''}`;
  });
  formattedTags = computed(() => this.info().tags?.join(', '));
  music = computed(() => this.info().music ?? { title: '', url: '' });
  tags = computed(() => this.info().tags ?? []);
}
