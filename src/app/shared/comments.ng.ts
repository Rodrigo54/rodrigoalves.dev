import { afterNextRender, ChangeDetectionStrategy, Component, DOCUMENT, inject } from '@angular/core';

@Component({
  selector: 'comments',
  imports: [],
  template: `
    <h2>Comentários</h2>
    <div id="comments" class="giscus"></div>
  `,
  styles: `
    h2 {
      margin: 2rem auto 1rem;
      font-size: 1.7rem;
      font-family: var(--font-serif);
      font-weight: 400;
      letter-spacing: 0.05rem;
      line-height: 1.4;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Comments {
  document = inject(DOCUMENT);

  #ref = afterNextRender(() => {
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
    giscusScript.setAttribute('data-theme', 'dark');
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
