/**
 * UX Phone Input Component
 * International phone number input with country code selector
 * @requires ux-core.js
 */
(function() {
  'use strict';

  const styles = `
    /* ========================================
       UX Phone Input - Base
    ======================================== */

    .ux-phone {
      position: relative;
      display: flex;
      font-family: var(--ux-font-family);
    }

    /* ========================================
       Country Selector
    ======================================== */

    .ux-phone__country {
      display: flex;
      align-items: center;
      gap: 0.375rem;
      padding: 0 0.75rem;
      background: var(--ux-surface-secondary);
      border: var(--ux-input-border-width) solid var(--ux-border-color);
      border-right: none;
      border-radius: var(--ux-input-border-radius) 0 0 var(--ux-input-border-radius);
      cursor: pointer;
      transition: all var(--ux-transition-fast) var(--ux-ease);
      flex-shrink: 0;
    }

    .ux-phone__country:hover {
      background: var(--ux-surface-tertiary);
    }

    .ux-phone__flag {
      font-size: 1.25rem;
      line-height: 1;
    }

    .ux-phone__code {
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--ux-text);
      min-width: 2.5rem;
    }

    .ux-phone__arrow {
      width: 16px;
      height: 16px;
      color: var(--ux-text-secondary);
      transition: transform var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-phone--open .ux-phone__arrow {
      transform: rotate(180deg);
    }

    /* ========================================
       Input (uses .ux-input base styles)
    ======================================== */

    .ux-phone .ux-input {
      flex: 1;
      border-radius: 0 var(--ux-input-border-radius) var(--ux-input-border-radius) 0;
    }

    .ux-phone:focus-within .ux-phone__country {
      border-color: var(--ux-primary);
    }

    /* ========================================
       Dropdown
    ======================================== */

    .ux-phone__dropdown {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      margin-top: 4px;
      max-height: 300px;
      background: var(--ux-surface);
      border: 1px solid var(--ux-border-color);
      border-radius: var(--ux-radius-lg);
      box-shadow: var(--ux-shadow-lg);
      overflow: hidden;
      z-index: var(--ux-z-dropdown);
    }

    .ux-phone__search {
      padding: 0.75rem;
      border-bottom: 1px solid var(--ux-border-color);
    }

    .ux-phone__search-input {
      width: 100%;
      padding: 0.5rem 0.75rem;
      font-size: 0.875rem;
      font-family: inherit;
      color: var(--ux-text);
      background: var(--ux-surface-secondary);
      border: 1px solid var(--ux-border-color);
      border-radius: var(--ux-radius-md);
    }

    .ux-phone__search-input:focus {
      outline: none;
      border-color: var(--ux-primary);
    }

    .ux-phone__list {
      max-height: 240px;
      overflow-y: auto;
      padding: 0.5rem 0;
    }

    .ux-phone__option {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.625rem 1rem;
      cursor: pointer;
      transition: background var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-phone__option:hover {
      background: var(--ux-surface-secondary);
    }

    .ux-phone__option--selected {
      background: rgba(var(--ux-primary-rgb), 0.1);
    }

    .ux-phone__option-flag {
      font-size: 1.25rem;
    }

    .ux-phone__option-name {
      flex: 1;
      font-size: 0.875rem;
      color: var(--ux-text);
    }

    .ux-phone__option-code {
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--ux-text-secondary);
    }

    /* ========================================
       Size Variants
    ======================================== */

    /* Small */
    .ux-phone--sm .ux-phone__country {
      padding: 0 0.5rem;
    }

    .ux-phone--sm .ux-phone__flag {
      font-size: 1rem;
    }

    .ux-phone--sm .ux-phone__code {
      font-size: 0.75rem;
    }

    .ux-phone--sm .ux-input {
      height: var(--ux-input-height-sm);
      font-size: var(--ux-font-size-sm);
    }

    /* Large */
    .ux-phone--lg .ux-phone__country {
      padding: 0 1rem;
    }

    .ux-phone--lg .ux-phone__flag {
      font-size: 1.5rem;
    }

    .ux-phone--lg .ux-phone__code {
      font-size: 1rem;
    }

    .ux-phone--lg .ux-input {
      height: var(--ux-input-height-lg);
      font-size: var(--ux-font-size-lg);
    }

    /* ========================================
       States
    ======================================== */

    /* Error */
    .ux-phone--error .ux-phone__country,
    .ux-phone--error .ux-input {
      border-color: var(--ux-danger);
    }

    .ux-phone--error .ux-input:focus {
      box-shadow: 0 0 0 3px rgba(var(--ux-danger-rgb), 0.15);
    }

    /* Success */
    .ux-phone--success .ux-phone__country,
    .ux-phone--success .ux-input {
      border-color: var(--ux-success);
    }

    .ux-phone--success .ux-input:focus {
      box-shadow: 0 0 0 3px rgba(var(--ux-success-rgb), 0.15);
    }

    /* Disabled */
    .ux-phone--disabled .ux-phone__country {
      opacity: 0.6;
      cursor: not-allowed;
      pointer-events: none;
    }

    /* ========================================
       Glass Variant
    ======================================== */

    .ux-phone--glass .ux-phone__country,
    .ux-phone--glass .ux-input {
      background: var(--ux-glass-bg-thin);
      backdrop-filter: blur(var(--ux-glass-blur)) saturate(var(--ux-glass-saturation));
      -webkit-backdrop-filter: blur(var(--ux-glass-blur)) saturate(var(--ux-glass-saturation));
      border-color: var(--ux-glass-border);
    }

    .ux-phone--glass .ux-input:hover {
      background: var(--ux-glass-bg);
    }

    .ux-phone--glass .ux-input:focus {
      background: var(--ux-glass-bg);
      box-shadow: var(--ux-glass-highlight);
    }

    .ux-phone--glass .ux-phone__dropdown {
      background: var(--ux-glass-bg-thick);
      backdrop-filter: blur(var(--ux-glass-blur)) saturate(var(--ux-glass-saturation));
      -webkit-backdrop-filter: blur(var(--ux-glass-blur)) saturate(var(--ux-glass-saturation));
      border-color: var(--ux-glass-border);
    }

    /* ========================================
       Field Wrapper
    ======================================== */

    .ux-phone-field {
      display: flex;
      flex-direction: column;
      gap: var(--ux-space-xs);
    }

    .ux-phone-field__label {
      font-size: var(--ux-font-size-sm);
      font-weight: 500;
      color: var(--ux-text);
    }

    .ux-phone-field__helper {
      font-size: var(--ux-font-size-xs);
      color: var(--ux-text-secondary);
    }

    .ux-phone-field__helper--error {
      color: var(--ux-danger);
    }

    /* ========================================
       Dark Mode
    ======================================== */

    @media (prefers-color-scheme: dark) {
      .ux-phone__country {
        background: var(--ux-surface-secondary);
      }

      .ux-phone__dropdown {
        background: var(--ux-surface);
      }
    }

    .ux-dark .ux-phone__country {
      background: var(--ux-surface-secondary);
    }

    .ux-dark .ux-phone__dropdown {
      background: var(--ux-surface);
    }

    /* ========================================
       Reduced Motion
    ======================================== */

    @media (prefers-reduced-motion: reduce) {
      .ux-phone__country,
      .ux-phone__arrow,
      .ux-phone__option {
        transition: none;
      }
    }
  `;

  // Inject styles
  if (window.UX) {
    window.UX.injectStyles('ux-phone-input-styles', styles);
  } else {
    const styleEl = document.createElement('style');
    styleEl.id = 'ux-phone-input-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }

  // Country data with dial codes and flags
  const countries = [
    { code: 'ES', name: 'España', dial: '+34', flag: '🇪🇸' },
    { code: 'US', name: 'Estados Unidos', dial: '+1', flag: '🇺🇸' },
    { code: 'MX', name: 'México', dial: '+52', flag: '🇲🇽' },
    { code: 'AR', name: 'Argentina', dial: '+54', flag: '🇦🇷' },
    { code: 'CO', name: 'Colombia', dial: '+57', flag: '🇨🇴' },
    { code: 'CL', name: 'Chile', dial: '+56', flag: '🇨🇱' },
    { code: 'PE', name: 'Perú', dial: '+51', flag: '🇵🇪' },
    { code: 'VE', name: 'Venezuela', dial: '+58', flag: '🇻🇪' },
    { code: 'EC', name: 'Ecuador', dial: '+593', flag: '🇪🇨' },
    { code: 'BO', name: 'Bolivia', dial: '+591', flag: '🇧🇴' },
    { code: 'UY', name: 'Uruguay', dial: '+598', flag: '🇺🇾' },
    { code: 'PY', name: 'Paraguay', dial: '+595', flag: '🇵🇾' },
    { code: 'BR', name: 'Brasil', dial: '+55', flag: '🇧🇷' },
    { code: 'PT', name: 'Portugal', dial: '+351', flag: '🇵🇹' },
    { code: 'FR', name: 'Francia', dial: '+33', flag: '🇫🇷' },
    { code: 'DE', name: 'Alemania', dial: '+49', flag: '🇩🇪' },
    { code: 'IT', name: 'Italia', dial: '+39', flag: '🇮🇹' },
    { code: 'GB', name: 'Reino Unido', dial: '+44', flag: '🇬🇧' },
    { code: 'NL', name: 'Países Bajos', dial: '+31', flag: '🇳🇱' },
    { code: 'BE', name: 'Bélgica', dial: '+32', flag: '🇧🇪' },
    { code: 'CH', name: 'Suiza', dial: '+41', flag: '🇨🇭' },
    { code: 'AT', name: 'Austria', dial: '+43', flag: '🇦🇹' },
    { code: 'PL', name: 'Polonia', dial: '+48', flag: '🇵🇱' },
    { code: 'SE', name: 'Suecia', dial: '+46', flag: '🇸🇪' },
    { code: 'NO', name: 'Noruega', dial: '+47', flag: '🇳🇴' },
    { code: 'DK', name: 'Dinamarca', dial: '+45', flag: '🇩🇰' },
    { code: 'FI', name: 'Finlandia', dial: '+358', flag: '🇫🇮' },
    { code: 'IE', name: 'Irlanda', dial: '+353', flag: '🇮🇪' },
    { code: 'GR', name: 'Grecia', dial: '+30', flag: '🇬🇷' },
    { code: 'RU', name: 'Rusia', dial: '+7', flag: '🇷🇺' },
    { code: 'CN', name: 'China', dial: '+86', flag: '🇨🇳' },
    { code: 'JP', name: 'Japón', dial: '+81', flag: '🇯🇵' },
    { code: 'KR', name: 'Corea del Sur', dial: '+82', flag: '🇰🇷' },
    { code: 'IN', name: 'India', dial: '+91', flag: '🇮🇳' },
    { code: 'AU', name: 'Australia', dial: '+61', flag: '🇦🇺' },
    { code: 'NZ', name: 'Nueva Zelanda', dial: '+64', flag: '🇳🇿' },
    { code: 'CA', name: 'Canadá', dial: '+1', flag: '🇨🇦' },
    { code: 'ZA', name: 'Sudáfrica', dial: '+27', flag: '🇿🇦' },
    { code: 'AE', name: 'Emiratos Árabes', dial: '+971', flag: '🇦🇪' },
    { code: 'SA', name: 'Arabia Saudita', dial: '+966', flag: '🇸🇦' },
    { code: 'IL', name: 'Israel', dial: '+972', flag: '🇮🇱' },
    { code: 'TR', name: 'Turquía', dial: '+90', flag: '🇹🇷' },
    { code: 'EG', name: 'Egipto', dial: '+20', flag: '🇪🇬' },
    { code: 'MA', name: 'Marruecos', dial: '+212', flag: '🇲🇦' },
    { code: 'NG', name: 'Nigeria', dial: '+234', flag: '🇳🇬' },
    { code: 'KE', name: 'Kenia', dial: '+254', flag: '🇰🇪' },
    { code: 'TH', name: 'Tailandia', dial: '+66', flag: '🇹🇭' },
    { code: 'SG', name: 'Singapur', dial: '+65', flag: '🇸🇬' },
    { code: 'MY', name: 'Malasia', dial: '+60', flag: '🇲🇾' },
    { code: 'ID', name: 'Indonesia', dial: '+62', flag: '🇮🇩' },
    { code: 'PH', name: 'Filipinas', dial: '+63', flag: '🇵🇭' },
    { code: 'VN', name: 'Vietnam', dial: '+84', flag: '🇻🇳' }
  ];

  // Arrow icon
  const arrowIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>';

  // Alpine.js component for phone input
  const phoneInputData = (options = {}) => ({
    // Configuration
    defaultCountry: options.defaultCountry || 'ES',
    preferredCountries: options.preferredCountries || ['ES', 'US', 'MX', 'AR', 'CO'],
    placeholder: options.placeholder || '600 000 000',
    searchable: options.searchable ?? true,
    showFlags: options.showFlags ?? true,
    showDialCode: options.showDialCode ?? true,

    // State
    isOpen: false,
    searchQuery: '',
    selectedCountry: null,
    phoneNumber: options.value || '',
    disabled: options.disabled || false,
    arrowIcon,

    // Data
    countries,

    init() {
      // Set default country
      this.selectedCountry = this.countries.find(c => c.code === this.defaultCountry) || this.countries[0];

      // Parse initial value if includes dial code
      if (options.value && options.value.startsWith('+')) {
        this.parseFullNumber(options.value);
      }
    },

    // Get sorted countries (preferred first)
    get sortedCountries() {
      const preferred = this.preferredCountries
        .map(code => this.countries.find(c => c.code === code))
        .filter(Boolean);

      const rest = this.countries.filter(c => !this.preferredCountries.includes(c.code));

      return [...preferred, ...rest];
    },

    // Get filtered countries
    get filteredCountries() {
      if (!this.searchQuery) return this.sortedCountries;

      const query = this.searchQuery.toLowerCase();
      return this.sortedCountries.filter(country =>
        country.name.toLowerCase().includes(query) ||
        country.code.toLowerCase().includes(query) ||
        country.dial.includes(query)
      );
    },

    // Toggle dropdown
    toggle() {
      if (this.disabled) return;
      this.isOpen = !this.isOpen;

      if (this.isOpen) {
        this.searchQuery = '';
        this.$nextTick(() => {
          const searchInput = this.$refs.searchInput;
          if (searchInput) searchInput.focus();
        });
      }
    },

    // Open dropdown
    open() {
      if (this.disabled) return;
      this.isOpen = true;
      this.searchQuery = '';
    },

    // Close dropdown
    close() {
      this.isOpen = false;
      this.searchQuery = '';
    },

    // Select country
    selectCountry(country) {
      this.selectedCountry = country;
      this.isOpen = false;
      this.searchQuery = '';

      this.$dispatch('phone:countrychange', { country });
      this.dispatchChange();

      // Focus input after selection
      this.$nextTick(() => {
        this.$refs.phoneInput?.focus();
      });
    },

    // Handle phone input
    onPhoneInput(event) {
      let value = event.target.value;

      // Remove non-numeric characters except spaces and dashes
      value = value.replace(/[^\d\s\-]/g, '');

      this.phoneNumber = value;
      this.dispatchChange();
    },

    // Handle keydown for dropdown navigation
    onKeyDown(event) {
      if (event.key === 'Escape') {
        this.close();
      }
    },

    // Parse full number with dial code
    parseFullNumber(fullNumber) {
      // Find matching country by dial code
      const sorted = [...this.countries].sort((a, b) => b.dial.length - a.dial.length);

      for (const country of sorted) {
        if (fullNumber.startsWith(country.dial)) {
          this.selectedCountry = country;
          this.phoneNumber = fullNumber.slice(country.dial.length).trim();
          return;
        }
      }
    },

    // Get full phone number
    getFullNumber() {
      const number = this.phoneNumber.replace(/[\s\-]/g, '');
      if (!number) return '';
      return `${this.selectedCountry.dial}${number}`;
    },

    // Get formatted display
    getFormattedNumber() {
      return `${this.selectedCountry.dial} ${this.phoneNumber}`;
    },

    // Validate basic format
    isValid() {
      const number = this.phoneNumber.replace(/[\s\-]/g, '');
      return number.length >= 6 && number.length <= 15;
    },

    // Clear
    clear() {
      this.phoneNumber = '';
      this.dispatchChange();
    },

    // Set value
    setValue(value, countryCode) {
      if (countryCode) {
        const country = this.countries.find(c => c.code === countryCode);
        if (country) this.selectedCountry = country;
      }

      if (value.startsWith('+')) {
        this.parseFullNumber(value);
      } else {
        this.phoneNumber = value;
      }

      this.dispatchChange();
    },

    // Dispatch change event
    dispatchChange() {
      this.$dispatch('phone:change', {
        number: this.phoneNumber,
        fullNumber: this.getFullNumber(),
        country: this.selectedCountry,
        isValid: this.isValid()
      });
    }
  });

  // Register component
  if (window.UX) {
    window.UX.registerComponent('uxPhoneInput', phoneInputData);
  }

  // Also expose countries list
  if (window.UX) {
    window.UX.phoneCountries = countries;
  }

})();
