/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it
import "lazysizes";

export const onClientEntry = () => {
  console.log("We've started!");

  // Load Themes
  (function() {
    window.__onThemeChange = () => {};
    function setTheme(newTheme) {
      window.__theme = newTheme;
      preferredTheme = newTheme;
      document.body.className = newTheme;
      window.__onThemeChange(newTheme);
    }
    var preferredTheme;
    try {
      preferredTheme = localStorage.getItem('theme');
    } catch (err) { }
    window.__setPreferredTheme = (newTheme) => {
      setTheme(newTheme);
      try {
        localStorage.setItem('theme', newTheme);
      } catch (err) {}
    }
    setTheme(preferredTheme || 'dark');
  })();

  // Load config
  (function() {
    window.__onConfigChange = () => {};
    function setConfig(newConfig) {
      window.__config = newConfig;
      preferredConfig = newConfig;
      document.body.id = newConfig.display;
      window.__onConfigChange(newConfig);
    }
    var preferredConfig;
    try {
      preferredConfig = JSON.parse(localStorage.getItem('config')) || {
        display: 'list'
      };
    } catch (err) { }
    window.__setPreferredConfig = (newConfig) => {
      setConfig(newConfig);
      try {
        localStorage.setItem('config', JSON.stringify(newConfig));
      } catch (err) {}
    }
    setConfig(preferredConfig);
  })();
}
