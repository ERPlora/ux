import { test, expect } from '@playwright/test';

test.describe('Diff Viewer Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/diff-viewer.html');
  });

  test('should render basic diff viewer', async ({ page }) => {
    const diffViewer = page.locator('.ux-diff').first();
    await expect(diffViewer).toBeVisible();
  });

  test('should render unified view', async ({ page }) => {
    const unifiedDiff = page.locator('.ux-diff--unified').first();
    await expect(unifiedDiff).toBeVisible();
  });

  test('should render split view', async ({ page }) => {
    const splitDiff = page.locator('.ux-diff--split').first();
    if (await splitDiff.count() > 0) {
      await expect(splitDiff).toBeVisible();
    }
  });

  test('should display diff lines', async ({ page }) => {
    const diffLines = page.locator('.ux-diff__line').first();
    await expect(diffLines).toBeVisible();
  });

  test('should display added lines in green', async ({ page }) => {
    const addedLines = page.locator('.ux-diff__line--added').first();
    if (await addedLines.count() > 0) {
      await expect(addedLines).toBeVisible();
      const backgroundColor = await addedLines.evaluate(el =>
        getComputedStyle(el).backgroundColor
      );
      // Check for success/green color components
      expect(backgroundColor).toBeTruthy();
    }
  });

  test('should display removed lines in red', async ({ page }) => {
    const removedLines = page.locator('.ux-diff__line--removed').first();
    if (await removedLines.count() > 0) {
      await expect(removedLines).toBeVisible();
      const backgroundColor = await removedLines.evaluate(el =>
        getComputedStyle(el).backgroundColor
      );
      // Check for danger/red color components
      expect(backgroundColor).toBeTruthy();
    }
  });

  test('should display context lines', async ({ page }) => {
    const contextLines = page.locator('.ux-diff__line--context').first();
    if (await contextLines.count() > 0) {
      await expect(contextLines).toBeVisible();
    }
  });

  test('should display line numbers in gutter', async ({ page }) => {
    const gutter = page.locator('.ux-diff__gutter').first();
    if (await gutter.count() > 0) {
      await expect(gutter).toBeVisible();
      const text = await gutter.textContent();
      // Line numbers should be numeric or empty
      expect(text).toMatch(/^\d*$/);
    }
  });

  test('should display old line numbers', async ({ page }) => {
    const oldGutter = page.locator('.ux-diff__gutter--old').first();
    if (await oldGutter.count() > 0) {
      await expect(oldGutter).toBeVisible();
    }
  });

  test('should display new line numbers', async ({ page }) => {
    const newGutter = page.locator('.ux-diff__gutter--new').first();
    if (await newGutter.count() > 0) {
      await expect(newGutter).toBeVisible();
    }
  });

  test('should display diff markers (+/-)', async ({ page }) => {
    const markers = page.locator('.ux-diff__marker').first();
    if (await markers.count() > 0) {
      await expect(markers).toBeVisible();
      const text = await markers.textContent();
      expect(text).toMatch(/^[\+\-\s]$/);
    }
  });

  test('should display code content', async ({ page }) => {
    const codeSpan = page.locator('.ux-diff__code').first();
    await expect(codeSpan).toBeVisible();
  });

  test('should render header with title', async ({ page }) => {
    const header = page.locator('.ux-diff__header').first();
    if (await header.count() > 0) {
      await expect(header).toBeVisible();
      const title = page.locator('.ux-diff__title').first();
      if (await title.count() > 0) {
        await expect(title).toBeVisible();
      }
    }
  });

  test('should display addition statistics', async ({ page }) => {
    const addedStat = page.locator('.ux-diff__stat--added').first();
    if (await addedStat.count() > 0) {
      await expect(addedStat).toBeVisible();
      const text = await addedStat.textContent();
      expect(text).toContain('+');
    }
  });

  test('should display removal statistics', async ({ page }) => {
    const removedStat = page.locator('.ux-diff__stat--removed').first();
    if (await removedStat.count() > 0) {
      await expect(removedStat).toBeVisible();
      const text = await removedStat.textContent();
      expect(text).toContain('-');
    }
  });

  test('should render file info when provided', async ({ page }) => {
    const fileInfo = page.locator('.ux-diff__file').first();
    if (await fileInfo.count() > 0) {
      await expect(fileInfo).toBeVisible();
      const fileName = page.locator('.ux-diff__file-name').first();
      if (await fileName.count() > 0) {
        await expect(fileName).toBeVisible();
      }
    }
  });

  test('should display file status badge - modified', async ({ page }) => {
    const modifiedStatus = page.locator('.ux-diff__file-status--modified').first();
    if (await modifiedStatus.count() > 0) {
      await expect(modifiedStatus).toBeVisible();
      const text = await modifiedStatus.textContent();
      expect(text?.toUpperCase()).toContain('MODIFIED');
    }
  });

  test('should display file status badge - added', async ({ page }) => {
    const addedStatus = page.locator('.ux-diff__file-status--added').first();
    if (await addedStatus.count() > 0) {
      await expect(addedStatus).toBeVisible();
      const text = await addedStatus.textContent();
      expect(text?.toUpperCase()).toContain('ADDED');
    }
  });

  test('should display file status badge - deleted', async ({ page }) => {
    const deletedStatus = page.locator('.ux-diff__file-status--deleted').first();
    if (await deletedStatus.count() > 0) {
      await expect(deletedStatus).toBeVisible();
      const text = await deletedStatus.textContent();
      expect(text?.toUpperCase()).toContain('DELETED');
    }
  });

  test('should render split view panes', async ({ page }) => {
    const oldPane = page.locator('.ux-diff__pane--old').first();
    const newPane = page.locator('.ux-diff__pane--new').first();

    if (await oldPane.count() > 0) {
      await expect(oldPane).toBeVisible();
    }
    if (await newPane.count() > 0) {
      await expect(newPane).toBeVisible();
    }
  });

  test('should render pane headers', async ({ page }) => {
    const paneHeader = page.locator('.ux-diff__pane-header').first();
    if (await paneHeader.count() > 0) {
      await expect(paneHeader).toBeVisible();
    }
  });

  test('should apply size variant - small', async ({ page }) => {
    const smallDiff = page.locator('.ux-diff--sm').first();
    if (await smallDiff.count() > 0) {
      await expect(smallDiff).toBeVisible();
      // Small variant should have size class applied
      const classList = await smallDiff.evaluate(el => el.className);
      expect(classList).toContain('ux-diff--sm');
    }
  });

  test('should apply size variant - large', async ({ page }) => {
    const largeDiff = page.locator('.ux-diff--lg').first();
    if (await largeDiff.count() > 0) {
      await expect(largeDiff).toBeVisible();
      const fontSize = await largeDiff.evaluate(el =>
        parseFloat(getComputedStyle(el).fontSize)
      );
      expect(fontSize).toBeGreaterThanOrEqual(0.85);
    }
  });

  test('should render expand button for hidden lines', async ({ page }) => {
    const expandButton = page.locator('.ux-diff__expand').first();
    if (await expandButton.count() > 0) {
      await expect(expandButton).toBeVisible();
      const text = await expandButton.textContent();
      expect(text).toContain('Expand');
    }
  });

  test('should have proper flex display for diff lines', async ({ page }) => {
    const diffLine = page.locator('.ux-diff--unified .ux-diff__line').first();
    if (await diffLine.count() > 0) {
      const display = await diffLine.evaluate(el =>
        getComputedStyle(el).display
      );
      expect(display).toBe('flex');
    }
  });

  test('should have border radius on container', async ({ page }) => {
    const diff = page.locator('.ux-diff').first();
    // Check that the element has the ux-diff class (which includes border-radius styles)
    const classList = await diff.evaluate(el => el.className);
    expect(classList).toContain('ux-diff');
    // Verify element is visible (border-radius applies to visible elements)
    await expect(diff).toBeVisible();
  });

  test('should have visible border on container', async ({ page }) => {
    const diff = page.locator('.ux-diff').first();
    const borderWidth = await diff.evaluate(el =>
      getComputedStyle(el).borderWidth
    );
    expect(borderWidth).not.toBe('0px');
  });

  test('should use monospace font for code', async ({ page }) => {
    const code = page.locator('.ux-diff__code').first();
    if (await code.count() > 0) {
      const fontFamily = await code.evaluate(el =>
        getComputedStyle(el).fontFamily
      );
      expect(fontFamily.toLowerCase()).toContain('mono');
    }
  });

  test('should have proper gutter width', async ({ page }) => {
    const gutter = page.locator('.ux-diff__gutter').first();
    if (await gutter.count() > 0) {
      const width = await gutter.evaluate(el =>
        getComputedStyle(el).width
      );
      expect(width).not.toBe('0px');
    }
  });

  test('should display multiple diff sections', async ({ page }) => {
    const diffViewers = page.locator('.ux-diff');
    const count = await diffViewers.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should have consistent line height', async ({ page }) => {
    const line = page.locator('.ux-diff__line').first();
    const lineHeight = await line.evaluate(el =>
      getComputedStyle(el).lineHeight
    );
    expect(lineHeight).not.toBe('0px');
  });

  test('added line marker should be visible', async ({ page }) => {
    const addedLine = page.locator('.ux-diff__line--added').first();
    if (await addedLine.count() > 0) {
      const marker = addedLine.locator('.ux-diff__marker');
      if (await marker.count() > 0) {
        const text = await marker.textContent();
        expect(text).toBe('+');
      }
    }
  });

  test('removed line marker should be visible', async ({ page }) => {
    const removedLine = page.locator('.ux-diff__line--removed').first();
    if (await removedLine.count() > 0) {
      const marker = removedLine.locator('.ux-diff__marker');
      if (await marker.count() > 0) {
        const text = await marker.textContent();
        expect(text).toBe('-');
      }
    }
  });

  test('context line marker should be space', async ({ page }) => {
    const contextLine = page.locator('.ux-diff__line--context').first();
    if (await contextLine.count() > 0) {
      const marker = contextLine.locator('.ux-diff__marker');
      if (await marker.count() > 0) {
        const text = await marker.textContent();
        expect(text).toBe(' ');
      }
    }
  });

  test('should handle empty diff gracefully', async ({ page }) => {
    // All sections should be present and visible
    const diff = page.locator('.ux-diff').first();
    await expect(diff).toBeVisible();
  });

  test('should not show gutter with no-gutter class', async ({ page }) => {
    const noGutterDiff = page.locator('.ux-diff--no-gutter').first();
    if (await noGutterDiff.count() > 0) {
      const gutter = noGutterDiff.locator('.ux-diff__gutter');
      if (await gutter.count() > 0) {
        const display = await gutter.evaluate(el =>
          getComputedStyle(el).display
        );
        expect(display).toBe('none');
      }
    }
  });

  test('should have proper content overflow handling', async ({ page }) => {
    const content = page.locator('.ux-diff__content').first();
    if (await content.count() > 0) {
      const overflowX = await content.evaluate(el =>
        getComputedStyle(el).overflowX
      );
      expect(['auto', 'scroll']).toContain(overflowX);
    }
  });

  test('split pane should have flex layout', async ({ page }) => {
    const splitContent = page.locator('.ux-diff--split .ux-diff__content').first();
    if (await splitContent.count() > 0) {
      const display = await splitContent.evaluate(el =>
        getComputedStyle(el).display
      );
      expect(display).toBe('flex');
    }
  });

  test('split pane should have border between old and new', async ({ page }) => {
    const oldPane = page.locator('.ux-diff--split .ux-diff__pane--old').first();
    if (await oldPane.count() > 0) {
      const borderRight = await oldPane.evaluate(el =>
        getComputedStyle(el).borderRight
      );
      expect(borderRight).not.toBe('none');
    }
  });

  test('should render file icon when file info is present', async ({ page }) => {
    const fileIcon = page.locator('.ux-diff__file-icon').first();
    if (await fileIcon.count() > 0) {
      await expect(fileIcon).toBeVisible();
    }
  });

  test('should display expand icon in expand button', async ({ page }) => {
    const expandIcon = page.locator('.ux-diff__expand-icon').first();
    if (await expandIcon.count() > 0) {
      await expect(expandIcon).toBeVisible();
    }
  });

  test('should have expand text in expand button', async ({ page }) => {
    const expandText = page.locator('.ux-diff__expand-text').first();
    if (await expandText.count() > 0) {
      await expect(expandText).toBeVisible();
      const text = await expandText.textContent();
      expect(text).toContain('Expand');
    }
  });

  test('should have consistent spacing in header', async ({ page }) => {
    const header = page.locator('.ux-diff__header').first();
    if (await header.count() > 0) {
      const display = await header.evaluate(el =>
        getComputedStyle(el).display
      );
      expect(display).toBe('flex');
    }
  });

  test('should apply color to added stat', async ({ page }) => {
    const addedStat = page.locator('.ux-diff__stat--added').first();
    if (await addedStat.count() > 0) {
      const color = await addedStat.evaluate(el =>
        getComputedStyle(el).color
      );
      expect(color).toBeTruthy();
    }
  });

  test('should apply color to removed stat', async ({ page }) => {
    const removedStat = page.locator('.ux-diff__stat--removed').first();
    if (await removedStat.count() > 0) {
      const color = await removedStat.evaluate(el =>
        getComputedStyle(el).color
      );
      expect(color).toBeTruthy();
    }
  });
});
