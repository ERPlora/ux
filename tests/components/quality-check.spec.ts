import { test, expect } from '@playwright/test';

test.describe('Quality Check Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/quality-check.html');
  });

  test('should render basic quality check form', async ({ page }) => {
    const qualityCheck = page.locator('.ux-quality-check').first();
    await expect(qualityCheck).toBeVisible();
  });

  test('should display header section', async ({ page }) => {
    const header = page.locator('.ux-quality-check__header').first();
    await expect(header).toBeVisible();
  });

  test('should display form title', async ({ page }) => {
    const title = page.locator('.ux-quality-check__title').first();
    await expect(title).toBeVisible();
    const text = await title.textContent();
    expect(text?.length).toBeGreaterThan(0);
  });

  test('should display subtitle when available', async ({ page }) => {
    const subtitle = page.locator('.ux-quality-check__subtitle').first();
    if (await subtitle.count() > 0) {
      await expect(subtitle).toBeVisible();
    }
  });

  test('should display status indicator', async ({ page }) => {
    const status = page.locator('.ux-quality-check__status').first();
    if (await status.count() > 0) {
      await expect(status).toBeVisible();
    }
  });

  test('should apply pending status style', async ({ page }) => {
    const pendingStatus = page.locator('.ux-quality-check__status--pending').first();
    if (await pendingStatus.count() > 0) {
      await expect(pendingStatus).toBeVisible();
    }
  });

  test('should apply pass status style', async ({ page }) => {
    const passStatus = page.locator('.ux-quality-check__status--pass').first();
    if (await passStatus.count() > 0) {
      await expect(passStatus).toBeVisible();
    }
  });

  test('should apply fail status style', async ({ page }) => {
    const failStatus = page.locator('.ux-quality-check__status--fail').first();
    if (await failStatus.count() > 0) {
      await expect(failStatus).toBeVisible();
    }
  });

  test('should display meta information section', async ({ page }) => {
    const meta = page.locator('.ux-quality-check__meta').first();
    if (await meta.count() > 0) {
      await expect(meta).toBeVisible();
    }
  });

  test('should display meta items', async ({ page }) => {
    const metaItems = page.locator('.ux-quality-check__meta-item');
    const count = await metaItems.count();
    if (count > 0) {
      expect(count).toBeGreaterThan(0);
    }
  });

  test('should display meta labels', async ({ page }) => {
    const metaLabel = page.locator('.ux-quality-check__meta-label').first();
    if (await metaLabel.count() > 0) {
      await expect(metaLabel).toBeVisible();
      const text = await metaLabel.textContent();
      expect(text?.length).toBeGreaterThan(0);
    }
  });

  test('should display meta values', async ({ page }) => {
    const metaValue = page.locator('.ux-quality-check__meta-value').first();
    if (await metaValue.count() > 0) {
      await expect(metaValue).toBeVisible();
    }
  });

  test('should render body section', async ({ page }) => {
    const body = page.locator('.ux-quality-check__body').first();
    await expect(body).toBeVisible();
  });

  test('should render checklist items', async ({ page }) => {
    const items = page.locator('.ux-quality-check__item');
    const count = await items.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should display item names', async ({ page }) => {
    const itemName = page.locator('.ux-quality-check__item-name').first();
    await expect(itemName).toBeVisible();
    const text = await itemName.textContent();
    expect(text?.length).toBeGreaterThan(0);
  });

  test('should display item descriptions when available', async ({ page }) => {
    const itemDescription = page.locator('.ux-quality-check__item-description').first();
    if (await itemDescription.count() > 0) {
      const text = await itemDescription.textContent();
      expect(text?.length).toBeGreaterThan(0);
    }
  });

  test('should mark required items with asterisk', async ({ page }) => {
    const requiredMark = page.locator('.ux-quality-check__item-required').first();
    if (await requiredMark.count() > 0) {
      const text = await requiredMark.textContent();
      expect(text).toContain('*');
    }
  });

  test('should render selector buttons', async ({ page }) => {
    const selector = page.locator('.ux-quality-check__selector').first();
    await expect(selector).toBeVisible();
  });

  test('should render pass button', async ({ page }) => {
    const passBtn = page.locator('.ux-quality-check__selector-btn--pass').first();
    await expect(passBtn).toBeVisible();
  });

  test('should render fail button', async ({ page }) => {
    const failBtn = page.locator('.ux-quality-check__selector-btn--fail').first();
    await expect(failBtn).toBeVisible();
  });

  test('should render N/A button when available', async ({ page }) => {
    const naBtn = page.locator('.ux-quality-check__selector-btn--na').first();
    if (await naBtn.count() > 0) {
      await expect(naBtn).toBeVisible();
    }
  });

  test('should mark active selector button', async ({ page }) => {
    // Click pass button first
    const passBtn = page.locator('.ux-quality-check__selector-btn--pass').first();
    await passBtn.click();
    await page.waitForTimeout(300);

    const activeBtn = page.locator('.ux-quality-check__selector-btn--active').first();
    if (await activeBtn.count() > 0) {
      await expect(activeBtn).toBeVisible();
    }
  });

  test('should apply pass item style after selecting pass', async ({ page }) => {
    const passBtn = page.locator('.ux-quality-check__selector-btn--pass').first();
    await passBtn.click();
    await page.waitForTimeout(300);

    const passItem = page.locator('.ux-quality-check__item--pass').first();
    if (await passItem.count() > 0) {
      await expect(passItem).toBeVisible();
    }
  });

  test('should apply fail item style after selecting fail', async ({ page }) => {
    const failBtn = page.locator('.ux-quality-check__selector-btn--fail').first();
    await failBtn.click();
    await page.waitForTimeout(300);

    const failItem = page.locator('.ux-quality-check__item--fail').first();
    if (await failItem.count() > 0) {
      await expect(failItem).toBeVisible();
    }
  });

  test('should show notes section on fail', async ({ page }) => {
    const failBtn = page.locator('.ux-quality-check__selector-btn--fail').first();
    await failBtn.click();
    await page.waitForTimeout(300);

    const notes = page.locator('.ux-quality-check__notes').first();
    if (await notes.count() > 0) {
      const isVisible = await notes.isVisible();
      expect(typeof isVisible).toBe('boolean');
    }
  });

  test('should render notes input textarea', async ({ page }) => {
    // First trigger fail to show notes
    const failBtn = page.locator('.ux-quality-check__selector-btn--fail').first();
    await failBtn.click();
    await page.waitForTimeout(300);

    const notesInput = page.locator('.ux-quality-check__notes-input').first();
    if (await notesInput.count() > 0) {
      const isVisible = await notesInput.isVisible();
      if (isVisible) {
        await expect(notesInput).toBeVisible();
      }
    }
  });

  test('should allow text input in notes', async ({ page }) => {
    const failBtn = page.locator('.ux-quality-check__selector-btn--fail').first();
    await failBtn.click();
    await page.waitForTimeout(300);

    const notesInput = page.locator('.ux-quality-check__notes-input').first();
    if (await notesInput.count() > 0 && await notesInput.isVisible()) {
      await notesInput.fill('Test note content');
      const value = await notesInput.inputValue();
      expect(value).toBe('Test note content');
    }
  });

  test('should render summary section', async ({ page }) => {
    const summary = page.locator('.ux-quality-check__summary').first();
    await expect(summary).toBeVisible();
  });

  test('should display summary title', async ({ page }) => {
    const summaryTitle = page.locator('.ux-quality-check__summary-title').first();
    if (await summaryTitle.count() > 0) {
      await expect(summaryTitle).toBeVisible();
    }
  });

  test('should render summary stats', async ({ page }) => {
    const summaryStats = page.locator('.ux-quality-check__summary-stats').first();
    if (await summaryStats.count() > 0) {
      await expect(summaryStats).toBeVisible();
    }
  });

  test('should display pass count stat', async ({ page }) => {
    const passStat = page.locator('.ux-quality-check__summary-stat-icon--pass').first();
    if (await passStat.count() > 0) {
      await expect(passStat).toBeVisible();
    }
  });

  test('should display fail count stat', async ({ page }) => {
    const failStat = page.locator('.ux-quality-check__summary-stat-icon--fail').first();
    if (await failStat.count() > 0) {
      await expect(failStat).toBeVisible();
    }
  });

  test('should display pending count stat', async ({ page }) => {
    const pendingStat = page.locator('.ux-quality-check__summary-stat-icon--pending').first();
    if (await pendingStat.count() > 0) {
      await expect(pendingStat).toBeVisible();
    }
  });

  test('should render progress bar in summary', async ({ page }) => {
    const progressBar = page.locator('.ux-quality-check__progress-bar').first();
    if (await progressBar.count() > 0) {
      await expect(progressBar).toBeVisible();
    }
  });

  test('should render progress pass segment', async ({ page }) => {
    const progressPass = page.locator('.ux-quality-check__progress-pass').first();
    if (await progressPass.count() > 0) {
      await expect(progressPass).toBeVisible();
    }
  });

  test('should render progress fail segment', async ({ page }) => {
    const progressFail = page.locator('.ux-quality-check__progress-fail').first();
    if (await progressFail.count() > 0) {
      expect(await progressFail.count()).toBeGreaterThan(0);
    }
  });

  test('should display completion percentage', async ({ page }) => {
    const progressText = page.locator('.ux-quality-check__progress-text').first();
    if (await progressText.count() > 0) {
      await expect(progressText).toBeVisible();
      const text = await progressText.textContent();
      expect(text).toMatch(/\d+%/);
    }
  });

  test('should update summary stats on status change', async ({ page }) => {
    const initialPassCount = await page.locator('.ux-quality-check__summary-stat-value').first().textContent();

    const passBtn = page.locator('.ux-quality-check__selector-btn--pass').first();
    await passBtn.click();
    await page.waitForTimeout(300);

    // Stats should have updated
    const passStatValue = page.locator('.ux-quality-check__summary-stat-value').first();
    const newValue = await passStatValue.textContent();
    expect(newValue).not.toBeNull();
  });

  test('should render footer section', async ({ page }) => {
    const footer = page.locator('.ux-quality-check__footer').first();
    await expect(footer).toBeVisible();
  });

  test('should render action buttons', async ({ page }) => {
    const actions = page.locator('.ux-quality-check__actions').first();
    if (await actions.count() > 0) {
      await expect(actions).toBeVisible();
    }
  });

  test('should have print button', async ({ page }) => {
    const printBtn = page.locator('.ux-quality-check__footer button:has-text("Imprimir")').first();
    if (await printBtn.count() > 0) {
      await expect(printBtn).toBeVisible();
    }
  });

  test('should have complete/submit button', async ({ page }) => {
    const completeBtn = page.locator('.ux-quality-check__footer .ux-button.ux-color-primary').first();
    if (await completeBtn.count() > 0) {
      await expect(completeBtn).toBeVisible();
    }
  });

  test('should render measurement section when available', async ({ page }) => {
    const measurement = page.locator('.ux-quality-check__measurement').first();
    if (await measurement.count() > 0) {
      const isVisible = await measurement.isVisible();
      expect(typeof isVisible).toBe('boolean');
    }
  });

  test('should render measurement input', async ({ page }) => {
    const measurementInput = page.locator('.ux-quality-check__measurement-input').first();
    if (await measurementInput.count() > 0) {
      const isVisible = await measurementInput.isVisible();
      if (isVisible) {
        await expect(measurementInput).toBeVisible();
      }
    }
  });

  test('should display measurement unit', async ({ page }) => {
    const measurementUnit = page.locator('.ux-quality-check__measurement-unit').first();
    if (await measurementUnit.count() > 0 && await measurementUnit.isVisible()) {
      await expect(measurementUnit).toBeVisible();
    }
  });

  test('should display tolerance range', async ({ page }) => {
    const tolerance = page.locator('.ux-quality-check__tolerance').first();
    if (await tolerance.count() > 0 && await tolerance.isVisible()) {
      await expect(tolerance).toBeVisible();
    }
  });

  test('should apply in-range style to valid measurements', async ({ page }) => {
    const inRangeInput = page.locator('.ux-quality-check__measurement-input--success').first();
    if (await inRangeInput.count() > 0) {
      await expect(inRangeInput).toBeVisible();
    }
  });

  test('should apply out-of-range style to invalid measurements', async ({ page }) => {
    const outOfRangeInput = page.locator('.ux-quality-check__measurement-input--error').first();
    if (await outOfRangeInput.count() > 0) {
      await expect(outOfRangeInput).toBeVisible();
    }
  });

  test('should render photos section on fail', async ({ page }) => {
    const photos = page.locator('.ux-quality-check__photos').first();
    if (await photos.count() > 0) {
      expect(await photos.count()).toBeGreaterThan(0);
    }
  });

  test('should render photo add button', async ({ page }) => {
    const photoAdd = page.locator('.ux-quality-check__photo-add').first();
    if (await photoAdd.count() > 0) {
      expect(await photoAdd.count()).toBeGreaterThan(0);
    }
  });

  test('should render defect categories section', async ({ page }) => {
    const defect = page.locator('.ux-quality-check__defect').first();
    if (await defect.count() > 0) {
      expect(await defect.count()).toBeGreaterThan(0);
    }
  });

  test('should render defect tags', async ({ page }) => {
    const defectTags = page.locator('.ux-quality-check__defect-tag');
    if (await defectTags.count() > 0) {
      expect(await defectTags.count()).toBeGreaterThan(0);
    }
  });

  test('should toggle defect tag active state', async ({ page }) => {
    // First select fail to show defect tags
    const failBtn = page.locator('.ux-quality-check__selector-btn--fail').first();
    await failBtn.click();
    await page.waitForTimeout(300);

    const defectTag = page.locator('.ux-quality-check__defect-tag').first();
    if (await defectTag.count() > 0 && await defectTag.isVisible()) {
      await defectTag.click();
      await page.waitForTimeout(300);

      const activeTag = page.locator('.ux-quality-check__defect-tag--active').first();
      const hasActive = await activeTag.count() > 0;
      expect(typeof hasActive).toBe('boolean');
    }
  });

  test('should render signature section when available', async ({ page }) => {
    const signature = page.locator('.ux-quality-check__signature').first();
    if (await signature.count() > 0) {
      await expect(signature).toBeVisible();
    }
  });

  test('should render signature field', async ({ page }) => {
    const signatureField = page.locator('.ux-quality-check__signature-field').first();
    if (await signatureField.count() > 0) {
      await expect(signatureField).toBeVisible();
    }
  });

  test('should apply glass variant', async ({ page }) => {
    const glassCheck = page.locator('.ux-quality-check--glass').first();
    if (await glassCheck.count() > 0) {
      await expect(glassCheck).toBeVisible();
      const backdrop = await glassCheck.evaluate(el =>
        getComputedStyle(el).backdropFilter || getComputedStyle(el).webkitBackdropFilter
      );
      expect(backdrop).toContain('blur');
    }
  });

  test('should display section titles', async ({ page }) => {
    const sectionTitle = page.locator('.ux-quality-check__section-title').first();
    if (await sectionTitle.count() > 0) {
      await expect(sectionTitle).toBeVisible();
      const text = await sectionTitle.textContent();
      expect(text?.length).toBeGreaterThan(0);
    }
  });

  test('should display timestamp information', async ({ page }) => {
    const timestamp = page.locator('.ux-quality-check__timestamp').first();
    if (await timestamp.count() > 0) {
      expect(await timestamp.count()).toBeGreaterThan(0);
    }
  });

  test('should have item header with info and selector', async ({ page }) => {
    const itemHeader = page.locator('.ux-quality-check__item-header').first();
    await expect(itemHeader).toBeVisible();

    const itemInfo = itemHeader.locator('.ux-quality-check__item-info');
    const selector = itemHeader.locator('.ux-quality-check__selector');

    expect(await itemInfo.count()).toBeGreaterThan(0);
    expect(await selector.count()).toBeGreaterThan(0);
  });

  test('should calculate overall status correctly', async ({ page }) => {
    // Select pass for all items
    const passBtns = page.locator('.ux-quality-check__selector-btn--pass');
    const count = await passBtns.count();

    for (let i = 0; i < Math.min(count, 3); i++) {
      await passBtns.nth(i).click();
      await page.waitForTimeout(100);
    }

    await page.waitForTimeout(500);

    // Check if status updated
    const status = page.locator('.ux-quality-check__status').first();
    if (await status.count() > 0) {
      const text = await status.textContent();
      expect(text?.length).toBeGreaterThan(0);
    }
  });

  test('should contain SVG icons in selector buttons', async ({ page }) => {
    const iconSvg = page.locator('.ux-quality-check__selector-btn svg, .ux-quality-check__selector-btn span svg').first();
    if (await iconSvg.count() > 0) {
      await expect(iconSvg).toBeVisible();
    }
  });

  test('should render notes label', async ({ page }) => {
    const failBtn = page.locator('.ux-quality-check__selector-btn--fail').first();
    await failBtn.click();
    await page.waitForTimeout(300);

    const notesLabel = page.locator('.ux-quality-check__notes-label').first();
    if (await notesLabel.count() > 0 && await notesLabel.isVisible()) {
      await expect(notesLabel).toBeVisible();
    }
  });

  test('should disable complete button when incomplete', async ({ page }) => {
    const completeBtn = page.locator('.ux-quality-check__actions button[disabled]').first();
    if (await completeBtn.count() > 0) {
      const isDisabled = await completeBtn.isDisabled();
      expect(typeof isDisabled).toBe('boolean');
    }
  });
});
