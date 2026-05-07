/*!
 * ERPlora UX · Theme runtime (~3 KB ES module, no deps)
 * https://github.com/ERPlora/ux
 *
 * Provides a small framework-agnostic ThemeManager that toggles
 * `[data-theme]` and `[data-template]` on a root element (and any
 * registered iframes), persists the choice, and emits change events.
 *
 * Usage:
 *
 *   import { createThemeManager, loadManifest } from '<cdn>/lib/js/theme-runtime.js';
 *
 *   const theme = createThemeManager();
 *   theme.apply();                          // sync DOM with current state
 *   theme.set('erplora-light', 'corporate'); // change both
 *   theme.subscribe(state => console.log(state));
 *
 *   // Auto-syncs every iframe under the observed container as it appears:
 *   theme.observe(document.getElementById('preview-stage'));
 */

const STORAGE_PREFIX = 'ux';

/* ------------------------------------------------------------------ */
/* Storage adapters                                                    */
/* ------------------------------------------------------------------ */

/** Default adapter: localStorage with a key prefix, silently no-ops in
 *  privacy mode or when unavailable (SSR, sandboxed iframes, etc.). */
export function localStorageAdapter(prefix = STORAGE_PREFIX) {
  return {
    get(key) {
      try { return globalThis.localStorage?.getItem(`${prefix}-${key}`); }
      catch { return null; }
    },
    set(key, value) {
      try { globalThis.localStorage?.setItem(`${prefix}-${key}`, value ?? ''); }
      catch { /* swallow */ }
    },
  };
}

/** In-memory adapter — useful for SSR or tests. */
export function memoryStorageAdapter() {
  const store = new Map();
  return {
    get: (k) => store.get(k) ?? null,
    set: (k, v) => store.set(k, v ?? ''),
  };
}

/* ------------------------------------------------------------------ */
/* ThemeManager                                                        */
/* ------------------------------------------------------------------ */

/**
 * @typedef {Object} ThemeState
 * @property {string} theme    e.g. "erplora" | "erplora-light"
 * @property {string} template e.g. "" | "corporate" | "minimal" | …
 */

/**
 * @typedef {Object} ThemeManagerOptions
 * @property {Element}  [rootEl]    - element receiving data-* attrs (default: <html>)
 * @property {Object}   [storage]   - adapter with get/set (default: localStorage)
 * @property {ThemeState} [defaults]
 * @property {(state:ThemeState)=>void} [onChange]
 */

/**
 * Create a theme manager. Idempotent — calling `apply()` repeatedly is safe.
 * @param {ThemeManagerOptions} [opts]
 */
export function createThemeManager(opts = {}) {
  const rootEl = opts.rootEl ?? globalThis.document?.documentElement;
  const storage = opts.storage ?? localStorageAdapter();
  const defaults = { theme: 'erplora', template: '', ...(opts.defaults ?? {}) };

  /** @type {ThemeState} */
  const state = {
    theme: storage.get('theme') || defaults.theme,
    template: storage.get('template') || defaults.template,
  };

  const listeners = new Set();
  const iframes = new Set();
  const observers = new Set();

  /** Resolve effective `data-template` value, accounting for the light suffix. */
  function resolveTemplateAttr() {
    if (!state.template) return '';
    return state.theme.endsWith('-light')
      ? `${state.template}-light`
      : state.template;
  }

  /** Apply current state to a target element (default: rootEl). */
  function applyTo(target) {
    if (!target || !target.setAttribute) return;
    target.setAttribute('data-theme', state.theme);
    const t = resolveTemplateAttr();
    if (t) target.setAttribute('data-template', t);
    else target.removeAttribute('data-template');
  }

  /** Best-effort sync of a single iframe (same-origin only). */
  function syncIframe(ifr) {
    try {
      const doc = ifr.contentDocument;
      const root = doc && doc.documentElement;
      if (!root) return;
      applyTo(root);
    } catch { /* cross-origin or detached, skip */ }
  }

  function notify() {
    applyTo(rootEl);
    iframes.forEach(syncIframe);
    listeners.forEach(fn => { try { fn({ ...state }); } catch (e) { console.error(e); } });
  }

  function persist() {
    storage.set('theme', state.theme);
    storage.set('template', state.template);
  }

  /* ---- public API ---- */

  function getState() { return { ...state }; }

  function setTheme(theme) {
    if (typeof theme !== 'string' || state.theme === theme) return;
    state.theme = theme;
    persist();
    notify();
  }

  function setTemplate(template) {
    template = template ?? '';
    if (state.template === template) return;
    state.template = template;
    persist();
    notify();
  }

  /** Set both atomically (prevents two repaints on simultaneous change). */
  function set(theme, template) {
    let dirty = false;
    if (typeof theme === 'string' && state.theme !== theme) { state.theme = theme; dirty = true; }
    if (template !== undefined && state.template !== (template ?? '')) { state.template = template ?? ''; dirty = true; }
    if (!dirty) return;
    persist();
    notify();
  }

  /** Manually attach an iframe — keeps it in sync on this and future changes. */
  function attachIframe(ifr) {
    if (!ifr || iframes.has(ifr)) return () => {};
    iframes.add(ifr);
    syncIframe(ifr); // try now in case it's already loaded
    const handler = () => syncIframe(ifr);
    ifr.addEventListener('load', handler);
    return () => {
      iframes.delete(ifr);
      ifr.removeEventListener('load', handler);
    };
  }

  /** Watch a container and auto-attach any iframe that appears inside it. */
  function observe(container) {
    if (!container || !globalThis.MutationObserver) return () => {};
    // Attach iframes already present.
    container.querySelectorAll('iframe').forEach(attachIframe);
    const mo = new MutationObserver(muts => {
      for (const m of muts) {
        for (const node of m.addedNodes) {
          if (node.nodeType !== 1) continue;
          if (node.tagName === 'IFRAME') attachIframe(node);
          else node.querySelectorAll?.('iframe').forEach(attachIframe);
        }
      }
    });
    mo.observe(container, { childList: true, subtree: true });
    observers.add(mo);
    return () => { mo.disconnect(); observers.delete(mo); };
  }

  /** Subscribe to state changes. Calls `fn(state)` immediately and on every change. */
  function subscribe(fn) {
    listeners.add(fn);
    try { fn({ ...state }); } catch (e) { console.error(e); }
    return () => listeners.delete(fn);
  }

  /** Apply the current state to the root element. Call once after init. */
  function apply() { applyTo(rootEl); }

  /** Tear everything down. */
  function dispose() {
    observers.forEach(o => o.disconnect());
    observers.clear();
    iframes.clear();
    listeners.clear();
  }

  if (opts.onChange) listeners.add(opts.onChange);

  return Object.freeze({
    getState, setTheme, setTemplate, set,
    attachIframe, observe, subscribe, apply, dispose,
  });
}

/* ------------------------------------------------------------------ */
/* Manifest loader                                                     */
/* ------------------------------------------------------------------ */

const FALLBACK_MANIFEST = {
  version: '0.0.0',
  default: '',
  templates: [{ id: '', label: 'Default', icon: '⌘' }],
};

/**
 * Fetch the templates manifest. Falls back to a minimal stub if unavailable
 * (offline, missing file, JSON parse error) so the UI still renders.
 *
 * @param {string} [url='/lib/templates/manifest.json']
 * @returns {Promise<{version:string,default:string,templates:Array<{id:string,label:string,icon?:string,description?:string,brand?:string,tags?:string[]}>}>}
 */
export async function loadManifest(url = '/lib/templates/manifest.json') {
  try {
    const res = await fetch(url, { cache: 'no-cache' });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    if (!Array.isArray(data?.templates)) throw new Error('manifest.templates missing');
    return data;
  } catch (e) {
    console.warn('[ux-theme] manifest unavailable, using fallback:', e.message);
    return FALLBACK_MANIFEST;
  }
}
