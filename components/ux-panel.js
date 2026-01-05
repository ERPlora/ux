/**
 * UX Panel Component
 * Layouts de contenido para admin panels
 * @requires ux-core.js
 */
(function() {
  'use strict';

  const styles = `
    /* ========================================
       UX Panel - CSS Variables
    ======================================== */

    :root {
      --ux-panel-header: 64px;
      --ux-panel-actions: 56px;
      --ux-panel-pagination: 48px;
      --ux-panel-filters: 56px;
      --ux-panel-gap: 16px;
      --ux-panel-aside-toggle: 48px;
    }

    @media (min-width: 768px) {
      :root {
        --ux-panel-gap: 24px;
      }
    }

    /* ========================================
       Base Panel - Container que ocupa 100%
    ======================================== */

    .ux-panel {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
      min-height: 0;
      overflow: hidden;
      background-color: var(--ux-surface-secondary);
    }

    /* Seccion con scroll interno */
    .ux-panel__section {
      position: relative;
      min-height: 0;
      overflow: auto;
      -webkit-overflow-scrolling: touch;
    }

    .ux-panel__section--fixed {
      flex-shrink: 0;
      overflow: visible;
    }

    .ux-panel__section--scroll {
      flex: 1;
      overflow: auto;
    }

    /* ========================================
       Scrollable Table Wrapper
       Header fijo + body con scroll
    ======================================== */

    .ux-panel-table-wrapper {
      display: flex;
      flex-direction: column;
      height: 100%;
      min-height: 0;
      overflow: hidden;
    }

    .ux-panel-table-wrapper__header {
      flex-shrink: 0;
      overflow-x: auto;
      overflow-y: hidden;
      background-color: var(--ux-surface);
      border-bottom: 1px solid var(--ux-border-color);
    }

    .ux-panel-table-wrapper__body {
      flex: 1;
      min-height: 0;
      overflow: auto;
      -webkit-overflow-scrolling: touch;
    }

    /* Sync scroll horizontal between header and body */
    .ux-panel-table-wrapper__inner {
      min-width: max-content;
    }

    /* Table styles for fixed header */
    .ux-panel-table-wrapper table {
      width: 100%;
      min-width: max-content;
      border-collapse: collapse;
    }

    .ux-panel-table-wrapper th,
    .ux-panel-table-wrapper td {
      padding: var(--ux-space-sm) var(--ux-space-md);
      text-align: left;
      white-space: nowrap;
    }

    .ux-panel-table-wrapper th {
      font-weight: 600;
      font-size: var(--ux-font-size-sm);
      color: var(--ux-text-secondary);
      background-color: var(--ux-surface);
    }

    .ux-panel-table-wrapper td {
      font-size: var(--ux-font-size-sm);
      border-bottom: 1px solid var(--ux-border-color);
    }

    .ux-panel-table-wrapper tbody tr:hover {
      background-color: var(--ux-surface-secondary);
    }

    /* ========================================
       Panel 1: Dashboard
       KPIs arriba + graficos + tabla
    ======================================== */

    .ux-panel-dashboard {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
      min-height: 0;
      overflow: hidden;
    }

    .ux-panel-dashboard__kpis {
      flex-shrink: 0;
      overflow-x: auto;
      overflow-y: hidden;
      padding: var(--ux-panel-gap);
      -webkit-overflow-scrolling: touch;
    }

    .ux-panel-dashboard__charts {
      flex-shrink: 0;
      display: flex;
      flex-direction: column;
      gap: var(--ux-panel-gap);
      padding: 0 var(--ux-panel-gap);
      overflow: visible;
    }

    .ux-panel-dashboard__charts > * {
      min-height: 200px;
    }

    .ux-panel-dashboard__table {
      flex: 1;
      min-height: 0;
      overflow: hidden;
      padding: var(--ux-panel-gap);
    }

    @media (min-width: 768px) {
      .ux-panel-dashboard__charts {
        flex-direction: row;
        min-height: 250px;
        flex-shrink: 0;
      }

      .ux-panel-dashboard__charts > * {
        flex: 1;
        min-height: 0;
      }
    }

    /* ========================================
       Panel 2: Table
       Acciones + tabla + paginacion
    ======================================== */

    .ux-panel-table {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
      min-height: 0;
      overflow: hidden;
    }

    .ux-panel-table__actions {
      flex-shrink: 0;
      height: var(--ux-panel-actions);
      display: flex;
      align-items: center;
      gap: var(--ux-space-md);
      padding: 0 var(--ux-panel-gap);
      border-bottom: 1px solid var(--ux-border-color);
      background-color: var(--ux-surface);
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;
    }

    .ux-panel-table__actions-inner {
      display: flex;
      align-items: center;
      gap: var(--ux-space-md);
      min-width: max-content;
    }

    .ux-panel-table__content {
      flex: 1;
      min-height: 0;
      overflow: hidden;
    }

    .ux-panel-table__pagination {
      flex-shrink: 0;
      height: var(--ux-panel-pagination);
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 var(--ux-panel-gap);
      border-top: 1px solid var(--ux-border-color);
      background-color: var(--ux-surface);
      font-size: var(--ux-font-size-sm);
      gap: var(--ux-space-md);
      overflow-x: auto;
    }

    /* ========================================
       Panel 3: Split Horizontal
       Mobile: apilado vertical
       Desktop: izquierda / derecha
    ======================================== */

    .ux-panel-split-h {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
      min-height: 0;
      overflow: hidden;
    }

    .ux-panel-split-h__left,
    .ux-panel-split-h__right {
      min-height: 0;
      overflow: auto;
      -webkit-overflow-scrolling: touch;
    }

    /* Mobile: cada seccion scrollable vertical */
    .ux-panel-split-h__left {
      flex: 1;
      border-bottom: 1px solid var(--ux-border-color);
    }

    .ux-panel-split-h__right {
      flex: 1;
    }

    @media (min-width: 768px) {
      .ux-panel-split-h {
        flex-direction: row;
        gap: 0;
      }

      .ux-panel-split-h__left {
        flex: 0 0 35%;
        border-bottom: none;
        border-right: 1px solid var(--ux-border-color);
      }

      .ux-panel-split-h__right {
        flex: 1;
      }
    }

    /* Variant: 50/50 */
    @media (min-width: 768px) {
      .ux-panel-split-h--equal .ux-panel-split-h__left {
        flex: 0 0 50%;
      }
    }

    /* ========================================
       Panel 4: Split Vertical
       Arriba / Abajo (siempre vertical)
    ======================================== */

    .ux-panel-split-v {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
      min-height: 0;
      overflow: hidden;
    }

    .ux-panel-split-v__top {
      flex: 0 0 40%;
      min-height: 0;
      overflow: auto;
      -webkit-overflow-scrolling: touch;
      border-bottom: 1px solid var(--ux-border-color);
    }

    .ux-panel-split-v__bottom {
      flex: 1;
      min-height: 0;
      overflow: auto;
      -webkit-overflow-scrolling: touch;
    }

    /* Variant: 50/50 */
    .ux-panel-split-v--equal .ux-panel-split-v__top {
      flex: 1;
    }

    /* ========================================
       Panel 5: Detail
       Mobile: main visible, aside colapsable
       Desktop: main + aside lado a lado
    ======================================== */

    .ux-panel-detail {
      position: relative;
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
      min-height: 0;
      overflow: hidden;
    }

    .ux-panel-detail__main {
      flex: 1;
      min-height: 0;
      overflow: auto;
      -webkit-overflow-scrolling: touch;
    }

    /* Mobile: aside como drawer desde abajo */
    .ux-panel-detail__aside {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      max-height: 70vh;
      background-color: var(--ux-surface);
      border-top-left-radius: var(--ux-border-radius-xl);
      border-top-right-radius: var(--ux-border-radius-xl);
      box-shadow: var(--ux-shadow-xl);
      transform: translateY(100%);
      transition: transform var(--ux-transition-base) var(--ux-ease);
      z-index: var(--ux-z-modal);
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }

    .ux-panel-detail__aside.is-open {
      transform: translateY(0);
    }

    .ux-panel-detail__aside-header {
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: var(--ux-space-md) var(--ux-space-lg);
      border-bottom: 1px solid var(--ux-border-color);
    }

    .ux-panel-detail__aside-content {
      flex: 1;
      min-height: 0;
      overflow: auto;
      -webkit-overflow-scrolling: touch;
    }

    /* Toggle button para mostrar aside en mobile */
    .ux-panel-detail__toggle {
      position: fixed;
      bottom: var(--ux-space-lg);
      right: var(--ux-space-lg);
      width: var(--ux-panel-aside-toggle);
      height: var(--ux-panel-aside-toggle);
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: var(--ux-primary);
      color: var(--ux-primary-contrast);
      border-radius: 50%;
      box-shadow: var(--ux-shadow-lg);
      z-index: var(--ux-z-fixed);
      cursor: pointer;
      transition: transform var(--ux-transition-fast) var(--ux-ease);
    }

    .ux-panel-detail__toggle:active {
      transform: scale(0.95);
    }

    .ux-panel-detail__toggle svg {
      width: 24px;
      height: 24px;
    }

    /* Backdrop para aside */
    .ux-panel-detail__backdrop {
      position: fixed;
      inset: 0;
      background-color: rgba(0, 0, 0, 0.5);
      z-index: calc(var(--ux-z-modal) - 1);
      opacity: 0;
      visibility: hidden;
      transition: opacity var(--ux-transition-base) var(--ux-ease),
                  visibility var(--ux-transition-base) var(--ux-ease);
    }

    .ux-panel-detail__backdrop.is-visible {
      opacity: 1;
      visibility: visible;
    }

    @media (min-width: 768px) {
      .ux-panel-detail {
        flex-direction: row;
        gap: 0;
      }

      .ux-panel-detail__main {
        flex: 0 0 70%;
        border-right: 1px solid var(--ux-border-color);
      }

      .ux-panel-detail__aside {
        position: relative;
        bottom: auto;
        left: auto;
        right: auto;
        flex: 1;
        max-height: none;
        transform: none;
        border-radius: 0;
        box-shadow: none;
        z-index: auto;
      }

      .ux-panel-detail__aside-header {
        display: none;
      }

      .ux-panel-detail__toggle,
      .ux-panel-detail__backdrop {
        display: none;
      }
    }

    /* ========================================
       Panel 6: Form
       Header + contenido scrollable + acciones
    ======================================== */

    .ux-panel-form {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
      min-height: 0;
      overflow: hidden;
    }

    .ux-panel-form__header {
      flex-shrink: 0;
      height: var(--ux-panel-header);
      display: flex;
      align-items: center;
      gap: var(--ux-space-md);
      padding: 0 var(--ux-panel-gap);
      border-bottom: 1px solid var(--ux-border-color);
      background-color: var(--ux-surface);
    }

    .ux-panel-form__content {
      flex: 1;
      min-height: 0;
      overflow: auto;
      -webkit-overflow-scrolling: touch;
      padding: var(--ux-panel-gap);
    }

    .ux-panel-form__content-inner {
      width: 100%;
      max-width: 800px;
      margin: 0 auto;
    }

    .ux-panel-form__actions {
      flex-shrink: 0;
      height: var(--ux-panel-header);
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: var(--ux-space-md);
      padding: 0 var(--ux-panel-gap);
      border-top: 1px solid var(--ux-border-color);
      background-color: var(--ux-surface);
    }

    /* ========================================
       Panel 7: Analytics
       Filtros + KPIs + graficos + datos
    ======================================== */

    .ux-panel-analytics {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
      min-height: 0;
      overflow: hidden;
    }

    .ux-panel-analytics__filters {
      flex-shrink: 0;
      height: var(--ux-panel-filters);
      display: flex;
      align-items: center;
      gap: var(--ux-space-md);
      padding: 0 var(--ux-panel-gap);
      border-bottom: 1px solid var(--ux-border-color);
      background-color: var(--ux-surface);
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;
    }

    .ux-panel-analytics__scroll {
      flex: 1;
      min-height: 0;
      overflow: auto;
      -webkit-overflow-scrolling: touch;
    }

    .ux-panel-analytics__kpis {
      padding: var(--ux-panel-gap);
    }

    .ux-panel-analytics__charts {
      display: flex;
      flex-direction: column;
      gap: var(--ux-panel-gap);
      padding: 0 var(--ux-panel-gap);
    }

    .ux-panel-analytics__charts > * {
      min-height: 200px;
    }

    .ux-panel-analytics__data {
      padding: var(--ux-panel-gap);
    }

    @media (min-width: 768px) {
      .ux-panel-analytics__charts {
        flex-direction: row;
      }

      .ux-panel-analytics__charts > * {
        flex: 1;
      }
    }

    /* ========================================
       Panel 8: Settings
       Mobile: menu horizontal scrollable, contenido con toggle
       Desktop: menu lateral + contenido
    ======================================== */

    .ux-panel-settings {
      position: relative;
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
      min-height: 0;
      overflow: hidden;
    }

    /* Mobile: menu como tabs horizontales */
    .ux-panel-settings__menu {
      flex-shrink: 0;
      overflow-x: auto;
      overflow-y: hidden;
      border-bottom: 1px solid var(--ux-border-color);
      background-color: var(--ux-surface);
      -webkit-overflow-scrolling: touch;
    }

    .ux-panel-settings__menu-list {
      display: flex;
      min-width: max-content;
    }

    .ux-panel-settings__content {
      flex: 1;
      min-height: 0;
      overflow: auto;
      -webkit-overflow-scrolling: touch;
    }

    .ux-panel-settings__content-inner {
      width: 100%;
      max-width: 700px;
      margin: 0 auto;
      padding: var(--ux-panel-gap);
    }

    @media (min-width: 768px) {
      .ux-panel-settings {
        flex-direction: row;
      }

      .ux-panel-settings__menu {
        flex: 0 0 220px;
        overflow-x: hidden;
        overflow-y: auto;
        border-bottom: none;
        border-right: 1px solid var(--ux-border-color);
      }

      .ux-panel-settings__menu-list {
        flex-direction: column;
        min-width: 0;
      }
    }

    /* Settings menu item */
    .ux-panel-settings__menu-item {
      display: flex;
      align-items: center;
      gap: var(--ux-space-md);
      padding: var(--ux-space-md) var(--ux-space-lg);
      color: var(--ux-text-secondary);
      text-decoration: none;
      white-space: nowrap;
      transition: background-color var(--ux-transition-fast) var(--ux-ease),
                  color var(--ux-transition-fast) var(--ux-ease);
      cursor: pointer;
      border-bottom: 2px solid transparent;
    }

    .ux-panel-settings__menu-item:hover {
      background-color: var(--ux-surface-secondary);
      color: var(--ux-text);
      text-decoration: none;
    }

    .ux-panel-settings__menu-item--active {
      color: var(--ux-primary);
      border-bottom-color: var(--ux-primary);
    }

    @media (min-width: 768px) {
      .ux-panel-settings__menu-item {
        border-bottom: none;
        border-left: 3px solid transparent;
      }

      .ux-panel-settings__menu-item--active {
        background-color: rgba(var(--ux-primary-rgb), 0.1);
        border-left-color: var(--ux-primary);
      }
    }

    /* ========================================
       Panel 9: Cards
       Grid de cards con scroll
    ======================================== */

    .ux-panel-cards {
      width: 100%;
      height: 100%;
      min-height: 0;
      overflow: auto;
      -webkit-overflow-scrolling: touch;
      padding: var(--ux-panel-gap);
    }

    .ux-panel-cards__grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: var(--ux-panel-gap);
    }

    @media (min-width: 576px) {
      .ux-panel-cards__grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (min-width: 768px) {
      .ux-panel-cards__grid {
        grid-template-columns: repeat(3, 1fr);
      }
    }

    @media (min-width: 992px) {
      .ux-panel-cards__grid {
        grid-template-columns: repeat(4, 1fr);
      }
    }

    .ux-panel-cards__grid--auto {
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    }

    /* ========================================
       Panel 10: Grid 2x2
       Mobile: stack vertical
       Desktop: 4 secciones en grid
    ======================================== */

    .ux-panel-grid-2x2 {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
      min-height: 0;
      overflow: hidden;
    }

    .ux-panel-grid-2x2__cell {
      flex: 1;
      min-height: 0;
      overflow: auto;
      -webkit-overflow-scrolling: touch;
      border-bottom: 1px solid var(--ux-border-color);
    }

    .ux-panel-grid-2x2__cell:last-child {
      border-bottom: none;
    }

    @media (min-width: 768px) {
      .ux-panel-grid-2x2 {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: repeat(2, 1fr);
        gap: 1px;
        background-color: var(--ux-border-color);
      }

      .ux-panel-grid-2x2__cell {
        border-bottom: none;
        background-color: var(--ux-surface-secondary);
      }
    }

    /* ========================================
       Panel 11: Grid 1-2
       Mobile: stack vertical
       Desktop: 1 arriba + 2 abajo
    ======================================== */

    .ux-panel-grid-1-2 {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
      min-height: 0;
      overflow: hidden;
    }

    .ux-panel-grid-1-2__top {
      flex: 1;
      min-height: 0;
      overflow: auto;
      -webkit-overflow-scrolling: touch;
      border-bottom: 1px solid var(--ux-border-color);
    }

    .ux-panel-grid-1-2__bottom {
      flex: 1;
      display: flex;
      flex-direction: column;
      min-height: 0;
    }

    .ux-panel-grid-1-2__bottom-left,
    .ux-panel-grid-1-2__bottom-right {
      flex: 1;
      min-height: 0;
      overflow: auto;
      -webkit-overflow-scrolling: touch;
      border-bottom: 1px solid var(--ux-border-color);
    }

    .ux-panel-grid-1-2__bottom-right {
      border-bottom: none;
    }

    @media (min-width: 768px) {
      .ux-panel-grid-1-2__top {
        flex: 0 0 40%;
      }

      .ux-panel-grid-1-2__bottom {
        flex: 1;
        flex-direction: row;
      }

      .ux-panel-grid-1-2__bottom-left {
        flex: 1;
        border-bottom: none;
        border-right: 1px solid var(--ux-border-color);
      }

      .ux-panel-grid-1-2__bottom-right {
        flex: 1;
      }
    }

    /* ========================================
       Panel 12: Grid 2-1
       Mobile: stack vertical
       Desktop: 2 arriba + 1 abajo
    ======================================== */

    .ux-panel-grid-2-1 {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
      min-height: 0;
      overflow: hidden;
    }

    .ux-panel-grid-2-1__top {
      flex: 1;
      display: flex;
      flex-direction: column;
      min-height: 0;
    }

    .ux-panel-grid-2-1__top-left,
    .ux-panel-grid-2-1__top-right {
      flex: 1;
      min-height: 0;
      overflow: auto;
      -webkit-overflow-scrolling: touch;
      border-bottom: 1px solid var(--ux-border-color);
    }

    .ux-panel-grid-2-1__bottom {
      flex: 1;
      min-height: 0;
      overflow: auto;
      -webkit-overflow-scrolling: touch;
    }

    @media (min-width: 768px) {
      .ux-panel-grid-2-1__top {
        flex: 0 0 60%;
        flex-direction: row;
        border-bottom: 1px solid var(--ux-border-color);
      }

      .ux-panel-grid-2-1__top-left {
        flex: 1;
        border-bottom: none;
        border-right: 1px solid var(--ux-border-color);
      }

      .ux-panel-grid-2-1__top-right {
        flex: 1;
        border-bottom: none;
      }

      .ux-panel-grid-2-1__bottom {
        flex: 1;
      }
    }

    /* ========================================
       Panel Content Card
    ======================================== */

    .ux-panel-card {
      display: flex;
      flex-direction: column;
      height: 100%;
      min-height: 0;
      background-color: var(--ux-surface);
      border-radius: var(--ux-border-radius-lg);
      border: 1px solid var(--ux-border-color);
      overflow: hidden;
    }

    .ux-panel-card--shadow {
      border: none;
      box-shadow: var(--ux-shadow-md);
    }

    .ux-panel-card__header {
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: var(--ux-space-md) var(--ux-space-lg);
      border-bottom: 1px solid var(--ux-border-color);
    }

    .ux-panel-card__title {
      font-size: var(--ux-font-size-md);
      font-weight: 600;
      color: var(--ux-text);
    }

    .ux-panel-card__subtitle {
      font-size: var(--ux-font-size-sm);
      color: var(--ux-text-secondary);
      margin-top: 2px;
    }

    .ux-panel-card__actions {
      display: flex;
      align-items: center;
      gap: var(--ux-space-sm);
    }

    .ux-panel-card__body {
      flex: 1;
      min-height: 0;
      overflow: auto;
      -webkit-overflow-scrolling: touch;
      padding: var(--ux-space-lg);
    }

    .ux-panel-card__body--flush {
      padding: 0;
    }

    .ux-panel-card__footer {
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      padding: var(--ux-space-md) var(--ux-space-lg);
      border-top: 1px solid var(--ux-border-color);
      gap: var(--ux-space-sm);
    }

    /* ========================================
       KPI Card
    ======================================== */

    .ux-panel-kpi {
      display: flex;
      flex-direction: column;
      padding: var(--ux-space-lg);
      background-color: var(--ux-surface);
      border-radius: var(--ux-border-radius-lg);
      border: 1px solid var(--ux-border-color);
    }

    .ux-panel-kpi__label {
      font-size: var(--ux-font-size-sm);
      color: var(--ux-text-secondary);
      margin-bottom: var(--ux-space-xs);
    }

    .ux-panel-kpi__value {
      font-size: var(--ux-font-size-2xl);
      font-weight: 700;
      color: var(--ux-text);
      line-height: 1.2;
    }

    .ux-panel-kpi__trend {
      display: flex;
      align-items: center;
      gap: var(--ux-space-xs);
      margin-top: var(--ux-space-sm);
      font-size: var(--ux-font-size-sm);
    }

    .ux-panel-kpi__trend--up { color: var(--ux-success); }
    .ux-panel-kpi__trend--down { color: var(--ux-danger); }
    .ux-panel-kpi__trend--neutral { color: var(--ux-text-tertiary); }

    /* KPI Grid - horizontal scroll on mobile */
    .ux-panel-kpi-grid {
      display: flex;
      gap: var(--ux-panel-gap);
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;
      padding-bottom: var(--ux-space-sm);
    }

    .ux-panel-kpi-grid > * {
      flex: 0 0 auto;
      min-width: 150px;
    }

    @media (min-width: 576px) {
      .ux-panel-kpi-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        overflow-x: visible;
        padding-bottom: 0;
      }

      .ux-panel-kpi-grid > * {
        min-width: 0;
      }
    }

    @media (min-width: 992px) {
      .ux-panel-kpi-grid {
        grid-template-columns: repeat(4, 1fr);
      }
    }

    /* ========================================
       Empty & Loading States
    ======================================== */

    .ux-panel-empty {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: var(--ux-space-3xl);
      text-align: center;
      color: var(--ux-text-secondary);
    }

    .ux-panel-empty__icon {
      width: 64px;
      height: 64px;
      margin-bottom: var(--ux-space-lg);
      color: var(--ux-text-tertiary);
    }

    .ux-panel-empty__title {
      font-size: var(--ux-font-size-lg);
      font-weight: 600;
      color: var(--ux-text);
      margin-bottom: var(--ux-space-sm);
    }

    .ux-panel-empty__description {
      font-size: var(--ux-font-size-base);
      max-width: 400px;
      margin-bottom: var(--ux-space-xl);
    }

    .ux-panel-loading {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: var(--ux-space-3xl);
    }

    /* ========================================
       Fullscreen Panel
    ======================================== */

    .ux-panel-fullscreen {
      position: fixed;
      inset: 0;
      z-index: var(--ux-z-modal);
      background-color: var(--ux-background);
      display: flex;
      flex-direction: column;
    }

    .ux-panel-fullscreen__header {
      flex-shrink: 0;
      height: var(--ux-panel-header);
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 var(--ux-space-lg);
      background-color: var(--ux-surface);
      border-bottom: 1px solid var(--ux-border-color);
    }

    .ux-panel-fullscreen__content {
      flex: 1;
      min-height: 0;
      overflow: auto;
      -webkit-overflow-scrolling: touch;
    }
  `;

  // Inject styles
  if (window.UX) {
    window.UX.injectStyles('ux-panel-styles', styles);
  } else {
    const styleEl = document.createElement('style');
    styleEl.id = 'ux-panel-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }

  // Alpine component for panel detail (with aside toggle)
  const panelDetailComponent = (config = {}) => ({
    asideOpen: false,

    init() {
      // Close aside on escape
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.asideOpen) {
          this.closeAside();
        }
      });
    },

    toggleAside() {
      this.asideOpen = !this.asideOpen;
      if (this.asideOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    },

    openAside() {
      this.asideOpen = true;
      document.body.style.overflow = 'hidden';
    },

    closeAside() {
      this.asideOpen = false;
      document.body.style.overflow = '';
    }
  });

  // Alpine component for panels with HTMX support
  const panelComponent = (config = {}) => ({
    loading: config.loading || false,
    error: null,

    init() {
      // Listen for HTMX events on sections
      this.$el.addEventListener('htmx:beforeRequest', (e) => {
        const section = e.target.closest('[class*="__"]');
        if (section) {
          section.classList.add('is-loading');
        }
      });

      this.$el.addEventListener('htmx:afterRequest', (e) => {
        const section = e.target.closest('[class*="__"]');
        if (section) {
          section.classList.remove('is-loading');
        }
      });

      this.$el.addEventListener('htmx:responseError', (e) => {
        const section = e.target.closest('[class*="__"]');
        if (section) {
          section.classList.add('is-error');
        }
      });
    },

    refresh(sectionId) {
      const section = document.getElementById(sectionId);
      if (section && typeof htmx !== 'undefined') {
        htmx.trigger(section, 'refresh');
      }
    },

    refreshAll() {
      const sections = this.$el.querySelectorAll('[hx-get], [hx-post]');
      sections.forEach(section => {
        if (typeof htmx !== 'undefined') {
          htmx.trigger(section, 'refresh');
        }
      });
    }
  });

  // Sync horizontal scroll between table header and body
  // Uses requestAnimationFrame throttling for performance
  const syncTableScroll = (wrapper) => {
    const header = wrapper.querySelector('.ux-panel-table-wrapper__header');
    const body = wrapper.querySelector('.ux-panel-table-wrapper__body');

    if (header && body) {
      let bodyTicking = false;
      let headerTicking = false;

      body.addEventListener('scroll', () => {
        if (!bodyTicking) {
          requestAnimationFrame(() => {
            header.scrollLeft = body.scrollLeft;
            bodyTicking = false;
          });
          bodyTicking = true;
        }
      });

      header.addEventListener('scroll', () => {
        if (!headerTicking) {
          requestAnimationFrame(() => {
            body.scrollLeft = header.scrollLeft;
            headerTicking = false;
          });
          headerTicking = true;
        }
      });
    }
  };

  // Auto-init table wrappers
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.ux-panel-table-wrapper').forEach(syncTableScroll);
  });

  // Register components
  if (window.UX) {
    window.UX.registerComponent('uxPanel', panelComponent);
    window.UX.registerComponent('uxPanelDetail', panelDetailComponent);
    window.UX.syncTableScroll = syncTableScroll;
  } else {
    document.addEventListener('alpine:init', () => {
      Alpine.data('uxPanel', panelComponent);
      Alpine.data('uxPanelDetail', panelDetailComponent);
    });
  }
})();
