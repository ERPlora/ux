/**
 * UX Core helpers for documentation examples.
 * Provides lightweight auto-initialization hooks that mirror
 * the guidance shown in the docs (served via https://erplora.github.io/ux/js/ux-core.js).
 */
(function (global) {
  if (typeof document === 'undefined') return;

  const reinit = (target) => {
    if (global.UX && typeof global.UX.init === 'function') {
      global.UX.init(target);
    }
  };

  document.addEventListener('DOMContentLoaded', () => reinit());

  document.addEventListener('htmx:afterSwap', (event) => {
    reinit(event.detail?.target || event.target);
  });

  document.addEventListener('turbo:load', () => reinit());

  global.UXCore = {
    init: reinit,
    version: global.UX?.version || '2.x',
  };
})(window);
