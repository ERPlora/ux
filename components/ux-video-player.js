/**
 * UX Video Player Component
 * Custom video player with iOS-style controls
 * @requires ux-core.js
 */
(function() {
  'use strict';

  const styles = `
    /* ========================================
       UX Video Player
    ======================================== */

    .ux-video-player {
      --ux-video-controls-height: 44px;
      --ux-video-progress-height: 4px;
      --ux-video-progress-height-active: 6px;
      --ux-video-btn-size: 44px;
      --ux-video-btn-size-sm: 36px;
      --ux-video-slider-thumb: 14px;
      --ux-video-controls-bg: rgba(0, 0, 0, 0.6);
      --ux-video-controls-color: #ffffff;
      --ux-video-progress-bg: rgba(255, 255, 255, 0.3);
      --ux-video-progress-fill: var(--ux-primary, #0ea5e9);
      --ux-video-progress-buffer: rgba(255, 255, 255, 0.5);

      position: relative;
      width: 100%;
      background-color: #000;
      border-radius: var(--ux-border-radius-lg, 12px);
      overflow: hidden;
      line-height: 0;
      user-select: none;
      -webkit-user-select: none;
    }

    .ux-video-player:focus-within {
      outline: 2px solid var(--ux-primary, #0ea5e9);
      outline-offset: 2px;
    }

    /* ========================================
       Video Element
    ======================================== */

    .ux-video-player__video {
      width: 100%;
      height: auto;
      display: block;
      object-fit: contain;
      background-color: #000;
    }

    .ux-video-player--cover .ux-video-player__video {
      object-fit: cover;
    }

    .ux-video-player--16-9 {
      aspect-ratio: 16 / 9;
    }

    .ux-video-player--4-3 {
      aspect-ratio: 4 / 3;
    }

    .ux-video-player--1-1 {
      aspect-ratio: 1 / 1;
    }

    .ux-video-player--16-9 .ux-video-player__video,
    .ux-video-player--4-3 .ux-video-player__video,
    .ux-video-player--1-1 .ux-video-player__video {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
    }

    /* ========================================
       Poster Overlay
    ======================================== */

    .ux-video-player__poster {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      background-size: cover;
      background-position: center;
      background-color: #000;
      cursor: pointer;
      z-index: 5;
      transition: opacity var(--ux-transition-normal, 200ms) var(--ux-ease, ease);
    }

    .ux-video-player__poster--hidden {
      opacity: 0;
      pointer-events: none;
    }

    .ux-video-player__poster-play {
      width: 72px;
      height: 72px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(0, 0, 0, 0.6);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      border-radius: 50%;
      border: 2px solid rgba(255, 255, 255, 0.3);
      color: #fff;
      cursor: pointer;
      transition:
        transform var(--ux-transition-fast, 150ms) var(--ux-ease, ease),
        background-color var(--ux-transition-fast, 150ms) var(--ux-ease, ease);
    }

    .ux-video-player__poster-play:hover {
      transform: scale(1.1);
      background: rgba(0, 0, 0, 0.8);
    }

    .ux-video-player__poster-play:active {
      transform: scale(0.95);
    }

    .ux-video-player__poster-play svg {
      width: 32px;
      height: 32px;
      margin-left: 4px;
    }

    /* ========================================
       Loading Overlay
    ======================================== */

    .ux-video-player__loading {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(0, 0, 0, 0.4);
      z-index: 10;
      opacity: 0;
      visibility: hidden;
      transition:
        opacity var(--ux-transition-fast, 150ms) var(--ux-ease, ease),
        visibility var(--ux-transition-fast, 150ms) var(--ux-ease, ease);
    }

    .ux-video-player--loading .ux-video-player__loading {
      opacity: 1;
      visibility: visible;
    }

    .ux-video-player__spinner {
      width: 48px;
      height: 48px;
      border: 3px solid rgba(255, 255, 255, 0.3);
      border-top-color: #fff;
      border-radius: 50%;
      animation: ux-video-spin 0.8s linear infinite;
    }

    @keyframes ux-video-spin {
      to { transform: rotate(360deg); }
    }

    /* ========================================
       Controls Wrapper
    ======================================== */

    .ux-video-player__controls {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      display: flex;
      flex-direction: column;
      background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
      padding: var(--ux-space-lg, 1.5rem) var(--ux-space-md, 1rem) var(--ux-space-sm, 0.5rem);
      z-index: 15;
      opacity: 0;
      visibility: hidden;
      transition:
        opacity var(--ux-transition-normal, 200ms) var(--ux-ease, ease),
        visibility var(--ux-transition-normal, 200ms) var(--ux-ease, ease);
    }

    .ux-video-player:hover .ux-video-player__controls,
    .ux-video-player--controls-visible .ux-video-player__controls,
    .ux-video-player:focus-within .ux-video-player__controls {
      opacity: 1;
      visibility: visible;
    }

    .ux-video-player--controls-always .ux-video-player__controls {
      opacity: 1;
      visibility: visible;
      position: relative;
      background: var(--ux-surface-secondary, #f3f4f6);
      padding: var(--ux-space-sm, 0.5rem) var(--ux-space-md, 1rem);
    }

    /* ========================================
       Progress Bar
    ======================================== */

    .ux-video-player__progress-wrapper {
      position: relative;
      width: 100%;
      height: 20px;
      display: flex;
      align-items: center;
      cursor: pointer;
      touch-action: none;
    }

    .ux-video-player__progress {
      position: relative;
      width: 100%;
      height: var(--ux-video-progress-height);
      background: var(--ux-video-progress-bg);
      border-radius: 2px;
      overflow: hidden;
      transition: height var(--ux-transition-fast, 150ms) var(--ux-ease, ease);
    }

    .ux-video-player__progress-wrapper:hover .ux-video-player__progress,
    .ux-video-player__progress-wrapper:active .ux-video-player__progress {
      height: var(--ux-video-progress-height-active);
    }

    .ux-video-player__progress-buffer {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      background: var(--ux-video-progress-buffer);
      border-radius: 2px;
    }

    .ux-video-player__progress-fill {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      background: var(--ux-video-progress-fill);
      border-radius: 2px;
      transition: width 0.1s linear;
    }

    .ux-video-player__progress-thumb {
      position: absolute;
      top: 50%;
      width: var(--ux-video-slider-thumb);
      height: var(--ux-video-slider-thumb);
      background: #fff;
      border-radius: 50%;
      transform: translate(-50%, -50%) scale(0);
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
      transition:
        transform var(--ux-transition-fast, 150ms) cubic-bezier(0.68, -0.55, 0.265, 1.55);
    }

    .ux-video-player__progress-wrapper:hover .ux-video-player__progress-thumb,
    .ux-video-player__progress-wrapper:active .ux-video-player__progress-thumb {
      transform: translate(-50%, -50%) scale(1);
    }

    /* ========================================
       Controls Bar
    ======================================== */

    .ux-video-player__controls-bar {
      display: flex;
      align-items: center;
      gap: var(--ux-space-xs, 0.25rem);
      margin-top: var(--ux-space-xs, 0.25rem);
    }

    .ux-video-player__controls-left {
      display: flex;
      align-items: center;
      gap: var(--ux-space-xs, 0.25rem);
    }

    .ux-video-player__controls-center {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .ux-video-player__controls-right {
      display: flex;
      align-items: center;
      gap: var(--ux-space-xs, 0.25rem);
    }

    /* ========================================
       Control Buttons
    ======================================== */

    .ux-video-player__btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: var(--ux-video-btn-size);
      height: var(--ux-video-btn-size);
      min-width: var(--ux-video-btn-size);
      background: transparent;
      border: none;
      border-radius: var(--ux-border-radius, 8px);
      color: var(--ux-video-controls-color);
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
      transition:
        background-color var(--ux-transition-fast, 150ms) var(--ux-ease, ease),
        transform var(--ux-transition-fast, 150ms) var(--ux-ease, ease),
        opacity var(--ux-transition-fast, 150ms) var(--ux-ease, ease);
    }

    .ux-video-player__btn:hover {
      background: rgba(255, 255, 255, 0.1);
    }

    .ux-video-player__btn:active {
      transform: scale(0.95);
      opacity: 0.8;
    }

    .ux-video-player__btn:focus-visible {
      outline: 2px solid var(--ux-primary, #0ea5e9);
      outline-offset: 2px;
    }

    .ux-video-player__btn svg {
      width: 24px;
      height: 24px;
    }

    .ux-video-player__btn--sm {
      width: var(--ux-video-btn-size-sm);
      height: var(--ux-video-btn-size-sm);
      min-width: var(--ux-video-btn-size-sm);
    }

    .ux-video-player__btn--sm svg {
      width: 20px;
      height: 20px;
    }

    /* ========================================
       Time Display
    ======================================== */

    .ux-video-player__time {
      display: flex;
      align-items: center;
      gap: 4px;
      font-size: var(--ux-font-size-sm, 0.875rem);
      font-weight: 500;
      color: var(--ux-video-controls-color);
      font-variant-numeric: tabular-nums;
      white-space: nowrap;
      padding: 0 var(--ux-space-xs, 0.25rem);
    }

    .ux-video-player__time-separator {
      opacity: 0.6;
    }

    /* ========================================
       Volume Control
    ======================================== */

    .ux-video-player__volume {
      display: flex;
      align-items: center;
      gap: var(--ux-space-xs, 0.25rem);
    }

    .ux-video-player__volume-slider-wrapper {
      width: 0;
      overflow: hidden;
      transition: width var(--ux-transition-normal, 200ms) var(--ux-ease, ease);
    }

    .ux-video-player__volume:hover .ux-video-player__volume-slider-wrapper,
    .ux-video-player__volume-slider-wrapper:focus-within {
      width: 80px;
    }

    .ux-video-player__volume-slider {
      width: 80px;
      height: 4px;
      -webkit-appearance: none;
      appearance: none;
      background: var(--ux-video-progress-bg);
      border-radius: 2px;
      outline: none;
      cursor: pointer;
    }

    .ux-video-player__volume-slider::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 12px;
      height: 12px;
      background: #fff;
      border-radius: 50%;
      cursor: pointer;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
    }

    .ux-video-player__volume-slider::-moz-range-thumb {
      width: 12px;
      height: 12px;
      background: #fff;
      border: none;
      border-radius: 50%;
      cursor: pointer;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
    }

    /* ========================================
       Speed Control
    ======================================== */

    .ux-video-player__speed {
      position: relative;
    }

    .ux-video-player__speed-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      min-width: 44px;
      height: var(--ux-video-btn-size);
      padding: 0 var(--ux-space-sm, 0.5rem);
      background: transparent;
      border: none;
      border-radius: var(--ux-border-radius, 8px);
      color: var(--ux-video-controls-color);
      font-size: var(--ux-font-size-sm, 0.875rem);
      font-weight: 600;
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
      transition:
        background-color var(--ux-transition-fast, 150ms) var(--ux-ease, ease),
        opacity var(--ux-transition-fast, 150ms) var(--ux-ease, ease);
    }

    .ux-video-player__speed-btn:hover {
      background: rgba(255, 255, 255, 0.1);
    }

    .ux-video-player__speed-menu {
      position: absolute;
      bottom: calc(100% + var(--ux-space-xs, 0.25rem));
      right: 0;
      min-width: 100px;
      background: var(--ux-video-controls-bg);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border-radius: var(--ux-border-radius-lg, 12px);
      border: 1px solid rgba(255, 255, 255, 0.1);
      padding: var(--ux-space-xs, 0.25rem);
      opacity: 0;
      visibility: hidden;
      transform: translateY(8px);
      transition:
        opacity var(--ux-transition-fast, 150ms) var(--ux-ease, ease),
        visibility var(--ux-transition-fast, 150ms) var(--ux-ease, ease),
        transform var(--ux-transition-fast, 150ms) var(--ux-ease, ease);
      z-index: 20;
    }

    .ux-video-player__speed-menu--open {
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
    }

    .ux-video-player__speed-option {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      padding: var(--ux-space-sm, 0.5rem) var(--ux-space-md, 1rem);
      background: transparent;
      border: none;
      border-radius: var(--ux-border-radius, 8px);
      color: var(--ux-video-controls-color);
      font-size: var(--ux-font-size-sm, 0.875rem);
      text-align: left;
      cursor: pointer;
      transition: background-color var(--ux-transition-fast, 150ms) var(--ux-ease, ease);
    }

    .ux-video-player__speed-option:hover {
      background: rgba(255, 255, 255, 0.1);
    }

    .ux-video-player__speed-option--active {
      color: var(--ux-primary, #0ea5e9);
    }

    .ux-video-player__speed-option--active::after {
      content: '';
      width: 8px;
      height: 8px;
      background: var(--ux-primary, #0ea5e9);
      border-radius: 50%;
    }

    /* ========================================
       Fullscreen
    ======================================== */

    .ux-video-player--fullscreen {
      position: fixed;
      inset: 0;
      z-index: 9999;
      border-radius: 0;
      background: #000;
    }

    .ux-video-player--fullscreen .ux-video-player__video {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }

    /* ========================================
       Picture-in-Picture Indicator
    ======================================== */

    .ux-video-player__pip-indicator {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      display: flex;
      align-items: center;
      justify-content: center;
      gap: var(--ux-space-sm, 0.5rem);
      padding: var(--ux-space-md, 1rem) var(--ux-space-lg, 1.5rem);
      background: rgba(0, 0, 0, 0.8);
      border-radius: var(--ux-border-radius-lg, 12px);
      color: #fff;
      font-size: var(--ux-font-size-md, 1rem);
      z-index: 20;
    }

    .ux-video-player__pip-indicator svg {
      width: 24px;
      height: 24px;
    }

    /* ========================================
       Center Play Overlay
    ======================================== */

    .ux-video-player__center-play {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      z-index: 8;
    }

    .ux-video-player__center-play-btn {
      width: 80px;
      height: 80px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(0, 0, 0, 0.5);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      border: none;
      border-radius: 50%;
      color: #fff;
      cursor: pointer;
      opacity: 0;
      transform: scale(0.8);
      transition:
        opacity var(--ux-transition-fast, 150ms) var(--ux-ease, ease),
        transform var(--ux-transition-fast, 150ms) var(--ux-ease, ease);
    }

    .ux-video-player:hover .ux-video-player__center-play-btn,
    .ux-video-player--paused .ux-video-player__center-play-btn {
      opacity: 1;
      transform: scale(1);
    }

    .ux-video-player__center-play-btn:hover {
      transform: scale(1.1);
    }

    .ux-video-player__center-play-btn:active {
      transform: scale(0.95);
    }

    .ux-video-player__center-play-btn svg {
      width: 36px;
      height: 36px;
      margin-left: 4px;
    }

    /* Hide center play when playing */
    .ux-video-player--playing .ux-video-player__center-play {
      display: none;
    }

    /* ========================================
       Tooltip (for time preview on hover)
    ======================================== */

    .ux-video-player__tooltip {
      position: absolute;
      bottom: calc(100% + 8px);
      padding: var(--ux-space-xs, 0.25rem) var(--ux-space-sm, 0.5rem);
      background: rgba(0, 0, 0, 0.9);
      border-radius: var(--ux-border-radius, 8px);
      color: #fff;
      font-size: var(--ux-font-size-xs, 0.75rem);
      font-weight: 500;
      white-space: nowrap;
      transform: translateX(-50%);
      pointer-events: none;
      opacity: 0;
      visibility: hidden;
      transition:
        opacity var(--ux-transition-fast, 150ms) var(--ux-ease, ease),
        visibility var(--ux-transition-fast, 150ms) var(--ux-ease, ease);
    }

    .ux-video-player__progress-wrapper:hover .ux-video-player__tooltip {
      opacity: 1;
      visibility: visible;
    }

    /* ========================================
       Mobile Adjustments
    ======================================== */

    @media (max-width: 767px) {
      .ux-video-player__controls {
        padding: var(--ux-space-md, 1rem) var(--ux-space-sm, 0.5rem) var(--ux-space-xs, 0.25rem);
      }

      .ux-video-player__btn {
        width: 40px;
        height: 40px;
        min-width: 40px;
      }

      .ux-video-player__btn svg {
        width: 20px;
        height: 20px;
      }

      .ux-video-player__time {
        font-size: var(--ux-font-size-xs, 0.75rem);
      }

      .ux-video-player__volume-slider-wrapper {
        display: none;
      }

      .ux-video-player__center-play-btn {
        width: 64px;
        height: 64px;
      }

      .ux-video-player__center-play-btn svg {
        width: 28px;
        height: 28px;
      }
    }

    /* ========================================
       Glass Variant
    ======================================== */

    .ux-video-player--glass .ux-video-player__controls {
      background: linear-gradient(
        transparent,
        var(--ux-glass-bg, rgba(255, 255, 255, 0.72))
      );
      backdrop-filter: blur(var(--ux-glass-blur, 20px)) saturate(var(--ux-glass-saturation, 180%));
      -webkit-backdrop-filter: blur(var(--ux-glass-blur, 20px)) saturate(var(--ux-glass-saturation, 180%));
    }

    .ux-video-player--glass .ux-video-player__controls-bar {
      color: var(--ux-text, #111827);
    }

    .ux-video-player--glass .ux-video-player__btn {
      color: var(--ux-text, #111827);
    }

    .ux-video-player--glass .ux-video-player__btn:hover {
      background: rgba(0, 0, 0, 0.1);
    }

    .ux-video-player--glass .ux-video-player__time {
      color: var(--ux-text, #111827);
    }

    .ux-video-player--glass .ux-video-player__progress {
      background: rgba(0, 0, 0, 0.2);
    }

    .ux-video-player--glass .ux-video-player__progress-buffer {
      background: rgba(0, 0, 0, 0.3);
    }

    .ux-video-player--glass .ux-video-player__progress-thumb {
      background: var(--ux-primary, #0ea5e9);
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    }

    .ux-video-player--glass .ux-video-player__speed-menu {
      background: var(--ux-glass-bg, rgba(255, 255, 255, 0.72));
      backdrop-filter: blur(var(--ux-glass-blur, 20px)) saturate(var(--ux-glass-saturation, 180%));
      -webkit-backdrop-filter: blur(var(--ux-glass-blur, 20px)) saturate(var(--ux-glass-saturation, 180%));
      border-color: var(--ux-glass-border, rgba(255, 255, 255, 0.18));
    }

    .ux-video-player--glass .ux-video-player__speed-btn,
    .ux-video-player--glass .ux-video-player__speed-option {
      color: var(--ux-text, #111827);
    }

    .ux-video-player--glass .ux-video-player__speed-option:hover {
      background: rgba(0, 0, 0, 0.1);
    }

    /* Dark mode glass */
    .ux-dark .ux-video-player--glass .ux-video-player__controls {
      background: linear-gradient(
        transparent,
        rgba(30, 30, 30, 0.72)
      );
    }

    .ux-dark .ux-video-player--glass .ux-video-player__controls-bar,
    .ux-dark .ux-video-player--glass .ux-video-player__btn,
    .ux-dark .ux-video-player--glass .ux-video-player__time,
    .ux-dark .ux-video-player--glass .ux-video-player__speed-btn,
    .ux-dark .ux-video-player--glass .ux-video-player__speed-option {
      color: #fff;
    }

    .ux-dark .ux-video-player--glass .ux-video-player__btn:hover,
    .ux-dark .ux-video-player--glass .ux-video-player__speed-option:hover {
      background: rgba(255, 255, 255, 0.1);
    }

    .ux-dark .ux-video-player--glass .ux-video-player__progress {
      background: rgba(255, 255, 255, 0.2);
    }

    .ux-dark .ux-video-player--glass .ux-video-player__progress-buffer {
      background: rgba(255, 255, 255, 0.3);
    }

    @media (prefers-color-scheme: dark) {
      .ux-video-player--glass .ux-video-player__controls {
        background: linear-gradient(
          transparent,
          rgba(30, 30, 30, 0.72)
        );
      }

      .ux-video-player--glass .ux-video-player__controls-bar,
      .ux-video-player--glass .ux-video-player__btn,
      .ux-video-player--glass .ux-video-player__time,
      .ux-video-player--glass .ux-video-player__speed-btn,
      .ux-video-player--glass .ux-video-player__speed-option {
        color: #fff;
      }

      .ux-video-player--glass .ux-video-player__btn:hover,
      .ux-video-player--glass .ux-video-player__speed-option:hover {
        background: rgba(255, 255, 255, 0.1);
      }

      .ux-video-player--glass .ux-video-player__progress {
        background: rgba(255, 255, 255, 0.2);
      }

      .ux-video-player--glass .ux-video-player__progress-buffer {
        background: rgba(255, 255, 255, 0.3);
      }
    }

    /* ========================================
       Size Variants
    ======================================== */

    .ux-video-player--sm {
      --ux-video-btn-size: 36px;
      --ux-video-btn-size-sm: 32px;
    }

    .ux-video-player--lg {
      --ux-video-btn-size: 52px;
      --ux-video-btn-size-sm: 44px;
    }

    /* ========================================
       Minimal Variant (progress only)
    ======================================== */

    .ux-video-player--minimal .ux-video-player__controls-bar {
      display: none;
    }

    .ux-video-player--minimal .ux-video-player__controls {
      padding: var(--ux-space-sm, 0.5rem);
    }

    /* ========================================
       Reduced Motion
    ======================================== */

    @media (prefers-reduced-motion: reduce) {
      .ux-video-player__controls,
      .ux-video-player__poster,
      .ux-video-player__loading,
      .ux-video-player__poster-play,
      .ux-video-player__btn,
      .ux-video-player__progress,
      .ux-video-player__progress-thumb,
      .ux-video-player__speed-menu,
      .ux-video-player__tooltip,
      .ux-video-player__center-play-btn {
        transition: none;
      }

      .ux-video-player__spinner {
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

  // Alpine component for video player
  const videoPlayerComponent = (config = {}) => ({
    // State
    isPlaying: false,
    isPaused: true,
    isLoading: false,
    isBuffering: false,
    isMuted: config.muted || false,
    isFullscreen: false,
    isPiP: false,
    showControls: true,
    showSpeedMenu: false,
    hasStarted: false,

    // Values
    currentTime: 0,
    duration: 0,
    bufferedPercent: 0,
    volume: config.volume ?? 1,
    playbackRate: config.playbackRate || 1,

    // Options
    autoplay: config.autoplay || false,
    loop: config.loop || false,
    poster: config.poster || null,
    preload: config.preload || 'metadata',
    controlsTimeout: config.controlsTimeout || 3000,
    speeds: config.speeds || [0.5, 0.75, 1, 1.25, 1.5, 2],

    // Internal
    _video: null,
    _controlsTimer: null,
    _progressDragging: false,
    playerId: config.id || 'ux-video-player-' + Math.random().toString(36).substr(2, 9),

    // ARIA attributes
    get ariaAttrs() {
      return {
        'role': 'application',
        'aria-label': config.ariaLabel || 'Video player'
      };
    },

    // Computed
    get progress() {
      return this.duration > 0 ? (this.currentTime / this.duration) * 100 : 0;
    },

    get currentTimeFormatted() {
      return this._formatTime(this.currentTime);
    },

    get durationFormatted() {
      return this._formatTime(this.duration);
    },

    get volumeIcon() {
      if (this.isMuted || this.volume === 0) return 'muted';
      if (this.volume < 0.5) return 'low';
      return 'high';
    },

    // Lifecycle
    init() {
      this.$nextTick(() => {
        this._video = this.$refs.video;
        if (!this._video) return;

        // Set initial values
        this._video.volume = this.volume;
        this._video.muted = this.isMuted;
        this._video.playbackRate = this.playbackRate;
        if (this.loop) this._video.loop = true;

        // Bind events
        this._bindVideoEvents();
        this._bindKeyboardEvents();

        // Handle autoplay
        if (this.autoplay) {
          this.play();
        }
      });
    },

    destroy() {
      this._clearControlsTimer();
      if (this._keydownHandler) {
        document.removeEventListener('keydown', this._keydownHandler);
      }
    },

    // Video event bindings
    _bindVideoEvents() {
      const video = this._video;

      video.addEventListener('loadstart', () => {
        this.isLoading = true;
      });

      video.addEventListener('loadedmetadata', () => {
        this.duration = video.duration;
        this.isLoading = false;
      });

      video.addEventListener('canplay', () => {
        this.isLoading = false;
        this.isBuffering = false;
      });

      video.addEventListener('waiting', () => {
        this.isBuffering = true;
      });

      video.addEventListener('playing', () => {
        this.isBuffering = false;
      });

      video.addEventListener('play', () => {
        this.isPlaying = true;
        this.isPaused = false;
        this.hasStarted = true;
        this.$el.classList.add('ux-video-player--playing');
        this.$el.classList.remove('ux-video-player--paused');
        this.$dispatch('ux-video-player:play');
      });

      video.addEventListener('pause', () => {
        this.isPlaying = false;
        this.isPaused = true;
        this.$el.classList.remove('ux-video-player--playing');
        this.$el.classList.add('ux-video-player--paused');
        this.$dispatch('ux-video-player:pause');
      });

      video.addEventListener('ended', () => {
        this.isPlaying = false;
        this.isPaused = true;
        if (!this.loop) {
          this.hasStarted = false;
        }
        this.$dispatch('ux-video-player:ended');
      });

      video.addEventListener('timeupdate', () => {
        if (!this._progressDragging) {
          this.currentTime = video.currentTime;
        }
      });

      video.addEventListener('progress', () => {
        this._updateBuffered();
      });

      video.addEventListener('volumechange', () => {
        this.volume = video.volume;
        this.isMuted = video.muted;
      });

      video.addEventListener('ratechange', () => {
        this.playbackRate = video.playbackRate;
      });

      video.addEventListener('enterpictureinpicture', () => {
        this.isPiP = true;
        this.$dispatch('ux-video-player:pip-enter');
      });

      video.addEventListener('leavepictureinpicture', () => {
        this.isPiP = false;
        this.$dispatch('ux-video-player:pip-leave');
      });

      video.addEventListener('error', (e) => {
        this.isLoading = false;
        this.$dispatch('ux-video-player:error', { error: video.error });
      });
    },

    // Keyboard navigation
    _bindKeyboardEvents() {
      this._keydownHandler = (e) => {
        // Only handle if player is focused or has focus within
        if (!this.$el.contains(document.activeElement) && document.activeElement !== this.$el) {
          return;
        }

        switch (e.key) {
          case ' ':
          case 'k':
            e.preventDefault();
            this.toggle();
            break;
          case 'ArrowLeft':
            e.preventDefault();
            this.skip(-10);
            break;
          case 'ArrowRight':
            e.preventDefault();
            this.skip(10);
            break;
          case 'ArrowUp':
            e.preventDefault();
            this.setVolume(Math.min(1, this.volume + 0.1));
            break;
          case 'ArrowDown':
            e.preventDefault();
            this.setVolume(Math.max(0, this.volume - 0.1));
            break;
          case 'm':
            e.preventDefault();
            this.toggleMute();
            break;
          case 'f':
            e.preventDefault();
            this.toggleFullscreen();
            break;
          case 'p':
            if (e.shiftKey) {
              e.preventDefault();
              this.togglePiP();
            }
            break;
          case 'Home':
            e.preventDefault();
            this.seek(0);
            break;
          case 'End':
            e.preventDefault();
            this.seek(this.duration);
            break;
          case '0':
          case '1':
          case '2':
          case '3':
          case '4':
          case '5':
          case '6':
          case '7':
          case '8':
          case '9':
            e.preventDefault();
            const percent = parseInt(e.key) * 10;
            this.seek(this.duration * (percent / 100));
            break;
          case '<':
            e.preventDefault();
            this.decreaseSpeed();
            break;
          case '>':
            e.preventDefault();
            this.increaseSpeed();
            break;
        }
      };

      document.addEventListener('keydown', this._keydownHandler);
    },

    // Playback controls
    play() {
      if (this._video) {
        this._video.play().catch(err => {
          console.warn('Video play failed:', err);
        });
      }
    },

    pause() {
      if (this._video) {
        this._video.pause();
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
      this.pause();
      this.seek(0);
      this.hasStarted = false;
    },

    // Seeking
    seek(time) {
      if (this._video) {
        const targetTime = Math.max(0, Math.min(this.duration, time));
        this._video.currentTime = targetTime;
        this.currentTime = targetTime;
      }
    },

    skip(seconds) {
      this.seek(this.currentTime + seconds);
    },

    // Progress bar interaction
    handleProgressClick(event) {
      const rect = event.currentTarget.getBoundingClientRect();
      const percent = (event.clientX - rect.left) / rect.width;
      this.seek(percent * this.duration);
    },

    handleProgressDrag(event) {
      if (!this._progressDragging) return;
      const rect = this.$refs.progressWrapper.getBoundingClientRect();
      const percent = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width));
      this.currentTime = percent * this.duration;
    },

    startProgressDrag(event) {
      this._progressDragging = true;
      this.handleProgressClick(event);
      document.addEventListener('mousemove', this._onProgressMove = (e) => this.handleProgressDrag(e));
      document.addEventListener('mouseup', this._onProgressUp = () => this.endProgressDrag());
    },

    endProgressDrag() {
      if (this._progressDragging) {
        this.seek(this.currentTime);
        this._progressDragging = false;
      }
      document.removeEventListener('mousemove', this._onProgressMove);
      document.removeEventListener('mouseup', this._onProgressUp);
    },

    getProgressTooltipTime(event) {
      const rect = event.currentTarget.getBoundingClientRect();
      const percent = (event.clientX - rect.left) / rect.width;
      return this._formatTime(percent * this.duration);
    },

    getProgressTooltipPosition(event) {
      const rect = event.currentTarget.getBoundingClientRect();
      return ((event.clientX - rect.left) / rect.width) * 100;
    },

    // Volume control
    setVolume(level) {
      if (this._video) {
        const vol = Math.max(0, Math.min(1, level));
        this._video.volume = vol;
        this.volume = vol;
        if (vol > 0 && this.isMuted) {
          this._video.muted = false;
        }
      }
    },

    toggleMute() {
      if (this._video) {
        this._video.muted = !this._video.muted;
      }
    },

    // Speed control
    setSpeed(rate) {
      if (this._video) {
        this._video.playbackRate = rate;
        this.playbackRate = rate;
        this.showSpeedMenu = false;
      }
    },

    increaseSpeed() {
      const currentIndex = this.speeds.indexOf(this.playbackRate);
      if (currentIndex < this.speeds.length - 1) {
        this.setSpeed(this.speeds[currentIndex + 1]);
      }
    },

    decreaseSpeed() {
      const currentIndex = this.speeds.indexOf(this.playbackRate);
      if (currentIndex > 0) {
        this.setSpeed(this.speeds[currentIndex - 1]);
      }
    },

    toggleSpeedMenu() {
      this.showSpeedMenu = !this.showSpeedMenu;
    },

    // Fullscreen
    toggleFullscreen() {
      if (!document.fullscreenElement) {
        this.enterFullscreen();
      } else {
        this.exitFullscreen();
      }
    },

    enterFullscreen() {
      const elem = this.$el;
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
      }
      this.isFullscreen = true;
      this.$el.classList.add('ux-video-player--fullscreen');
      this.$dispatch('ux-video-player:fullscreen-enter');
    },

    exitFullscreen() {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
      this.isFullscreen = false;
      this.$el.classList.remove('ux-video-player--fullscreen');
      this.$dispatch('ux-video-player:fullscreen-exit');
    },

    // Picture-in-Picture
    async togglePiP() {
      if (!document.pictureInPictureEnabled) {
        console.warn('Picture-in-Picture not supported');
        return;
      }

      try {
        if (this._video !== document.pictureInPictureElement) {
          await this._video.requestPictureInPicture();
        } else {
          await document.exitPictureInPicture();
        }
      } catch (err) {
        console.error('PiP error:', err);
      }
    },

    // Controls visibility
    showControlsTemporarily() {
      this.showControls = true;
      this.$el.classList.add('ux-video-player--controls-visible');
      this._resetControlsTimer();
    },

    hideControls() {
      if (this.isPlaying && !this.showSpeedMenu) {
        this.showControls = false;
        this.$el.classList.remove('ux-video-player--controls-visible');
      }
    },

    _resetControlsTimer() {
      this._clearControlsTimer();
      if (this.isPlaying) {
        this._controlsTimer = setTimeout(() => {
          this.hideControls();
        }, this.controlsTimeout);
      }
    },

    _clearControlsTimer() {
      if (this._controlsTimer) {
        clearTimeout(this._controlsTimer);
        this._controlsTimer = null;
      }
    },

    // Helpers
    _formatTime(seconds) {
      if (isNaN(seconds) || !isFinite(seconds)) return '0:00';
      const hrs = Math.floor(seconds / 3600);
      const mins = Math.floor((seconds % 3600) / 60);
      const secs = Math.floor(seconds % 60);

      if (hrs > 0) {
        return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
      }
      return `${mins}:${secs.toString().padStart(2, '0')}`;
    },

    _updateBuffered() {
      if (this._video && this._video.buffered.length > 0) {
        const bufferedEnd = this._video.buffered.end(this._video.buffered.length - 1);
        this.bufferedPercent = (bufferedEnd / this.duration) * 100;
      }
    }
  });

  // Register component
  if (window.UX) {
    window.UX.registerComponent('uxVideoPlayer', videoPlayerComponent);
  } else {
    document.addEventListener('alpine:init', () => {
      Alpine.data('uxVideoPlayer', videoPlayerComponent);
    });
  }
})();
