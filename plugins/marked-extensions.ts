import type { Tokens } from 'marked';

export const anchorLinkExtension = {
  renderer: {
    link: (token: { href: string; text: string }) => {
      // Check if the link is external
      if (token.href.startsWith('http://') || token.href.startsWith('https://')) {
        return `<a href="${token.href}" target="_blank" rel="noopener noreferrer">${token.text}</a>`;
      }
      return `<a href="${token.href}">${token.text}</a>`;
    },
  },
};

export const tableWrapperExtension = {
  renderer: {
    table(this: { parser: { parseInline: (tokens: Tokens.Generic[]) => string } }, token: Tokens.Table) {
      const header = token.header
        .map(cell => `<th align="${cell.align || 'left'}">${this.parser.parseInline(cell.tokens)}</th>`)
        .join('');

      const body = token.rows
        .map(row => {
          const cells = row
            .map(cell => `<td align="${cell.align || 'left'}">${this.parser.parseInline(cell.tokens)}</td>`)
            .join('');
          return `<tr>${cells}</tr>`;
        })
        .join('');

      return `
        <div class="table-wrapper">
          <table>
            <thead><tr>${header}</tr></thead>
            <tbody>${body}</tbody>
          </table>
        </div>
      `;
    },
  },
};
