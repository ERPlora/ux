/**
 * UX Audio Player Component
 * Reproductor de audio con controles completos, visualizacion y playlist
 * @requires ux-core.js
 */
(function() {
  'use strict';

  const styles = `
    /* ========================================
       UX Audio Player Container
    ======================================== */

    :root {
      --ux-audio-player-height: auto;
      --ux-audio-player-padding: var(--ux-space-md);
      --ux-audio-player-border-radius: var(--ux-radius-lg, 12px);
      --ux-audio-player-bg: var(--ux-surface);
      --ux-audio-player-progress-height: 4px;
      --ux-audio-player-progress-bg: var(--ux-medium);
      --ux-audio-player-progress-fill: var(--ux-primary);
      --ux-audio-player-waveform-height: 48px;
      --ux-audio-player-thumb-size: 14px;
    }

    .ux-audio-player {
      position: relative;
      display: flex;
      flex-direction: column;
      width: 100%;
      padding: var(--ux-audio-player-padding);
      background: var(--ux-audio-player-bg);
      border-radius: var(--ux-audio-player-border-radius);
      border: 1px solid var(--ux-border-color);
      box-shadow: var(--ux-shadow-sm);
    }

    /* ========================================
       Track Info Section
    ======================================== */

    .ux-audio-player__info {
      display: flex;
      align-items: center;
      gap: var(--ux-space-md);
      margin-bottom: var(--ux-space-md);
    }

    .ux-audio-player__artwork {
      flex-shrink: 0;
      width: 64px;
      height: 64px;
      border-radius: var(--ux-radius-md, 8px);
      background: var(--ux-surface-secondary);
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .ux-audio-player__artwork img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .ux-audio-player__artwork svg {
      width: 32px;
      height: 32px;
      color: var(--ux-text-tertiary);
    }

    .ux-audio-player__meta {
      flex: 1;
      min-width: 0;
    }

    .ux-audio-player__title {
      font-size: var(--ux-font-size-md);
      font-weight: 600;
      color: var(--ux-text);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      margin: 0 0 var(--ux-space-xs) 0;
    }

    .ux-audio-player__artist {
      font-size: var(--ux-font-size-sm);
      color: var(--ux-text-secondary);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      margin: 0;
    }

    /* ========================================
       Waveform Visualization
    ======================================== */

    .ux-audio-player__waveform {
      position: relative;
      width: 100%;
      height: var(--ux-audio-player-waveform-height);
      margin-bottom: var(--ux-space-md);
      cursor: pointer;
      border-radius: var(--ux-radius-sm, 4px);
      overflow: hidden;
    }

    .ux-audio-player__waveform canvas {
      width: 100%;
      height: 100%;
      display: block;
    }

    .ux-audio-player__waveform-overlay {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      background: var(--ux-primary);
      opacity: 0.3;
      pointer-events: none;
      transition: width 0.05s linear;
    }

    /* ========================================
       Progress Bar
    ======================================== */

    .ux-audio-player__progress {
      position: relative;
      width: 100%;
      height: var(--ux-audio-player-progress-height);
      margin-bottom: var(--ux-space-sm);
      cursor: pointer;
    }

    .ux-audio-player__progress-track {
      position: absolute;
      width: 100%;
      height: 100%;
      background: var(--ux-audio-player-progress-bg);
      border-radius: calc(var(--ux-audio-player-progress-height) / 2);
      overflow: hidden;
    }

    .ux-audio-player__progress-fill {
      position: absolute;
      height: 100%;
      background: var(--ux-audio-player-progress-fill);
      border-radius: calc(var(--ux-audio-player-progress-height) / 2);
      transition: width 0.05s linear;
    }

    .ux-audio-player__progress-buffer {
      position: absolute;
      height: 100%;
      background: var(--ux-audio-player-progress-bg);
      opacity: 0.5;
      border-radius: calc(var(--ux-audio-player-progress-height) / 2);
    }

    .ux-audio-player__progress-thumb {
      position: absolute;
      top: 50%;
      width: var(--ux-audio-player-thumb-size);
      height: var(--ux-audio-player-thumb-size);
      background: white;
      border-radius: 50%;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
      transform: translate(-50%, -50%);
      opacity: 0;
      transition:
        opacity var(--ux-transition-fast) var(--ux-ease),
        transform var(--ux-transition-fast) var(--ux-ease);
      z-index: 1;
    }

    .ux-audio-player__progress:hover .ux-audio-player__progress-thumb,
    .ux-audio-player__progress:active .ux-audio-player__progress-thumb {
      opacity: 1;
    }

    .ux-audio-player__progress:active .ux-audio-player__progress-thumb {
      transform: translate(-50%, -50%) scale(1.2);
    }

    /* ========================================
       Time Display
    ======================================== */

    .ux-audio-player__time {
      display: flex;
      justify-content: space-between;
      font-size: var(--ux-font-size-xs);
      color: var(--ux-text-tertiary);
      font-variant-numeric: tabular-nums;
      margin-bottom: var(--ux-space-md);
    }

    .ux-audio-player__time-current,
    .ux-audio-player__time-duration {
      min-width: 40px;
    }

    .ux-audio-player__time-current {
      text-align: left;
    }

    .ux-audio-player__time-duration {
      text-align: right;
    }

    /* ========================================
       Controls
    ======================================== */

    .ux-audio-player__controls {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: var(--ux-space-sm);
    }

    .ux-audio-player__btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 44px;
      height: 44px;
      padding: 0;
      border: none;
      background: transparent;
      color: var(--ux-text);
      border-radius: 50%;
      cursor: pointer;
      transition:
        background-color var(--ux-transition-fast) var(--ux-ease),
        transform var(--ux-transition-fast) var(--ux-ease),
        color var(--ux-transition-fast) var(--ux-ease);
      -webkit-tap-highlight-color: transparent;
    }

    .ux-audio-player__btn:hover {
      background: var(--ux-surface-secondary);
    }

    .ux-audio-player__btn:active {
      transform: scale(0.95);
    }

    .ux-audio-player__btn:disabled {
      opacity: 0.4;
      cursor: not-allowed;
      pointer-events: none;
    }

    .ux-audio-player__btn svg {
      width: 24px;
      height: 24px;
    }

    .ux-audio-player__btn--sm {
      width: 36px;
      height: 36px;
    }

    .ux-audio-player__btn--sm svg {
      width: 20px;
      height: 20px;
    }

    .ux-audio-player__btn--play {
      width: 56px;
      height: 56px;
      background: var(--ux-primary);
      color: var(--ux-primary-contrast, white);
    }

    .ux-audio-player__btn--play:hover {
      background: var(--ux-primary-shade);
    }

    .ux-audio-player__btn--play svg {
      width: 28px;
      height: 28px;
    }

    /* ========================================
       Secondary Controls (Volume, Speed)
    ======================================== */

    .ux-audio-player__secondary {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: var(--ux-space-md);
      padding-top: var(--ux-space-md);
      border-top: 1px solid var(--ux-border-color);
    }

    .ux-audio-player__volume {
      display: flex;
      align-items: center;
      gap: var(--ux-space-xs);
      flex: 1;
      max-width: 150px;
    }

    .ux-audio-player__volume-slider {
      flex: 1;
      height: 4px;
      background: var(--ux-medium);
      border-radius: 2px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }

    .ux-audio-player__volume-fill {
      position: absolute;
      height: 100%;
      background: var(--ux-text-secondary);
      border-radius: 2px;
      transition: width 0.05s linear;
    }

    .ux-audio-player__volume-input {
      position: absolute;
      width: 100%;
      height: 100%;
      margin: 0;
      opacity: 0;
      cursor: pointer;
      -webkit-appearance: none;
    }

    .ux-audio-player__speed {
      display: flex;
      align-items: center;
      gap: var(--ux-space-xs);
    }

    .ux-audio-player__speed-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      min-width: 48px;
      height: 32px;
      padding: 0 var(--ux-space-sm);
      border: 1px solid var(--ux-border-color);
      background: var(--ux-surface);
      color: var(--ux-text-secondary);
      font-size: var(--ux-font-size-xs);
      font-weight: 500;
      border-radius: var(--ux-radius-sm, 4px);
      cursor: pointer;
      transition:
        background-color var(--ux-transition-fast) var(--ux-ease),
        border-color var(--ux-transition-fast) var(--ux-ease);
      -webkit-tap-highlight-color: transparent;
    }

    .ux-audio-player__speed-btn:hover {
      background: var(--ux-surface-secondary);
    }

    .ux-audio-player__speed-btn--active {
      background: var(--ux-primary);
      border-color: var(--ux-primary);
      color: var(--ux-primary-contrast, white);
    }

    /* ========================================
       Playlist
    ======================================== */

    .ux-audio-player__playlist {
      margin-top: var(--ux-space-md);
      padding-top: var(--ux-space-md);
      border-top: 1px solid var(--ux-border-color);
      max-height: 200px;
      overflow-y: auto;
    }

    .ux-audio-player__playlist-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: var(--ux-space-sm);
    }

    .ux-audio-player__playlist-title {
      font-size: var(--ux-font-size-sm);
      font-weight: 600;
      color: var(--ux-text);
      margin: 0;
    }

    .ux-audio-player__playlist-count {
      font-size: var(--ux-font-size-xs);
      color: var(--ux-text-tertiary);
    }

    .ux-audio-player__playlist-item {
      display: flex;
      align-items: center;
      gap: var(--ux-space-sm);
      padding: var(--ux-space-sm);
      border-radius: var(--ux-radius-sm, 4px);
      cursor: pointer;
      transition: background-color var(--ux-transition-fast) var(--ux-ease);
      -webkit-tap-highlight-color: transparent;
    }

    .ux-audio-player__playlist-item:hover {
      background: var(--ux-surface-secondary);
    }

    .ux-audio-player__playlist-item--active {
      background: var(--ux-primary);
      color: var(--ux-primary-contrast, white);
    }

    .ux-audio-player__playlist-item--active:hover {
      background: var(--ux-primary-shade);
    }

    .ux-audio-player__playlist-item-index {
      width: 24px;
      font-size: var(--ux-font-size-xs);
      color: var(--ux-text-tertiary);
      text-align: center;
    }

    .ux-audio-player__playlist-item--active .ux-audio-player__playlist-item-index {
      color: inherit;
    }

    .ux-audio-player__playlist-item-info {
      flex: 1;
      min-width: 0;
    }

    .ux-audio-player__playlist-item-title {
      font-size: var(--ux-font-size-sm);
      font-weight: 500;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .ux-audio-player__playlist-item-duration {
      font-size: var(--ux-font-size-xs);
      color: var(--ux-text-tertiary);
    }

    .ux-audio-player__playlist-item--active .ux-audio-player__playlist-item-duration {
      color: inherit;
      opacity: 0.8;
    }

    /* ========================================
       Mini Player Variant
    ======================================== */

    .ux-audio-player--mini {
      flex-direction: row;
      align-items: center;
      padding: var(--ux-space-sm) var(--ux-space-md);
      gap: var(--ux-space-md);
    }

    .ux-audio-player--mini .ux-audio-player__artwork {
      width: 48px;
      height: 48px;
    }

    .ux-audio-player--mini .ux-audio-player__info {
      margin-bottom: 0;
      flex: 1;
      min-width: 0;
    }

    .ux-audio-player--mini .ux-audio-player__meta {
      display: flex;
      flex-direction: column;
    }

    .ux-audio-player--mini .ux-audio-player__title {
      font-size: var(--ux-font-size-sm);
    }

    .ux-audio-player--mini .ux-audio-player__artist {
      font-size: var(--ux-font-size-xs);
    }

    .ux-audio-player--mini .ux-audio-player__progress,
    .ux-audio-player--mini .ux-audio-player__time,
    .ux-audio-player--mini .ux-audio-player__secondary,
    .ux-audio-player--mini .ux-audio-player__waveform,
    .ux-audio-player--mini .ux-audio-player__playlist {
      display: none;
    }

    .ux-audio-player--mini .ux-audio-player__controls {
      margin: 0;
      gap: var(--ux-space-xs);
    }

    .ux-audio-player--mini .ux-audio-player__btn--play {
      width: 44px;
      height: 44px;
    }

    .ux-audio-player--mini .ux-audio-player__btn--play svg {
      width: 22px;
      height: 22px;
    }

    /* Mini progress bar below */
    .ux-audio-player--mini .ux-audio-player__mini-progress {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 3px;
      background: var(--ux-medium);
    }

    .ux-audio-player--mini .ux-audio-player__mini-progress-fill {
      height: 100%;
      background: var(--ux-primary);
      transition: width 0.1s linear;
    }

    /* ========================================
       Compact Variant
    ======================================== */

    .ux-audio-player--compact {
      padding: var(--ux-space-sm) var(--ux-space-md);
    }

    .ux-audio-player--compact .ux-audio-player__info {
      margin-bottom: var(--ux-space-sm);
    }

    .ux-audio-player--compact .ux-audio-player__artwork {
      width: 48px;
      height: 48px;
    }

    .ux-audio-player--compact .ux-audio-player__secondary {
      display: none;
    }

    /* ========================================
       Loading State
    ======================================== */

    .ux-audio-player--loading .ux-audio-player__btn--play {
      position: relative;
      color: transparent;
    }

    .ux-audio-player--loading .ux-audio-player__btn--play::after {
      content: '';
      position: absolute;
      width: 24px;
      height: 24px;
      border: 2px solid var(--ux-primary-contrast, white);
      border-top-color: transparent;
      border-radius: 50%;
      animation: ux-audio-player-spin 0.8s linear infinite;
    }

    @keyframes ux-audio-player-spin {
      to { transform: rotate(360deg); }
    }

    /* ========================================
       Error State
    ======================================== */

    .ux-audio-player--error {
      border-color: var(--ux-danger);
    }

    .ux-audio-player__error {
      display: flex;
      align-items: center;
      gap: var(--ux-space-sm);
      padding: var(--ux-space-sm);
      background: rgba(var(--ux-danger-rgb, 239, 68, 68), 0.1);
      border-radius: var(--ux-radius-sm, 4px);
      color: var(--ux-danger);
      font-size: var(--ux-font-size-sm);
      margin-bottom: var(--ux-space-md);
    }

    .ux-audio-player__error svg {
      width: 20px;
      height: 20px;
      flex-shrink: 0;
    }

    /* ========================================
       Glass Variant (iOS 26 Liquid Glass)
    ======================================== */

    .ux-audio-player--glass {
      background: var(--ux-glass-bg);
      backdrop-filter: blur(var(--ux-glass-blur)) saturate(var(--ux-glass-saturation));
      -webkit-backdrop-filter: blur(var(--ux-glass-blur)) saturate(var(--ux-glass-saturation));
      border: 0.5px solid var(--ux-glass-border);
      box-shadow: var(--ux-glass-shadow);
    }

    .ux-audio-player--glass .ux-audio-player__secondary,
    .ux-audio-player--glass .ux-audio-player__playlist {
      border-top-color: var(--ux-glass-border);
    }

    .ux-audio-player--glass .ux-audio-player__speed-btn {
      background: var(--ux-glass-bg-thin);
      border-color: var(--ux-glass-border);
    }

    .ux-audio-player--glass .ux-audio-player__speed-btn:hover {
      background: var(--ux-glass-bg);
    }

    /* ========================================
       Dark Mode
    ======================================== */

    @media (prefers-color-scheme: dark) {
      .ux-audio-player {
        --ux-audio-player-bg: var(--ux-surface);
      }

      .ux-audio-player__progress-thumb {
        background: var(--ux-text);
      }
    }

    .ux-dark .ux-audio-player {
      --ux-audio-player-bg: var(--ux-surface);
    }

    .ux-dark .ux-audio-player__progress-thumb {
      background: var(--ux-text);
    }

    /* ========================================
       Reduced Motion
    ======================================== */

    @media (prefers-reduced-motion: reduce) {
      .ux-audio-player__progress-fill,
      .ux-audio-player__progress-thumb,
      .ux-audio-player__volume-fill,
      .ux-audio-player__btn,
      .ux-audio-player__waveform-overlay {
        transition: none;
      }

      .ux-audio-player--loading .ux-audio-player__btn--play::after {
        animation: none;
      }
    }

    /* ========================================
       Responsive
    ======================================== */

    @media (max-width: 767px) {
      .ux-audio-player__secondary {
        flex-direction: column;
        gap: var(--ux-space-md);
      }

      .ux-audio-player__volume {
        max-width: 100%;
        width: 100%;
      }
    }
  `;

  // Inject styles
  if (window.UX) {
    window.UX.injectStyles('ux-audio-player-styles', styles);
  } else {
    const styleEl = document.createElement('style');
    styleEl.id = 'ux-audio-player-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }

  // Alpine component
  const audioPlayerComponent = (config = {}) => ({
    // State
    isPlaying: false,
    isLoading: false,
    hasError: false,
    errorMessage: '',
    currentTime: 0,
    duration: 0,
    volume: config.volume ?? 1,
    isMuted: false,
    previousVolume: 1,
    playbackRate: config.playbackRate ?? 1,
    buffered: 0,

    // Track info
    src: config.src || '',
    title: config.title || 'Unknown Track',
    artist: config.artist || 'Unknown Artist',
    artwork: config.artwork || '',

    // Playlist
    playlist: config.playlist || [],
    currentTrackIndex: config.startIndex ?? 0,
    shuffle: config.shuffle ?? false,
    repeat: config.repeat ?? 'none', // 'none', 'one', 'all'

    // Waveform
    showWaveform: config.showWaveform ?? false,
    waveformData: [],
    _waveformCanvas: null,
    _waveformCtx: null,

    // Internal
    _audio: null,
    _rafId: null,
    _seekingFromProgress: false,

    // Playback speed options
    speedOptions: [0.5, 0.75, 1, 1.25, 1.5, 2],

    // Computed
    get progress() {
      return this.duration > 0 ? (this.currentTime / this.duration) * 100 : 0;
    },

    get currentTimeFormatted() {
      return this.formatTime(this.currentTime);
    },

    get durationFormatted() {
      return this.formatTime(this.duration);
    },

    get volumePercent() {
      return this.isMuted ? 0 : this.volume * 100;
    },

    get currentTrack() {
      if (this.playlist.length > 0) {
        return this.playlist[this.currentTrackIndex] || {};
      }
      return {
        src: this.src,
        title: this.title,
        artist: this.artist,
        artwork: this.artwork
      };
    },

    get hasPlaylist() {
      return this.playlist.length > 1;
    },

    get canPrev() {
      return this.currentTrackIndex > 0 || this.repeat === 'all';
    },

    get canNext() {
      return this.currentTrackIndex < this.playlist.length - 1 || this.repeat === 'all';
    },

    // ARIA attributes
    get ariaLabel() {
      return `Audio player: ${this.currentTrack.title || this.title}`;
    },

    // Methods
    init() {
      this._audio = new Audio();
      this._audio.preload = 'metadata';

      // Set initial volume
      this._audio.volume = this.volume;
      this._audio.playbackRate = this.playbackRate;

      // Event listeners
      this._audio.addEventListener('loadstart', () => {
        this.isLoading = true;
        this.hasError = false;
      });

      this._audio.addEventListener('loadedmetadata', () => {
        this.duration = this._audio.duration;
        this.isLoading = false;
      });

      this._audio.addEventListener('canplay', () => {
        this.isLoading = false;
      });

      this._audio.addEventListener('play', () => {
        this.isPlaying = true;
        this._startProgressLoop();
        this.$dispatch('ux-audio-player:play', { track: this.currentTrack });
      });

      this._audio.addEventListener('pause', () => {
        this.isPlaying = false;
        this._stopProgressLoop();
        this.$dispatch('ux-audio-player:pause', { track: this.currentTrack });
      });

      this._audio.addEventListener('ended', () => {
        this.isPlaying = false;
        this._stopProgressLoop();
        this._handleTrackEnd();
        this.$dispatch('ux-audio-player:ended', { track: this.currentTrack });
      });

      this._audio.addEventListener('timeupdate', () => {
        if (!this._seekingFromProgress) {
          this.currentTime = this._audio.currentTime;
        }
      });

      this._audio.addEventListener('progress', () => {
        this._updateBuffered();
      });

      this._audio.addEventListener('error', (e) => {
        this.isLoading = false;
        this.hasError = true;
        this.errorMessage = this._getErrorMessage(this._audio.error);
        this.$dispatch('ux-audio-player:error', { error: this._audio.error });
      });

      // Initialize waveform if enabled
      if (this.showWaveform) {
        this.$nextTick(() => {
          this._initWaveform();
        });
      }

      // Load initial track
      this._loadTrack();
    },

    destroy() {
      this._stopProgressLoop();
      if (this._audio) {
        this._audio.pause();
        this._audio.src = '';
        this._audio = null;
      }
    },

    // Playback controls
    play() {
      if (this._audio && this._audio.src) {
        this._audio.play().catch(err => {
          console.error('Play failed:', err);
        });
      }
    },

    pause() {
      if (this._audio) {
        this._audio.pause();
      }
    },

    toggle() {
      if (this.isPlaying) {
        this.pause();
      } else {
        this.play();
      }
    },

    stop() {
      if (this._audio) {
        this._audio.pause();
        this._audio.currentTime = 0;
        this.currentTime = 0;
      }
    },

    // Seeking
    seek(time) {
      if (this._audio && this.duration > 0) {
        const newTime = Math.max(0, Math.min(time, this.duration));
        this._audio.currentTime = newTime;
        this.currentTime = newTime;
        this.$dispatch('ux-audio-player:seek', { time: newTime });
      }
    },

    seekPercent(percent) {
      const time = (percent / 100) * this.duration;
      this.seek(time);
    },

    seekForward(seconds = 10) {
      this.seek(this.currentTime + seconds);
    },

    seekBackward(seconds = 10) {
      this.seek(this.currentTime - seconds);
    },

    // Progress bar interaction
    onProgressClick(event) {
      const rect = event.currentTarget.getBoundingClientRect();
      const percent = ((event.clientX - rect.left) / rect.width) * 100;
      this.seekPercent(percent);
    },

    onProgressDrag(event) {
      this._seekingFromProgress = true;
      const rect = event.currentTarget.getBoundingClientRect();
      const percent = Math.max(0, Math.min(100, ((event.clientX - rect.left) / rect.width) * 100));
      this.currentTime = (percent / 100) * this.duration;
    },

    onProgressDragEnd() {
      if (this._seekingFromProgress) {
        this.seek(this.currentTime);
        this._seekingFromProgress = false;
      }
    },

    // Volume controls
    setVolume(value) {
      this.volume = Math.max(0, Math.min(1, value));
      if (this._audio) {
        this._audio.volume = this.volume;
      }
      if (this.volume > 0) {
        this.isMuted = false;
      }
      this.$dispatch('ux-audio-player:volume', { volume: this.volume });
    },

    toggleMute() {
      if (this.isMuted) {
        this.isMuted = false;
        this.setVolume(this.previousVolume || 1);
      } else {
        this.previousVolume = this.volume;
        this.isMuted = true;
        if (this._audio) {
          this._audio.volume = 0;
        }
      }
    },

    onVolumeInput(event) {
      this.setVolume(parseFloat(event.target.value));
    },

    // Playback speed
    setPlaybackRate(rate) {
      this.playbackRate = rate;
      if (this._audio) {
        this._audio.playbackRate = rate;
      }
      this.$dispatch('ux-audio-player:speed', { rate });
    },

    cyclePlaybackRate() {
      const currentIndex = this.speedOptions.indexOf(this.playbackRate);
      const nextIndex = (currentIndex + 1) % this.speedOptions.length;
      this.setPlaybackRate(this.speedOptions[nextIndex]);
    },

    // Playlist controls
    playTrack(index) {
      if (index >= 0 && index < this.playlist.length) {
        this.currentTrackIndex = index;
        this._loadTrack();
        this.play();
      }
    },

    nextTrack() {
      if (this.shuffle) {
        const randomIndex = Math.floor(Math.random() * this.playlist.length);
        this.playTrack(randomIndex);
      } else if (this.currentTrackIndex < this.playlist.length - 1) {
        this.playTrack(this.currentTrackIndex + 1);
      } else if (this.repeat === 'all') {
        this.playTrack(0);
      }
    },

    prevTrack() {
      // If more than 3 seconds into track, restart it
      if (this.currentTime > 3) {
        this.seek(0);
      } else if (this.currentTrackIndex > 0) {
        this.playTrack(this.currentTrackIndex - 1);
      } else if (this.repeat === 'all') {
        this.playTrack(this.playlist.length - 1);
      }
    },

    toggleShuffle() {
      this.shuffle = !this.shuffle;
      this.$dispatch('ux-audio-player:shuffle', { shuffle: this.shuffle });
    },

    toggleRepeat() {
      const modes = ['none', 'all', 'one'];
      const currentIndex = modes.indexOf(this.repeat);
      this.repeat = modes[(currentIndex + 1) % modes.length];
      this.$dispatch('ux-audio-player:repeat', { repeat: this.repeat });
    },

    // Waveform
    onWaveformClick(event) {
      const rect = event.currentTarget.getBoundingClientRect();
      const percent = ((event.clientX - rect.left) / rect.width) * 100;
      this.seekPercent(percent);
    },

    // Internal methods
    _loadTrack() {
      if (!this._audio) return;

      const track = this.currentTrack;
      if (track.src) {
        this._audio.src = track.src;
        this.title = track.title || 'Unknown Track';
        this.artist = track.artist || 'Unknown Artist';
        this.artwork = track.artwork || '';
        this.currentTime = 0;
        this.duration = 0;

        this.$dispatch('ux-audio-player:load', { track });
      }
    },

    _handleTrackEnd() {
      if (this.repeat === 'one') {
        this.seek(0);
        this.play();
      } else if (this.hasPlaylist) {
        this.nextTrack();
      }
    },

    _startProgressLoop() {
      const update = () => {
        if (this.isPlaying && this._audio) {
          this.currentTime = this._audio.currentTime;
          this._updateWaveform();
          this._rafId = requestAnimationFrame(update);
        }
      };
      this._rafId = requestAnimationFrame(update);
    },

    _stopProgressLoop() {
      if (this._rafId) {
        cancelAnimationFrame(this._rafId);
        this._rafId = null;
      }
    },

    _updateBuffered() {
      if (this._audio && this._audio.buffered.length > 0) {
        const bufferedEnd = this._audio.buffered.end(this._audio.buffered.length - 1);
        this.buffered = this.duration > 0 ? (bufferedEnd / this.duration) * 100 : 0;
      }
    },

    _initWaveform() {
      const canvas = this.$refs.waveformCanvas;
      if (!canvas) return;

      this._waveformCanvas = canvas;
      this._waveformCtx = canvas.getContext('2d');

      // Generate sample waveform data (in real app, analyze audio)
      this._generateSampleWaveform();
      this._drawWaveform();
    },

    _generateSampleWaveform() {
      const bars = 100;
      this.waveformData = [];
      for (let i = 0; i < bars; i++) {
        // Generate random heights with some smoothing
        const height = 0.2 + Math.random() * 0.8;
        this.waveformData.push(height);
      }
    },

    _drawWaveform() {
      if (!this._waveformCanvas || !this._waveformCtx) return;

      const canvas = this._waveformCanvas;
      const ctx = this._waveformCtx;
      const dpr = window.devicePixelRatio || 1;

      // Set canvas size
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);

      const width = rect.width;
      const height = rect.height;
      const barWidth = width / this.waveformData.length;
      const progressPercent = this.progress / 100;

      ctx.clearRect(0, 0, width, height);

      this.waveformData.forEach((value, index) => {
        const x = index * barWidth;
        const barHeight = value * height * 0.8;
        const y = (height - barHeight) / 2;

        // Determine color based on progress
        if (index / this.waveformData.length < progressPercent) {
          ctx.fillStyle = getComputedStyle(document.documentElement)
            .getPropertyValue('--ux-primary').trim() || '#007AFF';
        } else {
          ctx.fillStyle = getComputedStyle(document.documentElement)
            .getPropertyValue('--ux-medium').trim() || '#8E8E93';
        }

        ctx.fillRect(x, y, barWidth - 1, barHeight);
      });
    },

    _updateWaveform() {
      if (this.showWaveform) {
        this._drawWaveform();
      }
    },

    _getErrorMessage(error) {
      if (!error) return 'Unknown error';
      switch (error.code) {
        case 1: return 'Loading aborted';
        case 2: return 'Network error';
        case 3: return 'Decoding error';
        case 4: return 'Audio not supported';
        default: return 'Unknown error';
      }
    },

    // Utility
    formatTime(seconds) {
      if (!seconds || isNaN(seconds)) return '0:00';
      const mins = Math.floor(seconds / 60);
      const secs = Math.floor(seconds % 60);
      return `${mins}:${secs.toString().padStart(2, '0')}`;
    },

    // Keyboard navigation
    handleKeydown(event) {
      switch (event.key) {
        case ' ':
        case 'k':
          event.preventDefault();
          this.toggle();
          break;
        case 'ArrowLeft':
          event.preventDefault();
          this.seekBackward(5);
          break;
        case 'ArrowRight':
          event.preventDefault();
          this.seekForward(5);
          break;
        case 'ArrowUp':
          event.preventDefault();
          this.setVolume(this.volume + 0.1);
          break;
        case 'ArrowDown':
          event.preventDefault();
          this.setVolume(this.volume - 0.1);
          break;
        case 'm':
          event.preventDefault();
          this.toggleMute();
          break;
        case 'j':
          event.preventDefault();
          this.seekBackward(10);
          break;
        case 'l':
          event.preventDefault();
          this.seekForward(10);
          break;
        case 'n':
          event.preventDefault();
          this.nextTrack();
          break;
        case 'p':
          event.preventDefault();
          this.prevTrack();
          break;
      }
    }
  });

  if (window.UX) {
    window.UX.registerComponent('uxAudioPlayer', audioPlayerComponent);
  } else {
    document.addEventListener('alpine:init', () => {
      Alpine.data('uxAudioPlayer', audioPlayerComponent);
    });
  }
})();
