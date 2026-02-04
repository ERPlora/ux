import * as helpers from './helpers.js';

const NODE_TYPES = {
  ELEMENT: typeof window !== 'undefined' && window.Node ? window.Node.ELEMENT_NODE : 1,
};

function resolveRoot(root) {
  if (!root) return document;
  if (root.querySelectorAll) return root;
  return document;
}

function collectNodes(root, selector) {
  const scope = resolveRoot(root);
  const nodes = Array.from(scope.querySelectorAll(selector));
  if (scope && scope.nodeType === NODE_TYPES.ELEMENT && scope.matches(selector)) {
    nodes.unshift(scope);
  }
  return nodes;
}

function attachDomListeners(instance) {
  if (typeof document === 'undefined' || instance._domListenersAttached) {
    return;
  }

  const reinit = (target) => {
    if (target) {
      instance.init(target);
    } else {
      instance.init();
    }
  };

  document.addEventListener('htmx:afterSwap', (event) => {
    reinit(event.detail?.target || event.target);
  });

  document.addEventListener('turbo:load', () => reinit());

  document.addEventListener('alpine:initialized', (event) => {
    reinit(event.target || document);
  });

  instance._domListenersAttached = true;
}

export function createUX({
  version,
  classMap,
  attributeMap,
  manualMap,
  exportedComponents,
}) {
  const normalizedManual = {};
  const manualEntries = manualMap || {};
  Object.entries(manualEntries).forEach(([key, value]) => {
    normalizedManual[key.toLowerCase().replace(/[\s_-]/g, '')] = value;
  });

  const attributes = attributeMap || {};
  const exported = exportedComponents || {};

  const instances = new WeakMap();

  const ux = {
    version,
    ...helpers,
    ...exported,
    _instances: instances,

    init(root = document) {
      const scope = resolveRoot(root);
      collectNodes(scope, '[data-ux="js"]').forEach((el) => {
        if (this._instances.has(el)) return;

        for (const [className, ComponentClass] of Object.entries(classMap)) {
          if (el.classList.contains(className)) {
            const instance = new ComponentClass(el);
            el._uxComponent = instance;
            this._instances.set(el, instance);
            break;
          }
        }
      });

      Object.entries(attributes).forEach(([attr, ComponentClass]) => {
        collectNodes(scope, `[${attr}]`).forEach((el) => {
          if (this._instances.has(el)) return;
          const instance = new ComponentClass(el);
          el._uxComponent = instance;
          this._instances.set(el, instance);
        });
      });
    },

    get(selector) {
      const el =
        typeof selector === 'string' ? document.querySelector(selector) : selector;
      return el?._uxComponent || this._instances.get(el);
    },

    create(type, element, options = {}) {
      const key = type.toLowerCase().replace(/[\s_-]/g, '');
      const ComponentClass = normalizedManual[key];
      if (!ComponentClass) {
        console.warn(`UX: Unknown component type "${type}"`);
        return null;
      }

      const el =
        typeof element === 'string' ? document.querySelector(element) : element;
      if (!el) {
        console.warn('UX: Element not found');
        return null;
      }

      const instance = new ComponentClass(el, options);
      el._uxComponent = instance;
      this._instances.set(el, instance);
      return instance;
    },

    destroy(selector) {
      const instance = this.get(selector);
      if (instance && typeof instance.destroy === 'function') {
        instance.destroy();
      }

      const el =
        typeof selector === 'string' ? document.querySelector(selector) : selector;
      if (el) {
        delete el._uxComponent;
        this._instances.delete(el);
      }
    },
  };

  if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => ux.init());
    } else {
      ux.init();
    }
  }

  attachDomListeners(ux);

  return ux;
}
