import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'tag',
  imports: [RouterLink],
  template: `
    @let tagValue = tag();
    <a [class]="tagValue" [routerLink]="['/blog/tags/', tagValue]">{{ tagValue }}</a>
  `,
  styles: `
    :host {
      --tag-color: var(--primary-color);
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
        padding: 0.2rem 1rem;
        background-color: color-mix(in srgb, var(--tag-color), var(--background-color) 85%);

        &:hover,
        &:focus {
          border-color: var(--tag-color);
          background-color: var(--tag-color);
          color: light-dark(white, black);
        }
      }
    }
    .angular {
      --tag-color: hsl(348, 100%, 61%);
    }
    .nodejs {
      --tag-color: hsl(128, 100%, 30%);
    }
    .react {
      --tag-color: hsl(190, 45%, 50%);
    }
    .typescript {
      --tag-color: hsl(204, 86%, 53%);
    }
    .jekyll {
      --tag-color: hsl(40, 70%, 40.00%);
    }
    .php {
      --tag-color: hsl(230, 30%, 65%);
      text-transform: uppercase;
    }
    @scope (html[data-theme="default-dark"]) {
      .jekyll {
        --tag-color: hsl(48, 100%, 50%);
      }
      .nodejs {
        --tag-color: hsl(128, 100%, 40%);
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TagComponent {
  tag = input.required<string>();
}
