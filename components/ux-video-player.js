/**
 * UX Video Player Component
 * Custom video player with iOS-style controls
 * @requires ux-core.js
 */
(function() {
  'use strict';

  const styles = `
    /* ========================================
       UX Video Player - Base
    ======================================== */

    .ux-video {
      --ux-video-controls-bg: rgba(0, 0, 0, 0.7);
      --ux-video-progress-bg: rgba(255, 255, 255, 0.3);
      --ux-video-progress-fill: var(--ux-primary);
      --ux-video-btn-size: 44px;

      position: relative;
      width: 100%;
      background: #000;
      border-radius: var(--ux-radius-lg);
      overflow: hidden;
      font-family: var(--ux-font-family);
    }

    .ux-video__video {
      display: block;
      width: 100%;
      height: auto;
    }

    /* ========================================
       Poster / Thumbnail
    ======================================== */

    .ux-video__poster {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      background-size: cover;
      background-position: center;
      cursor: pointer;
      z-index: 5;
    }

    .ux-video__poster-play {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 80px;
      height: 80px;
      background: rgba(0, 0, 0, 0.6);
      border: none;
      border-radius: 50%;
      color: white;
      cursor: pointer;
      transition: all var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-video__poster-play:hover {
      background: rgba(0, 0, 0, 0.8);
      transform: scale(1.1);
    }

    .ux-video__poster-play svg {
      width: 36px;
      height: 36px;
      margin-left: 4px;
    }

    /* ========================================
       Controls Overlay
    ======================================== */

    .ux-video__controls {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      padding: 1rem;
      background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
      opacity: 0;
      visibility: hidden;
      transition: all var(--ux-transition-fast) var(--ux-ease);
      z-index: 10;
    }

    .ux-video:hover .ux-video__controls,
    .ux-video--controls-visible .ux-video__controls {
      opacity: 1;
      visibility: visible;
    }

    .ux-video--playing:not(:hover) .ux-video__controls {
      opacity: 0;
      visibility: hidden;
    }

    /* ========================================
       Progress Bar
    ======================================== */

    .ux-video__progress-container {
      position: relative;
      height: 4px;
      margin-bottom: 0.75rem;
      cursor: pointer;
    }

    .ux-video__progress-container:hover {
      height: 6px;
    }

    .ux-video__progress-bg {
      position: absolute;
      inset: 0;
      background: var(--ux-video-progress-bg);
      border-radius: 2px;
    }

    .ux-video__progress-buffered {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      background: rgba(255, 255, 255, 0.5);
      border-radius: 2px;
    }

    .ux-video__progress-fill {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      background: var(--ux-video-progress-fill);
      border-radius: 2px;
      transition: width 0.1s linear;
    }

    .ux-video__progress-handle {
      position: absolute;
      top: 50%;
      width: 14px;
      height: 14px;
      background: white;
      border-radius: 50%;
      transform: translate(-50%, -50%);
      opacity: 0;
      transition: opacity var(--ux-transition-fast) var(--ux-ease);
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    }

    .ux-video__progress-container:hover .ux-video__progress-handle {
      opacity: 1;
    }

    /* ========================================
       Controls Bar
    ======================================== */

    .ux-video__controls-bar {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .ux-video__btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: var(--ux-video-btn-size);
      height: var(--ux-video-btn-size);
      background: transparent;
      border: none;
      border-radius: var(--ux-radius-md);
      color: white;
      cursor: pointer;
      transition: all var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-video__btn:hover {
      background: rgba(255, 255, 255, 0.1);
    }

    .ux-video__btn svg {
      width: 24px;
      height: 24px;
    }

    .ux-video__btn--sm {
      width: 36px;
      height: 36px;
    }

    .ux-video__btn--sm svg {
      width: 20px;
      height: 20px;
    }

    /* ========================================
       Time Display
    ======================================== */

    .ux-video__time {
      font-size: 0.8125rem;
      color: white;
      font-variant-numeric: tabular-nums;
      white-space: nowrap;
    }

    .ux-video__spacer {
      flex: 1;
    }

    /* ========================================
       Volume Control
    ======================================== */

    .ux-video__volume {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .ux-video__volume-slider {
      width: 80px;
      height: 4px;
      background: var(--ux-video-progress-bg);
      border-radius: 2px;
      -webkit-appearance: none;
      appearance: none;
      cursor: pointer;
    }

    .ux-video__volume-slider::-webkit-slider-thumb {
      -webkit-appearance: none;
      width: 12px;
      height: 12px;
      background: white;
      border-radius: 50%;
      cursor: pointer;
    }

    .ux-video__volume-slider::-moz-range-thumb {
      width: 12px;
      height: 12px;
      background: white;
      border-radius: 50%;
      border: none;
      cursor: pointer;
    }

    /* ========================================
       Playback Rate
    ======================================== */

    .ux-video__speed {
      position: relative;
    }

    .ux-video__speed-btn {
      padding: 0.25rem 0.5rem;
      font-size: 0.75rem;
      font-weight: 600;
      color: white;
      background: rgba(255, 255, 255, 0.1);
      border: none;
      border-radius: var(--ux-radius-sm);
      cursor: pointer;
    }

    .ux-video__speed-menu {
      position: absolute;
      bottom: 100%;
      right: 0;
      margin-bottom: 0.5rem;
      background: var(--ux-video-controls-bg);
      border-radius: var(--ux-radius-md);
      padding: 0.25rem;
      display: none;
    }

    .ux-video__speed-menu--open {
      display: block;
    }

    .ux-video__speed-option {
      display: block;
      width: 100%;
      padding: 0.5rem 1rem;
      font-size: 0.8125rem;
      color: white;
      background: transparent;
      border: none;
      text-align: left;
      cursor: pointer;
      white-space: nowrap;
    }

    .ux-video__speed-option:hover {
      background: rgba(255, 255, 255, 0.1);
    }

    .ux-video__speed-option--active {
      color: var(--ux-primary);
    }

    /* ========================================
       Center Play Button
    ======================================== */

    .ux-video__center-btn {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) scale(0.8);
      display: flex;
      align-items: center;
      justify-content: center;
      width: 70px;
      height: 70px;
      background: rgba(0, 0, 0, 0.6);
      border: none;
      border-radius: 50%;
      color: white;
      cursor: pointer;
      opacity: 0;
      visibility: hidden;
      transition: all var(--ux-transition-fast) var(--ux-ease);
      z-index: 8;
    }

    .ux-video:hover .ux-video__center-btn,
    .ux-video--paused .ux-video__center-btn {
      opacity: 1;
      visibility: visible;
      transform: translate(-50%, -50%) scale(1);
    }

    .ux-video--playing:not(:hover) .ux-video__center-btn {
      opacity: 0;
      visibility: hidden;
    }

    .ux-video__center-btn svg {
      width: 32px;
      height: 32px;
      margin-left: 4px;
    }

    /* ========================================
       Loading Spinner
    ======================================== */

    .ux-video__loading {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 15;
    }

    .ux-video__spinner {
      width: 48px;
      height: 48px;
      border: 3px solid rgba(255, 255, 255, 0.3);
      border-top-color: white;
      border-radius: 50%;
      animation: ux-video-spin 0.8s linear infinite;
    }

    @keyframes ux-video-spin {
      to { transform: rotate(360deg); }
    }

    /* ========================================
       Fullscreen
    ======================================== */

    .ux-video--fullscreen {
      position: fixed;
      inset: 0;
      z-index: 9999;
      border-radius: 0;
    }

    .ux-video--fullscreen .ux-video__video {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }

    /* ========================================
       Picture-in-Picture Indicator
    ======================================== */

    .ux-video__pip-indicator {
      position: absolute;
      top: 1rem;
      right: 1rem;
      padding: 0.5rem 1rem;
      background: rgba(0, 0, 0, 0.7);
      border-radius: var(--ux-radius-md);
      color: white;
      font-size: 0.8125rem;
      z-index: 20;
    }

    /* ========================================
       Mobile Optimizations
    ======================================== */

    @media (max-width: 767px) {
      .ux-video__controls {
        padding: 0.75rem;
      }

      .ux-video__btn {
        width: 40px;
        height: 40px;
      }

      .ux-video__btn svg {
        width: 20px;
        height: 20px;
      }

      .ux-video__volume-slider {
        width: 60px;
      }

      .ux-video__time {
        font-size: 0.75rem;
      }
    }

    /* ========================================
       Reduced Motion
    ======================================== */

    @media (prefers-reduced-motion: reduce) {
      .ux-video__controls,
      .ux-video__progress-handle,
      .ux-video__center-btn,
      .ux-video__poster-play,
      .ux-video__btn {
        transition: none;
      }

      .ux-video__spinner {
        animation: none;
      }
    }
  `;

  // Inject styles
  if (window.UX) {
    window.UX.injectStyles('ux-video-player-styles', styles);
  } else {
    const styleEl = document.createElement('style');
    styleEl.id = 'ux-video-player-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }

  // Icons
  const icons = {
    play: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>',
    pause: '<svg viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>',
    volumeHigh: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 010 14.14M15.54 8.46a5 5 0 010 7.07"/></svg>',
    volumeLow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 010 7.07"/></svg>',
    volumeMute: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>',
    fullscreen: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/></svg>',
    exitFullscreen: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="4 14 10 14 10 20"/><polyline points="20 10 14 10 14 4"/><line x1="14" y1="10" x2="21" y2="3"/><line x1="3" y1="21" x2="10" y2="14"/></svg>',
    pip: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2"/><rect x="11" y="9" width="9" height="7" rx="1"/></svg>',
    settings: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"/></svg>',
    skip: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 4 15 12 5 20 5 4"/><line x1="19" y1="5" x2="19" y2="19"/></svg>',
    rewind: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="19 20 9 12 19 4 19 20"/><line x1="5" y1="19" x2="5" y2="5"/></svg>'
  };

  // Speed options
  const speedOptions = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];

  // Alpine.js component
  const videoPlayerData = (options = {}) => ({
    // Configuration
    src: options.src || '',
    poster: options.poster || '',
    autoplay: options.autoplay ?? false,
    muted: options.muted ?? false,
    loop: options.loop ?? false,
    preload: options.preload || 'metadata',

    // State
    playing: false,
    currentTime: 0,
    duration: 0,
    buffered: 0,
    volume: options.volume ?? 1,
    previousVolume: 1,
    isMuted: false,
    isFullscreen: false,
    isPiP: false,
    loading: true,
    showPoster: true,
    controlsVisible: true,
    speedMenuOpen: false,
    playbackRate: 1,

    // Icons
    icons,
    speedOptions,

    // Hide controls timer
    _hideControlsTimer: null,

    init() {
      this.$nextTick(() => {
        this.video = this.$refs.video;

        if (this.video) {
          this.setupEventListeners();

          if (this.muted) {
            this.video.muted = true;
            this.isMuted = true;
          }

          if (this.autoplay) {
            this.play();
          }
        }
      });
    },

    setupEventListeners() {
      this.video.addEventListener('loadedmetadata', () => {
        this.duration = this.video.duration;
        this.loading = false;
      });

      this.video.addEventListener('timeupdate', () => {
        this.currentTime = this.video.currentTime;
      });

      this.video.addEventListener('progress', () => {
        if (this.video.buffered.length > 0) {
          this.buffered = (this.video.buffered.end(this.video.buffered.length - 1) / this.duration) * 100;
        }
      });

      this.video.addEventListener('play', () => {
        this.playing = true;
        this.showPoster = false;
        this.$dispatch('video:play');
      });

      this.video.addEventListener('pause', () => {
        this.playing = false;
        this.$dispatch('video:pause');
      });

      this.video.addEventListener('ended', () => {
        this.playing = false;
        if (!this.loop) {
          this.showPoster = true;
        }
        this.$dispatch('video:ended');
      });

      this.video.addEventListener('waiting', () => {
        this.loading = true;
      });

      this.video.addEventListener('canplay', () => {
        this.loading = false;
      });

      this.video.addEventListener('volumechange', () => {
        this.volume = this.video.volume;
        this.isMuted = this.video.muted;
      });

      // Fullscreen change
      document.addEventListener('fullscreenchange', () => {
        this.isFullscreen = !!document.fullscreenElement;
      });

      // PiP change
      this.video.addEventListener('enterpictureinpicture', () => {
        this.isPiP = true;
      });

      this.video.addEventListener('leavepictureinpicture', () => {
        this.isPiP = false;
      });
    },

    // Play/Pause
    togglePlay() {
      if (this.playing) {
        this.pause();
      } else {
        this.play();
      }
    },

    play() {
      this.video.play().catch(e => {
        console.error('Play failed:', e);
      });
    },

    pause() {
      this.video.pause();
    },

    // Seek
    seek(time) {
      this.video.currentTime = time;
    },

    seekPercent(percent) {
      this.seek((percent / 100) * this.duration);
    },

    seekRelative(seconds) {
      this.seek(Math.max(0, Math.min(this.duration, this.currentTime + seconds)));
    },

    handleProgressClick(e) {
      const rect = e.currentTarget.getBoundingClientRect();
      const percent = ((e.clientX - rect.left) / rect.width) * 100;
      this.seekPercent(percent);
    },

    // Volume
    setVolume(vol) {
      this.video.volume = Math.max(0, Math.min(1, vol));
      if (vol > 0 && this.isMuted) {
        this.video.muted = false;
      }
    },

    toggleMute() {
      if (this.isMuted) {
        this.video.muted = false;
        this.video.volume = this.previousVolume || 0.5;
      } else {
        this.previousVolume = this.volume;
        this.video.muted = true;
      }
    },

    // Fullscreen
    toggleFullscreen() {
      if (this.isFullscreen) {
        document.exitFullscreen();
      } else {
        this.$el.requestFullscreen();
      }
    },

    // Picture-in-Picture
    togglePiP() {
      if (this.isPiP) {
        document.exitPictureInPicture();
      } else if (document.pictureInPictureEnabled) {
        this.video.requestPictureInPicture();
      }
    },

    // Playback rate
    setPlaybackRate(rate) {
      this.video.playbackRate = rate;
      this.playbackRate = rate;
      this.speedMenuOpen = false;
    },

    toggleSpeedMenu() {
      this.speedMenuOpen = !this.speedMenuOpen;
    },

    // Time formatting
    formatTime(seconds) {
      if (isNaN(seconds) || !isFinite(seconds)) return '0:00';

      const hrs = Math.floor(seconds / 3600);
      const mins = Math.floor((seconds % 3600) / 60);
      const secs = Math.floor(seconds % 60);

      if (hrs > 0) {
        return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
      }
      return `${mins}:${secs.toString().padStart(2, '0')}`;
    },

    // Progress percentage
    get progressPercent() {
      return this.duration > 0 ? (this.currentTime / this.duration) * 100 : 0;
    },

    // Volume icon
    get volumeIcon() {
      if (this.isMuted || this.volume === 0) return this.icons.volumeMute;
      if (this.volume < 0.5) return this.icons.volumeLow;
      return this.icons.volumeHigh;
    },

    // Show/hide controls
    showControls() {
      this.controlsVisible = true;
      clearTimeout(this._hideControlsTimer);

      if (this.playing) {
        this._hideControlsTimer = setTimeout(() => {
          this.controlsVisible = false;
        }, 3000);
      }
    },

    // Load new source
    loadSource(src, poster) {
      this.src = src;
      if (poster) this.poster = poster;
      this.showPoster = true;
      this.currentTime = 0;
      this.duration = 0;
      this.loading = true;

      this.$nextTick(() => {
        this.video.load();
      });
    }
  });

  // Register component
  if (window.UX) {
    window.UX.registerComponent('uxVideoPlayer', videoPlayerData);
  }

})();
