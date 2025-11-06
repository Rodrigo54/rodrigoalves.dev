import type { ShikiTransformer } from '@shikijs/types';
import { h } from 'hastscript';

export interface CopyButtonOptions {
  /**
   * Duração em ms que o estado "copiado" fica visível
   * @default 2000
   */
  toggle?: number;
}

/**
 * Adiciona um header com o nome da linguagem e um botão de copiar código
 */
export function addCopyButton(options: CopyButtonOptions = {}): ShikiTransformer {
  const toggleMs = options.toggle ?? 2000;

  return {
    name: 'shiki-copy-button',
    pre(node) {
      // Pega o nome da linguagem ou usa meta string customizada
      const label = this.options.meta?.__raw || this.options.lang || 'code';
      const langLabel = h('span', { class: 'lang' }, [label]);

      const button = h(
        'button',
        {
          class: 'copy',
          type: 'button',
          'aria-label': 'Copiar código',
          onclick: `
            const code = this.parentElement.nextElementSibling;
            navigator.clipboard.writeText(code.innerText.trim());
            this.classList.add('copied');
            setTimeout(() => this.classList.remove('copied'), ${toggleMs});
          `.trim(),
        },
        [
          h('div', { class: 'ready' }, [
            h(
              'svg',
              {
                xmlns: 'http://www.w3.org/2000/svg',
                fill: 'none',
                stroke: 'currentColor',
                'stroke-linecap': 'round',
                'stroke-linejoin': 'round',
                'stroke-width': '2',
                viewBox: '0 0 24 24',
              },
              [
                h('rect', { width: '8', height: '4', x: '8', y: '2', rx: '1', ry: '1' }),
                h('path', { d: 'M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2' }),
              ],
            ),
          ]),
          h('div', { class: 'success' }, [
            h(
              'svg',
              {
                xmlns: 'http://www.w3.org/2000/svg',
                fill: 'none',
                stroke: 'currentColor',
                'stroke-linecap': 'round',
                'stroke-linejoin': 'round',
                'stroke-width': '2',
                viewBox: '0 0 24 24',
              },
              [
                h('rect', { width: '8', height: '4', x: '8', y: '2', rx: '1', ry: '1' }),
                h('path', { d: 'M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2' }),
                h('path', { d: 'm9 14 2 2 4-4' }),
              ],
            ),
          ]),
        ],
      );

      const header = h('div', { class: 'code-header' }, [langLabel, button]);

      node.children.unshift(header);
    },
  };
}
