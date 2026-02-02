/**
 * UX Playground Web Component
 *
 * Renderiza ejemplos con preview + código copiable.
 * NO usa Shadow DOM para heredar los CSS custom properties del tema.
 *
 * Uso:
 * <ux-playground src="examples/button/basico.html"></ux-playground>
 */

class UXPlayground extends HTMLElement {
  static get observedAttributes() {
    return ['src'];
  }

  constructor() {
    super();
    this._initialized = false;
    this._code = '';
    this._codeVisible = false;
  }

  connectedCallback() {
    if (!this._initialized) {
      this._initialized = true;
      this.render();
    }
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'src' && oldValue !== newValue && this._initialized) {
      this.render();
    }
  }

  async render() {
    // 1. Obtener contenido
    let content = '';
    if (this.hasAttribute('src')) {
      content = await this.fetchSource(this.getAttribute('src'));
    } else {
      content = this.innerHTML;
    }

    // Guardar código original para mostrar
    this._code = content;

    // 2. Parsear contenido
    const { html, setupScript } = this.parseContent(content);

    // 3. Crear estructura
    this.innerHTML = `
      <div class="ux-playground">
        <div class="ux-playground__preview">${html}</div>
        <div class="ux-playground__toolbar">
          <button type="button" class="ux-playground__btn" data-action="toggle-code">
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/>
            </svg>
            <span>Código</span>
          </button>
          <button type="button" class="ux-playground__btn" data-action="copy">
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
            </svg>
            <span>Copiar</span>
          </button>
        </div>
        <div class="ux-playground__code" style="display: none;">
          <pre class="ux-code-block" data-lang="html">${this.escapeHtml(this._code.trim())}</pre>
        </div>
      </div>
    `;

    // 4. Añadir estilos si no existen
    this.injectStyles();

    // 5. Bind eventos
    this.bindEvents();

    // 6. Ejecutar setup script
    if (setupScript) {
      const preview = this.querySelector('.ux-playground__preview');
      this.executeSetup(setupScript, preview);
    }

    // 7. Inicializar Alpine
    this.initAlpine();

    // 8. Inicializar UX helpers
    if (window.UX?.init) {
      try {
        window.UX.init(this.querySelector('.ux-playground__preview'));
      } catch (e) {
        console.warn('UX init error:', e);
      }
    }
  }

  injectStyles() {
    if (document.getElementById('ux-playground-styles')) return;

    const style = document.createElement('style');
    style.id = 'ux-playground-styles';
    style.textContent = `
      .ux-playground {
        border: 1px solid var(--ux-border-color, #e5e7eb);
        border-radius: var(--ux-border-radius-lg, 12px);
        margin-bottom: var(--ux-space-md, 1rem);
      }
      .ux-playground__preview {
        padding: 1.5rem;
        background: var(--ux-surface, #fff);
        min-height: 60px;
        border-radius: var(--ux-border-radius-lg, 12px) var(--ux-border-radius-lg, 12px) 0 0;
        position: relative;
      }
      .ux-playground__toolbar {
        display: flex;
        gap: 0.5rem;
        padding: 0.5rem 1rem;
        background: var(--ux-surface-secondary, #f9fafb);
        border-top: 1px solid var(--ux-border-color, #e5e7eb);
      }
      .ux-playground__btn {
        display: inline-flex;
        align-items: center;
        gap: 0.375rem;
        padding: 0.375rem 0.75rem;
        font-size: 0.8125rem;
        font-weight: 500;
        color: var(--ux-text-secondary, #6b7280);
        background: transparent;
        border: 1px solid var(--ux-border-color, #e5e7eb);
        border-radius: var(--ux-border-radius, 8px);
        cursor: pointer;
        transition: all 0.15s ease;
      }
      .ux-playground__btn:hover {
        background: var(--ux-surface, #fff);
        color: var(--ux-text, #111827);
        border-color: var(--ux-gray-300, #d1d5db);
      }
      .ux-playground__btn.is-active {
        background: var(--ux-primary, #0ea5e9);
        color: white;
        border-color: var(--ux-primary, #0ea5e9);
      }
      .ux-playground__btn--success {
        background: var(--ux-success, #22c55e) !important;
        color: white !important;
        border-color: var(--ux-success, #22c55e) !important;
      }
      .ux-playground__code {
        border-top: 1px solid var(--ux-border-color, #e5e7eb);
        max-height: 400px;
        overflow: auto;
      }
      .ux-playground__code .ux-code-block {
        margin: 0;
        border-radius: 0;
        border: none;
      }
    `;
    document.head.appendChild(style);
  }

  bindEvents() {
    const toggleBtn = this.querySelector('[data-action="toggle-code"]');
    const copyBtn = this.querySelector('[data-action="copy"]');
    const codeBlock = this.querySelector('.ux-playground__code');

    toggleBtn?.addEventListener('click', () => {
      this._codeVisible = !this._codeVisible;
      codeBlock.style.display = this._codeVisible ? 'block' : 'none';
      toggleBtn.classList.toggle('is-active', this._codeVisible);
    });

    copyBtn?.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(this._code.trim());
        const originalHTML = copyBtn.innerHTML;
        copyBtn.innerHTML = `
          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
          </svg>
          <span>Copiado!</span>
        `;
        copyBtn.classList.add('ux-playground__btn--success');
        setTimeout(() => {
          copyBtn.innerHTML = originalHTML;
          copyBtn.classList.remove('ux-playground__btn--success');
        }, 2000);
      } catch (e) {
        console.error('Copy failed:', e);
      }
    });
  }

  parseContent(content) {
    const div = document.createElement('div');
    div.innerHTML = content;

    let setupScript = '';

    // Extraer <script type="setup">
    const scriptEl = div.querySelector('script[type="setup"]');
    if (scriptEl) {
      setupScript = scriptEl.textContent;
      scriptEl.remove();
    }

    // Mover scripts normales al setup
    div.querySelectorAll('script:not([type="setup"])').forEach(s => {
      if (s.textContent.trim()) {
        setupScript += '\n' + s.textContent;
      }
      s.remove();
    });

    return {
      html: div.innerHTML.trim(),
      setupScript: setupScript.trim()
    };
  }

  executeSetup(code, context) {
    try {
      const fn = new Function('root', `
        const document = {
          querySelector: (s) => root.querySelector(s),
          querySelectorAll: (s) => root.querySelectorAll(s),
          getElementById: (id) => root.querySelector('#' + id),
          createElement: (tag) => window.document.createElement(tag)
        };
        ${code}
      `);
      fn(context);
    } catch (e) {
      console.error('UX Playground setup error:', e);
    }
  }

  initAlpine() {
    if (!window.Alpine) return;
    try {
      const preview = this.querySelector('.ux-playground__preview');
      if (preview?.querySelectorAll('[x-data]').length > 0) {
        Alpine.initTree(preview);
      }
    } catch (e) {
      console.warn('Alpine init error:', e);
    }
  }

  async fetchSource(url) {
    try {
      const baseUrl = this.getAttribute('base-url') || '';
      const fullUrl = url.startsWith('/') || url.startsWith('http') ? url : baseUrl + url;
      const response = await fetch(fullUrl);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.text();
    } catch (e) {
      console.error(`Failed to load: ${url}`, e);
      return `<div style="color: var(--ux-danger, red);">Error: ${url}</div>`;
    }
  }

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  // Public methods
  reload() { this.render(); }
  getCode() { return this._code; }
}

customElements.define('ux-playground', UXPlayground);
