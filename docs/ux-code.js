/**
 * UX Code Web Component
 *
 * Carga y muestra código desde archivos externos en bloques <pre>.
 * Usado para ejemplos de código que no necesitan preview (HTMX + Django).
 *
 * Uso:
 * <ux-code src="examples/select/django-views.html" lang="python"></ux-code>
 */

class UXCode extends HTMLElement {
  static get observedAttributes() {
    return ['src', 'lang'];
  }

  constructor() {
    super();
    this._initialized = false;
  }

  connectedCallback() {
    if (!this._initialized) {
      this._initialized = true;
      this.render();
    }
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue && this._initialized) {
      this.render();
    }
  }

  async render() {
    const src = this.getAttribute('src');
    const lang = this.getAttribute('lang') || this.detectLang(src);

    if (!src) {
      this.innerHTML = '<pre class="ux-code-block">Error: src attribute required</pre>';
      return;
    }

    // Mostrar loading
    this.innerHTML = '<pre class="ux-code-block" style="opacity: 0.5;">Cargando...</pre>';

    try {
      const code = await this.fetchCode(src);
      const escaped = this.escapeHtml(code);
      this.innerHTML = `<pre class="ux-code-block" data-lang="${lang}">${escaped}</pre>`;
    } catch (e) {
      this.innerHTML = `<pre class="ux-code-block" data-lang="error">Error cargando: ${src}\n${e.message}</pre>`;
    }
  }

  async fetchCode(url) {
    const baseUrl = '/docs/';
    const fullUrl = url.startsWith('/') || url.startsWith('http') ? url : baseUrl + url;

    const response = await fetch(fullUrl);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    return (await response.text()).trim();
  }

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  detectLang(src) {
    if (!src) return 'text';
    if (src.endsWith('.py')) return 'python';
    if (src.endsWith('.js')) return 'javascript';
    if (src.endsWith('.html')) return 'html';
    if (src.endsWith('.css')) return 'css';
    if (src.endsWith('.json')) return 'json';
    return 'text';
  }
}

customElements.define('ux-code', UXCode);
