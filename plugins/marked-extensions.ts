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
