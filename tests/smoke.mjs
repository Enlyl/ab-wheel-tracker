// E2E smoke test for boss_of_the_gym_antigravity
// Catches: page-load regressions, broken scripts, dialog/sheet open/close,
// basic navigation between days, theme switch, localStorage persistence.
//
// Usage:
//   1) Start static server:  python -m http.server 8765
//   2) Run:                   npm test
//
// Run headless by default. Set HEADED=1 to open a real browser window.

import { chromium } from 'playwright';
import { strict as assert } from 'node:assert';

const BASE = process.env.BASE_URL || 'http://127.0.0.1:8765/index.html';
const HEADED = !!process.env.HEADED;

const errors = [];
const failed = [];
let passed = 0;

function pass(name) { passed++; console.log(`  \u2713 ${name}`); }
function fail(name, msg) { failed.push(`${name}: ${msg}`); console.log(`  \u2717 ${name}  ${msg}`); }

async function step(page, name, fn) {
  try { await fn(); pass(name); }
  catch (e) { fail(name, e && e.message ? e.message : String(e)); }
}

async function main() {
  const browser = await chromium.launch({ headless: !HEADED });
  const ctx = await browser.newContext({
    viewport: { width: 414, height: 896 },
    locale: 'ru-RU',
    reducedMotion: 'reduce',
  });
  const page = await ctx.newPage();
  page.on('pageerror', e => errors.push(`pageerror: ${e.message}`));
  page.on('console', m => {
    if (m.type() !== 'error') return;
    const text = m.text();
    // Tolerate non-app noise: SW fallback tries /sw.js (404) and the page
    // may request /favicon.ico. These are environmental, not app bugs.
    if (/sw\.js|favicon\.ico|404.*fetching the script/i.test(text)) return;
    errors.push(`console.error: ${text}`);
  });
  page.on('requestfailed', req => {
    const url = req.url();
    if (/sw\.js|favicon\.ico/i.test(url)) return;
    errors.push(`requestfailed: ${url} (${req.failure()?.errorText})`);
  });

  // 1. Page loads without errors
  await step(page, 'page loads', async () => {
    const resp = await page.goto(BASE, { waitUntil: 'domcontentloaded' });
    assert.equal(resp.status(), 200);
    await page.waitForSelector('#app-hero-title', { timeout: 5000 });
  });

  // 2. Title is rendered
  await step(page, 'hero title rendered', async () => {
    const text = await page.locator('#app-hero-title').innerText();
    assert.ok(text && text.length > 0, `title empty: "${text}"`);
  });

  // 3. Day tabs render
  await step(page, 'day tabs render (>=3)', async () => {
    const count = await page.locator('.d-tab').count();
    assert.ok(count >= 3, `expected >=3 day tabs, got ${count}`);
  });

  // 4. Exercises render
  await step(page, 'exercises render (>=5)', async () => {
    const count = await page.locator('.ex-item').count();
    assert.ok(count >= 5, `expected >=5 exercises, got ${count}`);
  });

  // 5. Theme system — 7 themes selectable
  await step(page, 'theme picker has 7 built-in themes', async () => {
    await page.click('button[onclick="openThemePicker()"]');
    await page.waitForTimeout(200);
    // 7 built-in + 1 "+ Своя" tile = 8
    const opts = await page.locator('.theme-opt:not(.theme-opt-add)').count();
    assert.equal(opts, 7, `expected 7 built-in theme options, got ${opts}`);
    const add = await page.locator('.theme-opt-add').count();
    assert.equal(add, 1, `expected 1 "+ Своя" tile, got ${add}`);
    // close via direct API (Escape doesn't always dismiss sheets with body in front)
    await page.evaluate(() => closeThemePicker());
    await page.waitForTimeout(200);
  });

  // 6. Theme actually changes data-theme
  await step(page, 'theme switch works', async () => {
    const before = await page.locator('html').getAttribute('data-theme');
    await page.evaluate(() => { setTheme('matrix'); });
    await page.waitForTimeout(150);
    const after = await page.locator('html').getAttribute('data-theme');
    assert.equal(after, 'matrix', `theme did not change: before=${before} after=${after}`);
    // close any open picker (programmatic setTheme doesn't open it, but click did)
    await page.keyboard.press('Escape');
    await page.waitForTimeout(150);
    await page.evaluate(() => { setTheme('light'); });
    await page.waitForTimeout(150);
  });

  // 7. Day tab click switches day
  await step(page, 'clicking day tab switches', async () => {
    const tabs = page.locator('.d-tab');
    const total = await tabs.count();
    if (total < 2) throw new Error('need >=2 tabs');
    await tabs.nth(1).click();
    await page.waitForTimeout(100);
    const active = await page.locator('.d-tab.on-a, .d-tab.on-b, .d-tab.on-c').count();
    assert.ok(active >= 1, 'no active day-tab after click');
  });

  // 8. Settings sheet opens and closes
  await step(page, 'settings sheet opens/closes', async () => {
    await page.locator('button[onclick="openAppSettings()"]').click();
    await page.waitForTimeout(150);
    const open = await page.locator('#settings-sheet.open').count();
    assert.equal(open, 1, 'settings-sheet did not open');
    await page.keyboard.press('Escape');
    await page.waitForTimeout(200);
    const closed = await page.locator('#settings-sheet.open').count();
    assert.equal(closed, 0, 'settings-sheet did not close on Escape');
  });

  // 9. History sheet opens
  await step(page, 'history sheet opens', async () => {
    await page.locator('button[onclick="openHistory()"]').click();
    await page.waitForTimeout(200);
    const open = await page.locator('#history-sheet.open').count();
    assert.equal(open, 1, 'history-sheet did not open');
    // check empty-state OR list exists
    const empty = await page.locator('.help-empty').count();
    const rows = await page.locator('.hist-row').count();
    assert.ok(empty + rows > 0, 'history body has no content');
    await page.keyboard.press('Escape');
    await page.waitForTimeout(200);
  });

  // 10. Catalog sheet opens
  await step(page, 'catalog sheet opens', async () => {
    await page.locator('button[onclick="openCatalog()"]').click();
    await page.waitForTimeout(200);
    const open = await page.locator('#catalog-sheet.open').count();
    assert.equal(open, 1, 'catalog-sheet did not open');
    const rows = await page.locator('.catalog-ex-row').count();
    assert.ok(rows >= 5, `expected >=5 catalog rows, got ${rows}`);
    await page.keyboard.press('Escape');
    await page.waitForTimeout(200);
  });

  // 11. App-root gets inert when sheet opens
  await step(page, 'app-root becomes inert on sheet open', async () => {
    await page.locator('button[onclick="openMeasurements()"]').click();
    await page.waitForTimeout(150);
    const inert = await page.locator('.app-root').getAttribute('inert');
    assert.ok(inert !== null, '.app-root did not get inert attribute');
    await page.keyboard.press('Escape');
    await page.waitForTimeout(200);
  });

  // 12. localStorage persistence
  await step(page, 'localStorage round-trip', async () => {
    await page.evaluate(() => { S.cycles = S.cycles || []; save(); });
    const v1 = await page.evaluate(() => localStorage.getItem('abw8'));
    assert.ok(v1 && v1.length > 10, `abw8 not persisted: ${v1 && v1.length}`);
  });

  // 13. No JS errors during all the above
  await step(page, 'no JS errors collected', async () => {
    if (errors.length) throw new Error('errors:\n  ' + errors.join('\n  '));
  });

  // 14. abw_version migration system
  await step(page, 'abw_version set and migrator idempotent', async () => {
    const ver = await page.evaluate(() => localStorage.getItem('abw_version'));
    assert.ok(ver && parseInt(ver) >= 5, `expected abw_version >= 5, got ${ver}`);
    // Run migrator a second time — should be no-op (idempotent)
    const before = await page.evaluate(() => JSON.stringify(S));
    await page.evaluate(() => runMigrations());
    const after = await page.evaluate(() => JSON.stringify(S));
    assert.equal(before, after, 'runMigrations() is not idempotent');
  });

  // 15. Legacy one-shot flags respected + honored exactly once
  await step(page, 'legacy migration flags still work', async () => {
    // Set a fresh browser context
    const ctx2 = await browser.newContext({ viewport: { width: 414, height: 896 }, locale: 'ru-RU', reducedMotion: 'reduce' });
    const p2 = await ctx2.newPage();
    // Pre-seed legacy state with bad isoDate and the Body Saw name
    await p2.addInitScript(() => {
      localStorage.setItem('abw8', JSON.stringify({
        W: 1, D: 0, days: [{ id: 'A', day: 'Пн', role: 'Push', cls: 'on-a', ex: [
          { n: 'Body Saw / Long-Lever Plank', d: '3 × 8', t: 'key' }
        ], title: '', sub: '' }], theme: 'light'
      }));
      localStorage.setItem('abw_history', JSON.stringify([{
        isoDate: '2024-01-01', date: '1 сентября 2024', time: '12:00', week: 1, dayId: 1, dayTitle: 'Push',
        exList: [{ name: 'Body Saw / Long-Lever Plank', done: 1, total: 1 }]
      }]));
    });
    const r = await p2.goto(BASE, { waitUntil: 'domcontentloaded' });
    assert.equal(r.status(), 200);
    await p2.waitForSelector('#app-hero-title');
    const after = await p2.evaluate(() => ({
      ver: localStorage.getItem('abw_version'),
      exName: S.days[0].ex[0].n,
      histName: JSON.parse(localStorage.getItem('abw_history'))[0].exList[0].name,
      histIso: JSON.parse(localStorage.getItem('abw_history'))[0].isoDate,
    }));
    assert.equal(after.ver, '5', 'abw_version should be 5');
    assert.equal(after.exName, 'Body Saw', 'program Body Saw not renamed');
    assert.equal(after.histName, 'Body Saw', 'history Body Saw not renamed');
    assert.equal(after.histIso, '2024-09-01', 'history isoDate not UTC→local migrated');
    await ctx2.close();
  });

  // 16. Custom theme CRUD
  await step(page, 'custom theme create + apply + delete', async () => {
    const before = await page.evaluate(() => Object.keys(loadCustomThemes()).length);
    // Seed a custom theme via the public API (UI flow needs sheet interaction)
    await page.evaluate(() => {
      const themes = loadCustomThemes();
      themes['TestPeach'] = { '--bg':'#fff5ee','--surface':'#ffe4d6','--text':'#3d2914','--gold':'#e07856','--green':'#7ba787','--danger':'#b03060' };
      saveCustomThemes(themes);
    });
    const after = await page.evaluate(() => Object.keys(loadCustomThemes()).length);
    assert.equal(after, before + 1, 'custom theme not saved');
    // Switch to it
    await page.evaluate(() => setTheme('custom:TestPeach'));
    await page.waitForTimeout(150);
    const dt = await page.locator('html').getAttribute('data-theme');
    assert.equal(dt, 'custom:TestPeach', 'data-theme not switched to custom');
    // CSS variables applied
    const probe = await page.evaluate(() => {
      const cs = getComputedStyle(document.documentElement);
      // pick :root computed --bg by walking all sheets
      const rs = getComputedStyle(document.documentElement);
      return { dt: document.documentElement.getAttribute('data-theme'), bg: cs.getPropertyValue('--bg').trim() };
    });
    assert.equal(probe.bg.toLowerCase(), '#fff5ee', `--bg not applied: ${probe.bg} (data-theme=${probe.dt})`);
    // Delete
    await page.evaluate(() => deleteCustomTheme('TestPeach'));
    const remaining = await page.evaluate(() => Object.keys(loadCustomThemes()));
    assert.ok(!remaining.includes('TestPeach'), 'custom theme not deleted');
    // Active theme should reset
    await page.evaluate(() => setTheme('light'));
  });

  await browser.close();

  console.log(`\nResults: ${passed} passed, ${failed} failed`);
  if (failed.length) {
    console.log('Failures:');
    failed.forEach(f => console.log(`  - ${f}`));
    process.exit(1);
  }
  if (errors.length) {
    console.log('Errors:');
    errors.forEach(e => console.log(`  - ${e}`));
    process.exit(1);
  }
  process.exit(0);
}

main().catch(err => { console.error(err); process.exit(2); });
