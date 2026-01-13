/**
 * UX Onscreen Keyboard Component
 * Multi-language virtual keyboard with customizable layouts
 * Supports European languages (Latin and Cyrillic scripts)
 * @requires ux-core.js
 * @requires Alpine.js
 */
(function() {
  'use strict';

  const styles = `
    /* ==========================================================================
       UX Onscreen Keyboard Container
       ========================================================================== */

    .ux-onscreen-keyboard {
      --ux-osk-bg: var(--ux-surface-secondary);
      --ux-osk-key-bg: var(--ux-surface);
      --ux-osk-key-color: var(--ux-text);
      --ux-osk-key-height: 48px;
      --ux-osk-key-radius: var(--ux-radius-md);
      --ux-osk-gap: 6px;
      --ux-osk-padding: 8px;
      --ux-osk-special-bg: var(--ux-gray-200);
      --ux-osk-active-bg: var(--ux-primary);
      --ux-osk-active-color: var(--ux-primary-contrast);

      position: relative;
      width: 100%;
      max-width: 100%;
      background: var(--ux-osk-bg);
      border-radius: var(--ux-radius-lg);
      padding: var(--ux-osk-padding);
      user-select: none;
      -webkit-user-select: none;
      touch-action: manipulation;
    }

    /* Inline variant (for sheets/modals) */
    .ux-onscreen-keyboard--inline {
      border-radius: 0;
      background: transparent;
    }

    /* Compact variant */
    .ux-onscreen-keyboard--compact {
      --ux-osk-key-height: 40px;
      --ux-osk-gap: 4px;
      --ux-osk-padding: 6px;
    }

    /* Large variant (tablet/desktop) */
    .ux-onscreen-keyboard--lg {
      --ux-osk-key-height: 56px;
      --ux-osk-gap: 8px;
      --ux-osk-padding: 12px;
    }

    /* ==========================================================================
       Keyboard Header (Language Selector)
       ========================================================================== */

    .ux-onscreen-keyboard__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 var(--ux-space-xs) var(--ux-space-sm);
      margin-bottom: var(--ux-space-xs);
      border-bottom: 1px solid var(--ux-border-color);
    }

    .ux-onscreen-keyboard__lang-btn {
      display: flex;
      align-items: center;
      gap: var(--ux-space-xs);
      padding: var(--ux-space-xs) var(--ux-space-sm);
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--ux-text);
      background: var(--ux-surface);
      border: 1px solid var(--ux-border-color);
      border-radius: var(--ux-radius-md);
      cursor: pointer;
      transition: all var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-onscreen-keyboard__lang-btn:hover {
      background: var(--ux-surface-secondary);
    }

    .ux-onscreen-keyboard__lang-btn:active {
      transform: scale(0.97);
    }

    .ux-onscreen-keyboard__lang-icon {
      width: 18px;
      height: 18px;
      opacity: 0.7;
    }

    .ux-onscreen-keyboard__title {
      font-size: 0.8125rem;
      font-weight: 600;
      color: var(--ux-text-secondary);
      text-transform: uppercase;
      letter-spacing: 0.02em;
    }

    /* ==========================================================================
       Keyboard Rows
       ========================================================================== */

    .ux-onscreen-keyboard__row {
      display: flex;
      justify-content: center;
      gap: var(--ux-osk-gap);
      margin-bottom: var(--ux-osk-gap);
    }

    .ux-onscreen-keyboard__row:last-child {
      margin-bottom: 0;
    }

    /* ==========================================================================
       Keyboard Keys
       ========================================================================== */

    .ux-onscreen-keyboard__key {
      display: flex;
      align-items: center;
      justify-content: center;
      min-width: var(--ux-osk-key-height);
      height: var(--ux-osk-key-height);
      padding: 0 var(--ux-space-sm);
      font-size: 1.125rem;
      font-weight: 500;
      color: var(--ux-osk-key-color);
      background: var(--ux-osk-key-bg);
      border: none;
      border-radius: var(--ux-osk-key-radius);
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.08);
      cursor: pointer;
      transition: all var(--ux-transition-fast) var(--ux-ease);
      flex: 1;
      max-width: 60px;
      -webkit-tap-highlight-color: transparent;
      -webkit-touch-callout: none;
      user-select: none;
      -webkit-user-select: none;
    }

    /* Prevent focus stealing from input */
    .ux-onscreen-keyboard__key:focus {
      outline: none;
    }

    .ux-onscreen-keyboard__key:hover {
      background: var(--ux-surface-tertiary);
    }

    .ux-onscreen-keyboard__key:active {
      transform: scale(0.92);
      background: var(--ux-osk-active-bg);
      color: var(--ux-osk-active-color);
    }

    /* Special keys */
    .ux-onscreen-keyboard__key--special {
      background: var(--ux-osk-special-bg);
      font-size: 0.875rem;
      font-weight: 600;
      max-width: none;
      flex: 1.5;
    }

    .ux-onscreen-keyboard__key--special:hover {
      background: var(--ux-gray-300);
    }

    /* Shift key */
    .ux-onscreen-keyboard__key--shift {
      flex: 1.5;
    }

    .ux-onscreen-keyboard__key--shift.active {
      background: var(--ux-osk-active-bg);
      color: var(--ux-osk-active-color);
    }

    .ux-onscreen-keyboard__key--shift.caps-lock {
      background: var(--ux-primary);
      color: var(--ux-primary-contrast);
      box-shadow: 0 0 0 2px var(--ux-primary-shade);
    }

    /* Space key */
    .ux-onscreen-keyboard__key--space {
      flex: 5;
      max-width: none;
    }

    /* Backspace key */
    .ux-onscreen-keyboard__key--backspace {
      flex: 1.5;
    }

    /* Enter key */
    .ux-onscreen-keyboard__key--enter {
      flex: 2;
      background: var(--ux-primary);
      color: var(--ux-primary-contrast);
    }

    .ux-onscreen-keyboard__key--enter:hover {
      background: var(--ux-primary-shade);
    }

    /* Number toggle */
    .ux-onscreen-keyboard__key--numbers {
      flex: 1.25;
    }

    /* Key icon */
    .ux-onscreen-keyboard__key-icon {
      width: 22px;
      height: 22px;
    }

    /* Key with secondary character */
    .ux-onscreen-keyboard__key--has-alt {
      position: relative;
    }

    .ux-onscreen-keyboard__key-alt {
      position: absolute;
      top: 4px;
      right: 6px;
      font-size: 0.625rem;
      font-weight: 400;
      color: var(--ux-text-tertiary);
    }

    /* ==========================================================================
       Language Picker Dropdown
       ========================================================================== */

    .ux-onscreen-keyboard__lang-picker {
      position: absolute;
      top: 100%;
      left: var(--ux-osk-padding);
      right: var(--ux-osk-padding);
      margin-top: var(--ux-space-xs);
      background: var(--ux-surface);
      border: 1px solid var(--ux-border-color);
      border-radius: var(--ux-radius-lg);
      box-shadow: var(--ux-shadow-lg);
      max-height: 200px;
      overflow-y: auto;
      z-index: var(--ux-z-dropdown);
    }

    .ux-onscreen-keyboard__lang-option {
      display: flex;
      align-items: center;
      gap: var(--ux-space-sm);
      padding: var(--ux-space-sm) var(--ux-space-md);
      font-size: 0.9375rem;
      color: var(--ux-text);
      cursor: pointer;
      transition: background var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-onscreen-keyboard__lang-option:hover {
      background: var(--ux-surface-secondary);
    }

    .ux-onscreen-keyboard__lang-option.active {
      background: rgba(var(--ux-primary-rgb), 0.1);
      color: var(--ux-primary);
    }

    .ux-onscreen-keyboard__lang-option:first-child {
      border-radius: var(--ux-radius-lg) var(--ux-radius-lg) 0 0;
    }

    .ux-onscreen-keyboard__lang-option:last-child {
      border-radius: 0 0 var(--ux-radius-lg) var(--ux-radius-lg);
    }

    /* ==========================================================================
       Preview Popup (shows pressed key)
       ========================================================================== */

    .ux-onscreen-keyboard__preview {
      position: fixed;
      display: flex;
      align-items: center;
      justify-content: center;
      min-width: 56px;
      height: 56px;
      padding: 0 var(--ux-space-md);
      font-size: 1.5rem;
      font-weight: 600;
      color: var(--ux-text);
      background: var(--ux-surface);
      border-radius: var(--ux-radius-lg);
      box-shadow: var(--ux-shadow-xl);
      pointer-events: none;
      z-index: var(--ux-z-tooltip);
      transform: translate(-50%, -100%) translateY(-16px);
    }

    /* ==========================================================================
       Sheet Container (for keyboard popup)
       ========================================================================== */

    .ux-osk-sheet {
      position: fixed;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: var(--ux-z-modal);
      transform: translateY(100%);
      transition: transform 300ms var(--ux-ease-out);
      padding-bottom: env(safe-area-inset-bottom);
      will-change: transform;
    }

    .ux-osk-sheet--open {
      transform: translateY(0);
    }

    .ux-osk-sheet__container {
      background: var(--ux-glass-bg);
      backdrop-filter: blur(var(--ux-glass-blur-heavy)) saturate(var(--ux-glass-saturation));
      -webkit-backdrop-filter: blur(var(--ux-glass-blur-heavy)) saturate(var(--ux-glass-saturation));
      border-radius: 16px 16px 0 0;
      border-top: 0.5px solid var(--ux-glass-border);
      box-shadow: 0 -4px 32px rgba(0, 0, 0, 0.15);
      max-width: 600px;
      margin: 0 auto;
    }

    @media (min-width: 768px) {
      .ux-osk-sheet__container {
        margin: 0 auto;
        border-radius: 16px 16px 0 0;
      }
    }

    .ux-osk-sheet__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: var(--ux-space-sm) var(--ux-space-md);
      border-bottom: 0.5px solid var(--ux-glass-border);
    }

    .ux-osk-sheet__title {
      font-size: 0.9375rem;
      font-weight: 600;
      color: var(--ux-text);
    }

    .ux-osk-sheet__actions {
      display: flex;
      align-items: center;
      gap: var(--ux-space-sm);
    }

    .ux-osk-sheet__btn {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: var(--ux-space-xs) var(--ux-space-md);
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--ux-primary);
      background: transparent;
      border: none;
      border-radius: var(--ux-radius-md);
      cursor: pointer;
      transition: background var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-osk-sheet__btn:hover {
      background: rgba(var(--ux-primary-rgb), 0.1);
    }

    .ux-osk-sheet__btn:active {
      background: rgba(var(--ux-primary-rgb), 0.2);
    }

    .ux-osk-sheet__btn--close {
      width: 36px;
      height: 36px;
      padding: 0;
      color: var(--ux-text-secondary);
      border-radius: 50%;
    }

    .ux-osk-sheet__btn--close:hover {
      background: var(--ux-surface-secondary);
    }

    .ux-osk-sheet__btn--close svg {
      width: 20px;
      height: 20px;
    }

    .ux-osk-sheet__content {
      padding: var(--ux-space-sm);
    }

    .ux-osk-sheet .ux-onscreen-keyboard {
      background: transparent;
      border-radius: 0;
      padding: 0;
    }

    /* Dark mode for sheet */
    .ux-dark .ux-osk-sheet__container {
      background: rgba(30, 30, 30, 0.95);
    }

    @media (prefers-color-scheme: dark) {
      .ux-osk-sheet__container {
        background: rgba(30, 30, 30, 0.95);
      }
    }

    /* ==========================================================================
       Dark Mode
       ========================================================================== */

    .ux-dark .ux-onscreen-keyboard {
      --ux-osk-bg: var(--ux-gray-900);
      --ux-osk-key-bg: var(--ux-gray-800);
      --ux-osk-special-bg: var(--ux-gray-700);
    }

    @media (prefers-color-scheme: dark) {
      .ux-onscreen-keyboard {
        --ux-osk-bg: var(--ux-gray-900);
        --ux-osk-key-bg: var(--ux-gray-800);
        --ux-osk-special-bg: var(--ux-gray-700);
      }
    }

    .ux-dark .ux-onscreen-keyboard__key {
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
    }

    @media (prefers-color-scheme: dark) {
      .ux-onscreen-keyboard__key {
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
      }
    }

    /* ==========================================================================
       Glass Variant
       ========================================================================== */

    .ux-onscreen-keyboard--glass {
      background: var(--ux-glass-bg);
      backdrop-filter: blur(var(--ux-glass-blur)) saturate(var(--ux-glass-saturation));
      -webkit-backdrop-filter: blur(var(--ux-glass-blur)) saturate(var(--ux-glass-saturation));
      border: 1px solid var(--ux-glass-border);
    }

    .ux-onscreen-keyboard--glass .ux-onscreen-keyboard__key {
      background: rgba(255, 255, 255, 0.6);
    }

    .ux-onscreen-keyboard--glass .ux-onscreen-keyboard__key--special {
      background: rgba(255, 255, 255, 0.4);
    }

    .ux-dark .ux-onscreen-keyboard--glass .ux-onscreen-keyboard__key {
      background: rgba(255, 255, 255, 0.1);
    }

    .ux-dark .ux-onscreen-keyboard--glass .ux-onscreen-keyboard__key--special {
      background: rgba(255, 255, 255, 0.05);
    }

    /* ==========================================================================
       Responsive
       ========================================================================== */

    @media (max-width: 400px) {
      .ux-onscreen-keyboard {
        --ux-osk-key-height: 42px;
        --ux-osk-gap: 4px;
      }

      .ux-onscreen-keyboard__key {
        font-size: 1rem;
      }
    }

    /* ==========================================================================
       Reduced Motion
       ========================================================================== */

    @media (prefers-reduced-motion: reduce) {
      .ux-onscreen-keyboard__key {
        transition: none;
      }

      .ux-onscreen-keyboard__key:active {
        transform: none;
      }
    }
  `;

  // SVG Icons
  const icons = {
    shift: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5l7 9H5l7-9z"/><rect x="8" y="14" width="8" height="5"/></svg>',
    shiftFilled: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 5l7 9H5l7-9z"/><rect x="8" y="14" width="8" height="5"/></svg>',
    backspace: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 4H8l-7 8 7 8h13a2 2 0 002-2V6a2 2 0 00-2-2z"/><line x1="18" y1="9" x2="12" y2="15"/><line x1="12" y1="9" x2="18" y2="15"/></svg>',
    enter: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 10l-5 5 5 5"/><path d="M20 4v7a4 4 0 01-4 4H4"/></svg>',
    globe: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>',
    chevronDown: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>',
    keyboard: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M6 8h.01M10 8h.01M14 8h.01M18 8h.01M6 12h.01M10 12h.01M14 12h.01M18 12h.01M8 16h8"/></svg>',
    chevronDownLg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>',
    close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>'
  };

  // Built-in keyboard layouts for European languages
  const layouts = {
    en: {
      name: 'English',
      code: 'en',
      keys: [
        ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
        ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
        ['{shift}', 'z', 'x', 'c', 'v', 'b', 'n', 'm', '{backspace}'],
        ['{numbers}', '{lang}', '{space}', '.', '{enter}']
      ],
      numbers: [
        ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
        ['-', '/', ':', ';', '(', ')', '$', '&', '@', '"'],
        ['{symbols}', '.', ',', '?', '!', "'", '{backspace}'],
        ['{abc}', '{lang}', '{space}', '.', '{enter}']
      ],
      symbols: [
        ['[', ']', '{', '}', '#', '%', '^', '*', '+', '='],
        ['_', '\\', '|', '~', '<', '>', '€', '£', '¥', '•'],
        ['{numbers}', '.', ',', '?', '!', "'", '{backspace}'],
        ['{abc}', '{lang}', '{space}', '.', '{enter}']
      ]
    },
    es: {
      name: 'Español',
      code: 'es',
      keys: [
        ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
        ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'ñ'],
        ['{shift}', 'z', 'x', 'c', 'v', 'b', 'n', 'm', '{backspace}'],
        ['{numbers}', '{lang}', '{space}', '.', '{enter}']
      ],
      numbers: [
        ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
        ['á', 'é', 'í', 'ó', 'ú', 'ü', '¿', '¡', '@', '"'],
        ['{symbols}', '.', ',', '?', '!', "'", '{backspace}'],
        ['{abc}', '{lang}', '{space}', '.', '{enter}']
      ],
      symbols: [
        ['[', ']', '{', '}', '#', '%', '^', '*', '+', '='],
        ['_', '\\', '|', '~', '<', '>', '€', '£', '¥', '•'],
        ['{numbers}', '.', ',', '?', '!', "'", '{backspace}'],
        ['{abc}', '{lang}', '{space}', '.', '{enter}']
      ]
    },
    fr: {
      name: 'Français',
      code: 'fr',
      keys: [
        ['a', 'z', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
        ['q', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm'],
        ['{shift}', 'w', 'x', 'c', 'v', 'b', 'n', "'", '{backspace}'],
        ['{numbers}', '{lang}', '{space}', '.', '{enter}']
      ],
      numbers: [
        ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
        ['é', 'è', 'ê', 'ë', 'à', 'â', 'ù', 'û', 'ô', 'ç'],
        ['{symbols}', '.', ',', '?', '!', "'", '{backspace}'],
        ['{abc}', '{lang}', '{space}', '.', '{enter}']
      ],
      symbols: [
        ['œ', 'æ', 'î', 'ï', 'ÿ', 'ñ', '«', '»', '€', '£'],
        ['[', ']', '{', '}', '#', '%', '^', '*', '+', '='],
        ['{numbers}', '.', ',', '?', '!', "'", '{backspace}'],
        ['{abc}', '{lang}', '{space}', '.', '{enter}']
      ]
    },
    de: {
      name: 'Deutsch',
      code: 'de',
      keys: [
        ['q', 'w', 'e', 'r', 't', 'z', 'u', 'i', 'o', 'p'],
        ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
        ['{shift}', 'y', 'x', 'c', 'v', 'b', 'n', 'm', '{backspace}'],
        ['{numbers}', '{lang}', '{space}', '.', '{enter}']
      ],
      numbers: [
        ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
        ['ä', 'ö', 'ü', 'ß', '€', '-', '/', ':', '@', '"'],
        ['{symbols}', '.', ',', '?', '!', "'", '{backspace}'],
        ['{abc}', '{lang}', '{space}', '.', '{enter}']
      ]
    },
    it: {
      name: 'Italiano',
      code: 'it',
      keys: [
        ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
        ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
        ['{shift}', 'z', 'x', 'c', 'v', 'b', 'n', 'm', '{backspace}'],
        ['{numbers}', '{lang}', '{space}', '.', '{enter}']
      ],
      numbers: [
        ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
        ['à', 'è', 'é', 'ì', 'í', 'ò', 'ó', 'ù', 'ú', '@'],
        ['{symbols}', '.', ',', '?', '!', "'", '{backspace}'],
        ['{abc}', '{lang}', '{space}', '.', '{enter}']
      ]
    },
    pt: {
      name: 'Português',
      code: 'pt',
      keys: [
        ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
        ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'ç'],
        ['{shift}', 'z', 'x', 'c', 'v', 'b', 'n', 'm', '{backspace}'],
        ['{numbers}', '{lang}', '{space}', '.', '{enter}']
      ],
      numbers: [
        ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
        ['á', 'à', 'â', 'ã', 'é', 'ê', 'í', 'ó', 'ô', 'õ'],
        ['{symbols}', 'ú', '.', ',', '?', '!', '{backspace}'],
        ['{abc}', '{lang}', '{space}', '.', '{enter}']
      ]
    },
    ro: {
      name: 'Română',
      code: 'ro',
      keys: [
        ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
        ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
        ['{shift}', 'z', 'x', 'c', 'v', 'b', 'n', 'm', '{backspace}'],
        ['{numbers}', '{lang}', '{space}', '.', '{enter}']
      ],
      numbers: [
        ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
        ['ă', 'â', 'î', 'ș', 'ț', '-', '/', ':', ';', '@'],
        ['{symbols}', '.', ',', '?', '!', "'", '{backspace}'],
        ['{abc}', '{lang}', '{space}', '.', '{enter}']
      ],
      symbols: [
        ['[', ']', '{', '}', '#', '%', '^', '*', '+', '='],
        ['_', '\\', '|', '~', '<', '>', '€', '£', '¥', '•'],
        ['{numbers}', '.', ',', '?', '!', "'", '{backspace}'],
        ['{abc}', '{lang}', '{space}', '.', '{enter}']
      ]
    },
    pl: {
      name: 'Polski',
      code: 'pl',
      keys: [
        ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
        ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'ł'],
        ['{shift}', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'ż', '{backspace}'],
        ['{numbers}', '{lang}', '{space}', '.', '{enter}']
      ],
      numbers: [
        ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
        ['ą', 'ć', 'ę', 'ń', 'ó', 'ś', 'ź', 'ż', '@', '"'],
        ['{symbols}', '.', ',', '?', '!', "'", '{backspace}'],
        ['{abc}', '{lang}', '{space}', '.', '{enter}']
      ]
    },
    nl: {
      name: 'Nederlands',
      code: 'nl',
      keys: [
        ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
        ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
        ['{shift}', 'z', 'x', 'c', 'v', 'b', 'n', 'm', '{backspace}'],
        ['{numbers}', '{lang}', '{space}', '.', '{enter}']
      ],
      numbers: [
        ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
        ['é', 'ë', 'ï', 'ó', 'ö', 'ü', 'ij', '@', '"', '€'],
        ['{symbols}', '.', ',', '?', '!', "'", '{backspace}'],
        ['{abc}', '{lang}', '{space}', '.', '{enter}']
      ]
    },
    sv: {
      name: 'Svenska',
      code: 'sv',
      keys: [
        ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
        ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
        ['{shift}', 'z', 'x', 'c', 'v', 'b', 'n', 'm', '{backspace}'],
        ['{numbers}', '{lang}', '{space}', '.', '{enter}']
      ],
      numbers: [
        ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
        ['å', 'ä', 'ö', '-', '/', ':', ';', '@', '"', '€'],
        ['{symbols}', '.', ',', '?', '!', "'", '{backspace}'],
        ['{abc}', '{lang}', '{space}', '.', '{enter}']
      ]
    },
    no: {
      name: 'Norsk',
      code: 'no',
      keys: [
        ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
        ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
        ['{shift}', 'z', 'x', 'c', 'v', 'b', 'n', 'm', '{backspace}'],
        ['{numbers}', '{lang}', '{space}', '.', '{enter}']
      ],
      numbers: [
        ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
        ['å', 'ø', 'æ', '-', '/', ':', ';', '@', '"', '€'],
        ['{symbols}', '.', ',', '?', '!', "'", '{backspace}'],
        ['{abc}', '{lang}', '{space}', '.', '{enter}']
      ]
    },
    fi: {
      name: 'Suomi',
      code: 'fi',
      keys: [
        ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
        ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
        ['{shift}', 'z', 'x', 'c', 'v', 'b', 'n', 'm', '{backspace}'],
        ['{numbers}', '{lang}', '{space}', '.', '{enter}']
      ],
      numbers: [
        ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
        ['å', 'ä', 'ö', '-', '/', ':', ';', '@', '"', '€'],
        ['{symbols}', '.', ',', '?', '!', "'", '{backspace}'],
        ['{abc}', '{lang}', '{space}', '.', '{enter}']
      ]
    },
    cs: {
      name: 'Čeština',
      code: 'cs',
      keys: [
        ['q', 'w', 'e', 'r', 't', 'z', 'u', 'i', 'o', 'p'],
        ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'ů'],
        ['{shift}', 'y', 'x', 'c', 'v', 'b', 'n', 'm', '{backspace}'],
        ['{numbers}', '{lang}', '{space}', '.', '{enter}']
      ],
      numbers: [
        ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
        ['á', 'č', 'ď', 'é', 'ě', 'í', 'ň', 'ó', 'ř', 'š'],
        ['{symbols}', 'ť', 'ú', 'ý', 'ž', '?', '{backspace}'],
        ['{abc}', '{lang}', '{space}', '.', '{enter}']
      ]
    },
    sk: {
      name: 'Slovenčina',
      code: 'sk',
      keys: [
        ['q', 'w', 'e', 'r', 't', 'z', 'u', 'i', 'o', 'p'],
        ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'ô'],
        ['{shift}', 'y', 'x', 'c', 'v', 'b', 'n', 'm', '{backspace}'],
        ['{numbers}', '{lang}', '{space}', '.', '{enter}']
      ],
      numbers: [
        ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
        ['á', 'ä', 'č', 'ď', 'é', 'í', 'ľ', 'ĺ', 'ň', 'ó'],
        ['{symbols}', 'ô', 'ŕ', 'š', 'ť', 'ú', 'ý', 'ž', '{backspace}'],
        ['{abc}', '{lang}', '{space}', '.', '{enter}']
      ]
    },
    hu: {
      name: 'Magyar',
      code: 'hu',
      keys: [
        ['q', 'w', 'e', 'r', 't', 'z', 'u', 'i', 'o', 'p'],
        ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
        ['{shift}', 'y', 'x', 'c', 'v', 'b', 'n', 'm', '{backspace}'],
        ['{numbers}', '{lang}', '{space}', '.', '{enter}']
      ],
      numbers: [
        ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
        ['á', 'é', 'í', 'ó', 'ö', 'ő', 'ú', 'ü', 'ű', '@'],
        ['{symbols}', '.', ',', '?', '!', "'", '{backspace}'],
        ['{abc}', '{lang}', '{space}', '.', '{enter}']
      ]
    },
    ru: {
      name: 'Русский',
      code: 'ru',
      keys: [
        ['й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х'],
        ['ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э'],
        ['{shift}', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '{backspace}'],
        ['{numbers}', '{lang}', '{space}', '.', '{enter}']
      ],
      numbers: [
        ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
        ['ъ', 'ё', '-', '/', ':', ';', '(', ')', '₽', '@'],
        ['{symbols}', '.', ',', '?', '!', "'", '{backspace}'],
        ['{abc}', '{lang}', '{space}', '.', '{enter}']
      ]
    },
    uk: {
      name: 'Українська',
      code: 'uk',
      keys: [
        ['й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х'],
        ['ф', 'і', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'є'],
        ['{shift}', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '{backspace}'],
        ['{numbers}', '{lang}', 'ї', '{space}', '.', '{enter}']
      ],
      numbers: [
        ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
        ['ґ', 'ʼ', '-', '/', ':', ';', '(', ')', '₴', '@'],
        ['{symbols}', '.', ',', '?', '!', "'", '{backspace}'],
        ['{abc}', '{lang}', '{space}', '.', '{enter}']
      ]
    },
    bg: {
      name: 'Български',
      code: 'bg',
      keys: [
        ['я', 'в', 'е', 'р', 'т', 'ъ', 'у', 'и', 'о', 'п', 'ш'],
        ['а', 'с', 'д', 'ф', 'г', 'х', 'й', 'к', 'л'],
        ['{shift}', 'з', 'ь', 'ц', 'ж', 'б', 'н', 'м', 'ч', 'ю', '{backspace}'],
        ['{numbers}', '{lang}', '{space}', '.', '{enter}']
      ],
      numbers: [
        ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
        ['щ', '-', '/', ':', ';', '(', ')', 'лв', '@', '"'],
        ['{symbols}', '.', ',', '?', '!', "'", '{backspace}'],
        ['{abc}', '{lang}', '{space}', '.', '{enter}']
      ]
    },
    sr: {
      name: 'Српски',
      code: 'sr',
      keys: [
        ['љ', 'њ', 'е', 'р', 'т', 'з', 'у', 'и', 'о', 'п', 'ш'],
        ['а', 'с', 'д', 'ф', 'г', 'х', 'ј', 'к', 'л', 'ч', 'ћ'],
        ['{shift}', 'ѕ', 'џ', 'ц', 'в', 'б', 'н', 'м', 'ђ', 'ж', '{backspace}'],
        ['{numbers}', '{lang}', '{space}', '.', '{enter}']
      ]
    },
    mk: {
      name: 'Македонски',
      code: 'mk',
      keys: [
        ['љ', 'њ', 'е', 'р', 'т', 'ѕ', 'у', 'и', 'о', 'п', 'ш'],
        ['а', 'с', 'д', 'ф', 'г', 'х', 'ј', 'к', 'л', 'ч', 'ќ'],
        ['{shift}', 'з', 'џ', 'ц', 'в', 'б', 'н', 'м', 'ѓ', 'ж', '{backspace}'],
        ['{numbers}', '{lang}', '{space}', '.', '{enter}']
      ]
    },
    el: {
      name: 'Ελληνικά',
      code: 'el',
      keys: [
        [';', 'ς', 'ε', 'ρ', 'τ', 'υ', 'θ', 'ι', 'ο', 'π'],
        ['α', 'σ', 'δ', 'φ', 'γ', 'η', 'ξ', 'κ', 'λ'],
        ['{shift}', 'ζ', 'χ', 'ψ', 'ω', 'β', 'ν', 'μ', '{backspace}'],
        ['{numbers}', '{lang}', '{space}', '.', '{enter}']
      ],
      numbers: [
        ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
        ['ά', 'έ', 'ή', 'ί', 'ό', 'ύ', 'ώ', 'ϊ', 'ϋ', '€'],
        ['{symbols}', '.', ',', '?', '!', "'", '{backspace}'],
        ['{abc}', '{lang}', '{space}', '.', '{enter}']
      ]
    }
  };

  // Inject styles
  if (window.UX) {
    window.UX.injectStyles('ux-onscreen-keyboard-styles', styles);
  } else {
    const styleEl = document.createElement('style');
    styleEl.id = 'ux-onscreen-keyboard-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }

  // Alpine.js component
  const onscreenKeyboardData = (options = {}) => ({
    // Configuration
    targetSelector: options.targetSelector || null,
    enabledLanguages: options.languages || ['en', 'es', 'fr', 'de', 'it', 'pt'],
    showLanguageSelector: options.showLanguageSelector !== false,
    showPreview: options.showPreview !== false,
    customLayouts: options.customLayouts || {},
    defaultLanguage: options.defaultLanguage || 'en',
    onInput: options.onInput || null,
    onEnter: options.onEnter || null,
    onClose: options.onClose || null,

    // State
    isOpen: options.isOpen || false,
    currentLanguage: '',
    currentLayout: null,
    shiftActive: false,
    capsLock: false,
    showNumbers: false,
    showSymbols: false,
    showLangPicker: false,
    previewKey: null,
    previewPosition: { x: 0, y: 0 },

    // Icons
    icons: icons,

    // Lifecycle
    init() {
      this.currentLanguage = this.defaultLanguage;
      this.loadLayout(this.currentLanguage);
    },

    // Open the keyboard sheet
    open() {
      this.isOpen = true;
      this.$dispatch('osk:open');
    },

    // Close the keyboard sheet
    close() {
      this.isOpen = false;
      this.showLangPicker = false;
      if (this.onClose) {
        this.onClose();
      }
      this.$dispatch('osk:close');
    },

    // Toggle open/close
    toggle() {
      if (this.isOpen) {
        this.close();
      } else {
        this.open();
      }
    },

    // Get all available layouts
    get availableLayouts() {
      const allLayouts = { ...layouts, ...this.customLayouts };
      return this.enabledLanguages
        .filter(code => allLayouts[code])
        .map(code => ({
          code,
          name: allLayouts[code].name
        }));
    },

    // Load a layout by language code
    loadLayout(langCode) {
      const allLayouts = { ...layouts, ...this.customLayouts };
      if (allLayouts[langCode]) {
        this.currentLayout = allLayouts[langCode];
        this.currentLanguage = langCode;
        this.showNumbers = false;
        this.showSymbols = false;
        this.$dispatch('osk:language', { language: langCode, layout: this.currentLayout });
      }
    },

    // Get current rows to display
    get currentRows() {
      if (!this.currentLayout) return [];

      if (this.showSymbols && this.currentLayout.symbols) {
        return this.currentLayout.symbols;
      }
      if (this.showNumbers && this.currentLayout.numbers) {
        return this.currentLayout.numbers;
      }
      if (this.showNumbers && layouts.en.numbers) {
        // Fallback to English numbers if no custom numbers
        return layouts.en.numbers;
      }
      return this.currentLayout.keys || [];
    },

    // Process a key for display
    displayKey(key) {
      if (key.startsWith('{') && key.endsWith('}')) {
        return null; // Special key, handle separately
      }

      let displayChar = key;
      if (this.shiftActive || this.capsLock) {
        displayChar = key.toUpperCase();
      }

      return displayChar;
    },

    // Check if key is special
    isSpecialKey(key) {
      return key.startsWith('{') && key.endsWith('}');
    },

    // Get special key type
    getSpecialKeyType(key) {
      return key.slice(1, -1);
    },

    // Handle key press
    pressKey(key, event) {
      if (this.isSpecialKey(key)) {
        this.handleSpecialKey(key);
      } else {
        this.insertCharacter(key);
      }

      // Show preview
      if (this.showPreview && !this.isSpecialKey(key) && event) {
        const rect = event.target.getBoundingClientRect();
        this.previewPosition = {
          x: rect.left + rect.width / 2,
          y: rect.top
        };
        this.previewKey = this.shiftActive || this.capsLock ? key.toUpperCase() : key;
        setTimeout(() => {
          this.previewKey = null;
        }, 100);
      }
    },

    // Insert a character
    insertCharacter(char) {
      const target = this.getTargetInput();
      let insertChar = char;

      if (this.shiftActive || this.capsLock) {
        insertChar = char.toUpperCase();
      }

      if (target) {
        const start = target.selectionStart || 0;
        const end = target.selectionEnd || 0;
        const value = target.value || '';

        target.value = value.slice(0, start) + insertChar + value.slice(end);
        target.selectionStart = target.selectionEnd = start + 1;

        // Trigger input event
        target.dispatchEvent(new Event('input', { bubbles: true }));
      }

      // Call onInput callback
      if (this.onInput) {
        this.onInput(insertChar);
      }

      // Dispatch event
      this.$dispatch('osk:input', { key: insertChar });

      // Reset shift (but not caps lock)
      if (this.shiftActive && !this.capsLock) {
        this.shiftActive = false;
      }
    },

    // Handle special keys
    handleSpecialKey(key) {
      const type = this.getSpecialKeyType(key);

      switch (type) {
        case 'shift':
          this.toggleShift();
          break;
        case 'backspace':
          this.handleBackspace();
          break;
        case 'enter':
          this.handleEnter();
          break;
        case 'space':
          this.insertCharacter(' ');
          break;
        case 'numbers':
          this.showNumbers = true;
          this.showSymbols = false;
          break;
        case 'symbols':
          this.showSymbols = true;
          break;
        case 'abc':
          this.showNumbers = false;
          this.showSymbols = false;
          break;
        case 'lang':
          this.showLangPicker = !this.showLangPicker;
          break;
      }
    },

    // Toggle shift
    toggleShift() {
      if (!this.shiftActive && !this.capsLock) {
        // First tap: enable shift
        this.shiftActive = true;
      } else if (this.shiftActive && !this.capsLock) {
        // Second tap: enable caps lock
        this.capsLock = true;
      } else {
        // Third tap: disable all
        this.shiftActive = false;
        this.capsLock = false;
      }
    },

    // Handle backspace
    handleBackspace() {
      const target = this.getTargetInput();
      if (target) {
        const start = target.selectionStart || 0;
        const end = target.selectionEnd || 0;
        const value = target.value || '';

        if (start === end && start > 0) {
          target.value = value.slice(0, start - 1) + value.slice(end);
          target.selectionStart = target.selectionEnd = start - 1;
        } else if (start !== end) {
          target.value = value.slice(0, start) + value.slice(end);
          target.selectionStart = target.selectionEnd = start;
        }

        target.dispatchEvent(new Event('input', { bubbles: true }));
      }

      this.$dispatch('osk:backspace');
    },

    // Handle enter
    handleEnter() {
      const target = this.getTargetInput();

      if (this.onEnter) {
        this.onEnter(target?.value);
      }

      this.$dispatch('osk:enter', { value: target?.value });
    },

    // Get target input element
    getTargetInput() {
      if (this.targetSelector) {
        return document.querySelector(this.targetSelector);
      }
      // Try to find focused input
      const active = document.activeElement;
      if (active && (active.tagName === 'INPUT' || active.tagName === 'TEXTAREA')) {
        return active;
      }
      return null;
    },

    // Select language
    selectLanguage(langCode) {
      this.loadLayout(langCode);
      this.showLangPicker = false;
    },

    // Get key class
    getKeyClass(key) {
      const classes = ['ux-onscreen-keyboard__key'];

      if (this.isSpecialKey(key)) {
        const type = this.getSpecialKeyType(key);
        classes.push('ux-onscreen-keyboard__key--special');
        classes.push('ux-onscreen-keyboard__key--' + type);

        if (type === 'shift') {
          if (this.shiftActive) classes.push('active');
          if (this.capsLock) classes.push('caps-lock');
        }
      }

      return classes.join(' ');
    },

    // Get special key content
    getSpecialKeyContent(key) {
      const type = this.getSpecialKeyType(key);

      switch (type) {
        case 'shift':
          return this.capsLock ? this.icons.shiftFilled : this.icons.shift;
        case 'backspace':
          return this.icons.backspace;
        case 'enter':
          return this.icons.enter;
        case 'space':
          return '';
        case 'numbers':
          return '123';
        case 'symbols':
          return '#+='
        case 'abc':
          return 'ABC';
        case 'lang':
          return this.icons.globe;
        default:
          return type;
      }
    },

    // Is special key content an icon
    isSpecialKeyIcon(key) {
      const type = this.getSpecialKeyType(key);
      return ['shift', 'backspace', 'enter', 'lang'].includes(type);
    }
  });

  // Register component
  if (window.UX) {
    window.UX.registerComponent('uxOnscreenKeyboard', onscreenKeyboardData);
    // Also expose layouts for external use
    window.UX.onscreenKeyboardLayouts = layouts;
  }
})();
