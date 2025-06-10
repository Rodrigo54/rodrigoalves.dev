import { afterNextRender, ChangeDetectionStrategy, Component, DOCUMENT, effect, inject } from '@angular/core';
import { injectLocalStorage } from 'ngxtension/inject-local-storage';

@Component({
  selector: 'comments',
  imports: [],
  template: `
    <h2>Comentários</h2>
    <div id="comments" class="giscus"></div>
  `,
  styles: `
    :host {
      display: block;
      max-width: 1200px;
      width: 90%;
      margin: 30px auto;
    }
    h2 {
      margin: 2rem auto 1rem;
      font-size: 1.7rem;
      font-family: var(--font-serif);
      color: var(--color1-contrast);
      font-weight: 400;
      letter-spacing: 0.05rem;
      line-height: 1.4;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Comments {
  document = inject(DOCUMENT);
  theme = injectLocalStorage<'light' | 'dark'>('theme', { defaultValue: 'dark' });

  #themeRef = effect(() => {
    const theme = this.theme();
    const giscusTheme = theme === 'dark' ? 'noborder_dark' : 'noborder_light';
    this.sendMessage({
      setConfig: {
        theme: giscusTheme,
      },
    });
  });

  #ref = afterNextRender(() => {
    const theme = this.theme();
    const giscusTheme = theme === 'dark' ? 'noborder_dark' : 'noborder_light';
    const giscusScript = this.document.createElement('script');
    giscusScript.src = 'https://giscus.app/client.js';
    giscusScript.setAttribute('src', 'https://giscus.app/client.js');
    giscusScript.setAttribute('data-repo', 'rodrigo54/rodrigoalves.dev');
    giscusScript.setAttribute('data-repo-id', 'MDEwOlJlcG9zaXRvcnkzNjM5NzI5OQ==');
    giscusScript.setAttribute('data-category', 'Blog');
    giscusScript.setAttribute('data-category-id', 'DIC_kwDOAitg884CrRZt');
    giscusScript.setAttribute('data-mapping', 'pathname');
    giscusScript.setAttribute('data-strict', '0');
    giscusScript.setAttribute('data-reactions-enabled', '1');
    giscusScript.setAttribute('data-emit-metadata', '0');
    giscusScript.setAttribute('data-input-position', 'bottom');
    giscusScript.setAttribute('data-theme', giscusTheme);
    giscusScript.setAttribute('data-lang', 'pt');
    giscusScript.setAttribute('crossorigin', 'anonymous');
    giscusScript.setAttribute('async', '');
    this.document.head.appendChild(giscusScript);
  });

  sendMessage<T>(message: T) {
    const iframe = this.document.querySelector<HTMLIFrameElement>('iframe.giscus-frame');
    if (!iframe || !iframe.contentWindow) return;
    iframe.contentWindow.postMessage({ giscus: message }, 'https://giscus.app');
  }
}
