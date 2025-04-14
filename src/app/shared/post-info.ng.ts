import { Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { faCalendar, faClock } from '@ng-icons/font-awesome/regular';
import { faSolidMusic, faSolidTags } from '@ng-icons/font-awesome/solid';
import { FrontMatter } from '@utils/frontmatter';
import { format, formatISO } from 'date-fns';
import { ptBR } from 'date-fns/locale/pt-BR';

type Info = Pick<FrontMatter, 'createAt' | 'timeToRead' | 'music' | 'tags'>;

@Component({
  selector: 'post-info',
  standalone: true,
  imports: [NgIcon, RouterLink],
  providers: [
    provideIcons({
      faCalendar,
      faClock,
      faSolidMusic,
      faSolidTags,
    }),
  ],
  template: `
    <div class="post-date">
      <ng-icon name="faCalendar" />
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
        <a [class]="tag" [routerLink]="['/blog/tag/', tag]">{{ tag }}</a>
      }
    </div>
  `,
  styles: [`
    :host {
      display: flex;
      flex-direction: column;
      gap: 9px;
      --ng-icon__size: calc(var(--post-info__font-size, 1rem) + 0.1rem);
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
      .post-date-short {
        display: none;
      }
      .post-date-long {
        display: block;
      }
      @media (max-width: 425px) {
        .post-date-long {
          display: none;
        }
        .post-date-short {
          display: block;
        }
      }
    }
    .post-music {
      a {
        color: var(--color3-light);
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
      @media (max-width: 425px) {
        & > span {
          display: none;
        }
      }
    }
    .post-tags {
      --tag-color: hsl(0, 100%, 70%);
      a {
        font-family: var(--font-serif);
        text-transform: capitalize;
        font-weight: 800;
        font-size: calc(var(--post-info__font-size, 1rem) - 0.1rem);
        border-width: 1px;
        border-style: solid;
        border-color: var(--tag-color);
        color: var(--tag-color);
        border-radius: 80px;
        padding: 0.3rem 1rem;
        background-color: hsl(from var(--tag-color) h s 95%);
        @media (prefers-color-scheme: dark) {
          background-color: hsl(from var(--tag-color) h s 15%);
        }
        &:hover, &:focus {
          border-color: var(--tag-color);
          background-color: var(--tag-color);
          color: light-dark(white, black);
        }
      }
      .angular {
        --tag-color: hsl(348, 100%, 61%);
      }
      .nodejs {
        --tag-color: hsl(128, 100%, 30%);
        @media (prefers-color-scheme: dark) {
          --tag-color: hsl(128, 100%, 40%);
        }
      }
      .typescript {
        --tag-color: hsl(204, 86%, 53%);
      }
      .jekyll {
        --tag-color: hsl(48, 40%, 45%);
        @media (prefers-color-scheme: dark) {
          --tag-color: hsl(48, 100%, 50%);
        }
      }
      .php {
        --tag-color:hsl(230, 30%, 65%);
        text-transform: uppercase;
      }
    }
  `],
})
export default class PostInfo {

  info = input.required<Info>();

  formattedDateISO = computed(() => formatISO(this.info().createAt));
  formattedDateShort = computed(() => format(this.info().createAt, `d 'de' MMMM 'de' yyyy`, { locale: ptBR }));
  formattedDateLong = computed(() => {
    const dayOfWeek = format(this.info().createAt, 'EEEE', { locale: ptBR });
    const prefix = ['sábado', 'domingo'].includes(dayOfWeek) ? 'no' : 'na';
    return format(this.info().createAt, `'Postado ${prefix}' EEEE, d 'de' MMMM 'de' yyyy`, { locale: ptBR });
  });
  formattedReadTime = computed(() => {
    const { minutes } = this.info().timeToRead;
    return `Leia em ${minutes} minuto${minutes > 1 ? 's' : ''}`;
  });
  formattedTags = computed(() => this.info().tags?.join(', '));
  music = computed(() => this.info().music ?? { title: '', url: '' });
  tags = computed(() => this.info().tags ?? []);
}
