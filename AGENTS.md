# boss_of_the_gym_antigravity — AGENTS.md

## What this is

Single‑file PWA (`index.html`, ~7652 lines / ~404 KB). Vanilla HTML/CSS/JS, no frameworks, no build step. Russian UI. Tracks an ab‑wheel rollout program (standing rollout progression) with exercise history, body measurements, inline timer, and a roadmap.

## Key architecture

- **Single entrypoint**: `index.html` — all markup, CSS, and JS in one file.
- **Layout root**: `<main id="main-content">` wraps `<div class="app-root">` (used for `inert` background).
- **All state persisted in `localStorage`** under these keys:
  - `abw8` — main app state (weeks, days, exercises, current week/day, theme, edit state)
  - `abw_weeks` — roadmap progression (l, d, p, c, barH, barStyle)
  - `abw_app_cfg` — user‑editable title/subtitle/footer text plus font weight/color per field; also `reminderHideDay`, `reminderPos`, `reminderBorderW`, `reminderBorderC`, `reminderTextC`, `reminderLabelC`, `reminderLabelShow`, `showSW`, `showRoadmap`, `showMotiv`, `showTopbar`, `showHero`, `showFooter`, `showReminder`, `wkRandom`, `wkColor`
  - `abw_history` — session history (date, isoDate, time, week, dayId, dayTitle, exList, duration, note)
  - `abw_measurements` — weight/chest/waist/biceps entries with date
  - `abw_sw` — stopwatch state (persisted across page reloads)
  - `catEdits` — user additions/edits to the exercise catalog
  - `abw_ex_timer_presets` — per-exercise timer presets
  - `abw_version` — integer (currently 5). Source of truth for migrations.
  - `abw_v4_iso_migrated` — legacy one-shot flag: history dates UTC → local (now folded into `abw_version`)
  - `abw8_bsaw_mig` / `abw8_bsaw_hist_mig` — legacy Body Saw rename migrations (now folded into `abw_version`)

## Boot sequence (top-level script order)

1. `renderAppCfg(loadAppCfg())` — applies user config (titles, colors, font weights, visibility)
2. `initSW()` — async, registers service worker (Blob URL fallback)
3. `swRestore()` — restores stopwatch state from `abw_sw`
4. `renderMotiv()` — picks today's motivational quote
5. `render()` — full UI render of day tabs, exercise list, roadmap, stats

## UI patterns

- **Bottom sheets** for all modals (settings, measurements, history, catalog, weeks editor, theme picker, help, exercise note, sw-popup, sw-reset, confirm). Each has an overlay div + sheet div; `.open` class controls visibility. All managed via `openSheet(sheetId, openerEl)` / `closeSheet(sheetId)` helper (focus-trap, inert background, Escape, focus-return).
- **Catalog entry**: topbar `☰` button (title «Каталог упражнений») → `openCatalog()` — bottom sheet with search, create, edit, delete.
- **Edit mode** (toggle ✎ in day header): enables exercise reordering (drag), add/delete, tag change, set editor (+/−), and block toggles (sets/reps/load).
- **Theme system**: 7 themes (`THEME_ORDER`): `light`, `dark`, `cyberpunk`, `matrix`, `synthwave`, `terminal`, `holo`. Applied via `data-theme` attribute on `<html>`. CSS custom properties for all colors. Theme icons in `THEME_ICONS`.
- **Swipeable day tabs** — CSS transition on `.d-tab` for tab switching animation.
- **Day‑action buttons** («Сбросить» / «Заполнить») hidden behind a collapsible «▶ дополнительно» toggle.

## Design tokens

### Per-theme CSS custom properties (in `:root` and each `[data-theme="…"]` block)

```
--bg, --surface, --surface2, --surface3,
--border, --border2,
--text, --text2, --text3, --text4,
--gold, --gold2, --goldbg, --goldborder, --goldpill,
--green, --green2, --greenbg, --greenbg2, --greenborder, --green-soft,
--blue, --bluebg, --blueborder,
--danger, --danger-soft,
--wk-c1 … --wk-c9,
--t-fast, --t-base, --t-slow,
--ease-out, --ease-in-out,
--shadow-sm, --shadow-md, --shadow-hero,
--theme-icon,
--transition
```

### Token rules

- **Never use literal hex** for theme colors in CSS or inline styles — use `var(--*)`.
- **`--danger`** for destructive actions (delete, reset, dismiss). **`--danger-soft`** for tinted backgrounds.
- **`--wk-c1..9`** is the week-counter palette. Read at runtime via `getComputedStyle(document.documentElement).getPropertyValue('--wk-c' + i)`.
- **Motion tokens**: `--t-fast: .12s` (press), `--t-base: .2s` (hover), `--t-slow: .3s` (theme change).
- **Easing tokens**: `--ease-out: cubic-bezier(.2, 0, 0, 1)`, `--ease-in-out: cubic-bezier(.4, 0, .2, 1)`.

## Critical conventions

- **Russian‑language UI** — all labels, prompts, confirm dialogs, placeholders in Russian. English text only in static HTML defaults (overridden by JS on load).
- **Inline event handlers** — `onclick`, `onchange`, `oninput` used throughout (no framework event system).
- **Global state**: `S` (app state), `W` (current week), `D` (current day index), `WEEKS` (roadmap data), `editMode` (boolean), `_measEdit` (measurement edit index), `_measChartFields` (chart toggle state), `_sheetStack` (open dialog stack), `_lastOpener` (focus-return target).
- **`save()`** writes `S` to `localStorage` key `abw8`; called after any state mutation.
- **`render()`** redraws the entire day tabs + exercise list + roadmap; called after any change to state.
- **`esc()`** utility used for HTML escaping in template literals.
- **Utility classes** (use these instead of inline `style="…"`):
  - Layout: `.cat-search-row`, `.cat-divider`, `.cat-form-back`, `.cat-form-row`, `.cat-alts-add`, `.cat-form-row-spaced`, `.wk-stage`, `.wk-stage-head`, `.wk-stage-actions`, `.wk-row`, `.wk-row-sm`, `.wk-row-wrap`, `.wk-field`, `.wk-bar-preview`, `.wk-bar-preview-fill`
  - Settings: `.sett-label`, `.sett-label-muted`, `.sett-hint`, `.sett-reset`, `.sett-color`, `.sett-color-sm`, `.sett-color-wk`, `.sett-num`, `.sett-num-sm`, `.sett-sel`, `.sett-file-label`, `.sett-row`, `.sett-row-2`, `.sett-row-3`, `.sett-checkbox`, `.sett-section`, `.sett-section-title`, `.sett-pill`, `.sett-divider`, `fieldset.sett-section` (border + radius), `fieldset.sett-section legend`
  - History: `.hist-row`, `.hist-row-head`, `.hist-row-main`, `.hist-row-line-1`, `.hist-row-line-2`, `.hist-row-date`, `.hist-row-day`, `.hist-row-arrow`, `.hist-row-body`, `.hist-ex-row`, `.hist-ex-name`, `.hist-ex-note`, `.hist-empty-list`, `.hist-edit-row`, `.hist-edit-date`, `.hist-edit-input`, `.hist-edit-input-week`, `.hist-edit-input-dur`, `.hist-edit-date-input`, `.hist-edit-date-picker`, `.hist-no-info`, `.hist-dur-empty`, `.hist-meta`, `.hist-label`, `.hist-note`, `.hist-del`, `.hist-ex-stat-done`, `.hist-ex-stat-pending`, `.hist-value-done`, `.hist-value-pending`, `.hist-cat-pill`, `.hist-cat-empty`, `.hist-prog-pos`, `.hist-prog-neg`, `.hist-ex-note-empty`, `.hist-ex-note-val`
  - Catalog: `.cat-search-row`, `.cat-search-label`, `.cat-divider`, `.cat-form-back`, `.cat-form-row`, `.cat-alts-add`, `.cat-edit-actions-spaced`, `.cat-edit-input-tall`, `.btn-success`, `.btn-muted`, `.btn-danger`
  - Measures: `.meas-charts`, `.meas-chart-col`, `.meas-chart-title`, `.meas-canvas-wrap`, `.meas-canvas`, `.meas-toggles`, `.meas-toggles-refs`, `.meas-toggle-label`, `.meas-swatch`, `.meas-ref`, `.meas-ref-swatch`, `.meas-ref-name`, `.meas-step-btn`, `.meas-step-minus`, `.meas-step-plus`, `.meas-step-input`, `.meas-add-btn`, `.meas-empty-add`
  - Days / Tabs: `.d-tab-extra-star`
  - Empty / CTA: `.help-empty`, `.help-empty-title`, `.help-empty-text`, `.help-empty-btn`
- **Color contrast**: every text color (`--text`, `--text2`, `--text3`) must keep ≥4.5:1 against its background in the same theme. Current setup passes AA for light, dark, matrix, holo, synthwave, cyberpunk, terminal.
- **`transition: all` is forbidden** — always enumerate properties (e.g. `transform .15s, background-color .15s, color .15s, border-color .15s, box-shadow .15s, opacity .15s`).
- **Press feedback** (`scale(0.96)`) is applied globally under `@media (prefers-reduced-motion: no-preference)` via a long `:not(...)` selector excluding components that already have an explicit `:active` transform.

## Accessibility infrastructure

- **`<a class="skip-link" href="#main-content">`** at top of body — hidden until focus-visible, jumps to `<main>`.
- **`<main id="main-content">`** wraps `.app-root`.
- **`.app-root[inert]`** — JS toggles `inert` when any dialog opens, restoring on close (background goes non-interactive + visually inert).
- **`openSheet(sheetId, openerEl)` / `closeSheet(sheetId)`** — focus-trap (Tab/Shift-Tab cycle inside sheet), Escape closes, focus moves to first focusable, focus returns to opener on close. `_sheetStack` handles nested dialogs.
- **`role="dialog"` (or `role="alertdialog"` for confirm/reset) + `aria-modal="true"` + `aria-labelledby="…"`** on all 11 dialogs.
- **Global `:focus-visible`**: `outline: 2px solid var(--text)`. Per-control `:focus-visible`: `outline: 2px solid var(--gold)` (button, theme-toggle, d-tab, sw-btn, help-close, confirm-btn, sw-popup-btn, day-action-btn, ipreset, reset-btn, cal-nav-btn, catalog-add-btn, reminder-dismiss, ex-help-btn, ex-note-btn, sett-checkbox, sett-pill).
- **`@media (prefers-reduced-motion: reduce)`** — global override: `animation-duration: 0.01ms; transition-duration: 0.01ms; scroll-behavior: auto`.
- **`vibe(pattern)`** helper — wraps `navigator.vibrate()` and respects `prefers-reduced-motion: reduce` (no-op).
- **iOS input zoom floor**: `@media (max-width: 600px) { … }` forces `font-size: 16px` on all small inputs (~13 classes) to prevent Safari auto-zoom on focus.
- **Hit-area 24×24** (WCAG 2.5.8): every interactive icon-button has `min-width: 24px; min-height: 24px`. Applied to: `.d-tab-del`, `.d-tab-grip`, `.reminder-dismiss`, `.cat-tag-del`, `.meas-del`, `.wn-edit-btn`. `.theme-toggle` is 34×34, `.sw-btn` 50×28+, `.help-close` 30×30, `.ex-help-btn`/`.ex-note-btn` 32×32, `.day-action-btn` ≥ 40, `.ea-btn` 28×28 — all compliant.

## localStorage keys map

| Key | Contents | Loaded at boot |
|-----|----------|----------------|
| `abw8` | `{W, D, days[], theme, _exp[], cycles[]}` | Yes (restored into `S`) |
| `abw_weeks` | `[{l, d, p, c, barH, barStyle}]` | Yes (restored into `WEEKS`) |
| `abw_app_cfg` | `{topbar, heroTitle, progTitle, progSub, footer, *Weight, *Color, *Italic, *StrokeW, *StrokeC, reminder*, showSW, showRoadmap, showMotiv, showTopbar, showHero, showFooter, showReminder, wkRandom, wkColor}` | Yes |
| `abw_history` | `[{date, isoDate, time, week, dayId, dayTitle, exList[{name, done, total, reps, load, note}], duration, note}]` | No (loaded on demand via `openHistory()`) |
| `abw_measurements` | `[{date, iso, time, weight?, chest?, waist?, biceps?}]` | No (loaded on demand via `openMeasurements()`) |
| `abw_sw` | `{running, elapsed, started}` | Yes (restores running stopwatch) |
| `catEdits` | `{[exId]: {n, d, t, g, how, tips, alts}}` | No (loaded on demand via `openCatalog()`) |
| `abw_ex_timer_presets` | `{'w-d-i': secs}` | No (loaded on demand) |
| `abw_version` | `'5'` (integer; source of truth for migrations) | Checked on boot via `runMigrations()` |
| `abw_v4_iso_migrated` | legacy one-shot flag (kept for first-boot detection, no longer checked) | — |
| `abw8_bsaw_mig` / `abw8_bsaw_hist_mig` | legacy one-shot flags (kept for first-boot detection) | — |
| `histChartHidden` / `histChartExtra` | chart-mode-only exercise list | No (chart mode only) |
| `measRefs` | reference-line values per field | No (measurements only) |

## Key functions

### Render / navigation
- `render()` — full re-render of day tabs, exercise list, roadmap, stats
- `selDay(i)` — switch to day `i`; triggers render
- `chWk(d)` — switch week by delta; saves `S`, triggers render
- `renderExItem(e, di, ei)` — render one exercise row (edit or view mode)
- `renderMotiv()` — sets today's emoji + text in `.hero-motiv`
- `wkColorVar(i)` / `wkColorFor(W, wkCfg)` — week counter color, reads `--wk-cN` at runtime
- `formatRuDate(d)` — formats `1 сентября 2026` (replaces `toLocaleDateString` for stable output)

### Session / history
- `recordSession(w, d)` — appends entry to `abw_history` (date, time, exList, duration, note)
- `loadHistory()` / `saveHistory(h)` — history read/write
- `exportData()` / `handleImportFile(e)` — full localStorage dump/restore

### Catalog
- `openCatalog(filter)` — entry via topbar ☰, dedup by name, group by primary group
- `catalogShowCreateForm()` / `catalogSaveNew()` — new exercise
- `catalogEditRow(btn)` / `catalogSaveEdit(btn)` — edit existing
- `catalogDeleteEx(btn)` / `catalogDeleteExDirect(di, ei)` — soft-delete (sets `removedAt` on exercise in current week only)
- `catalogAddAlt(ri)` / `catalogRemoveAlt(ri, val)` — alternate exercises

### Measurements
- `openMeasurements()` — sheet with two charts (weight + body), 4 chart toggles, 4 reference-line inputs, entries list, add button
- `addMeasEntry()` / `deleteMeasEntry(i)` — CRUD
- `drawMeasChart(canvasId, fields, fixedRange?)` — canvas chart, retina-aware via `devicePixelRatio`, `X_GAP=45`, `pad {t:16,r:16,b:32,l:44}`, dashed reference lines

### Sheets (HIGH-1 refactor)
- `openSheet(sheetId, openerEl)` — opens dialog: `.open` on overlay+sheet, `inert` on `.app-root`, body scroll-lock, focus first focusable, focus trap (Tab/Shift-Tab), Escape closes, focus returns to opener. Pushed onto `_sheetStack`.
- `closeSheet(sheetId)` — reverses. When stack empty, removes `inert` and restores body overflow.

### Timer
- `swRestore()` / `swSave()` — persist stopwatch state
- `iStart()` / `onInlineFinishedUI()` — inline timer with `metroTick()`, beeps, wake lock, `flashScreen()`
- `triggerWeekComplete(w)` / `triggerGoldWave()` — celebration animations (week-flash overlay + 24 particles + badge / gold sweep + chk-pop)

### Vibration
- `vibe(pattern)` — wraps `navigator.vibrate`, no-op if `prefers-reduced-motion: reduce`

### Exercise notes
- `editExNote(w, d, i)` (stores indices in overlay dataset) / `closeExNote()` — auto-save on input, keyed by exact `w,d,i`, not by name

### Settings
- `applyAppSettings()` — live-applies hero/footer/prog config on every input change
- `saveAppSettings()` — explicit save + close
- `clearAllLocalStorage()` / `resetProgram()` — destructive flows (confirm-wrapped)

## Service Worker

Injected via Blob URL as fallback (tries `sw.js` first). Only used for timer background notifications — **no caching** (`install`/`fetch` handlers absent). Registers at boot.

## Service-worker protocol

SW receives `START_TIMER` (sets `endsAt` + schedules `tick`) and `STOP_TIMER`. On fire: notifies all clients + shows `showNotification` with vibrate pattern. Notification click focuses existing window.

## Measurements chart detail

`drawMeasChart(canvasId, fields, fixedRange?)`:
- `X_GAP = 45` — horizontal spacing between data points
- `pad = {t:16, r:16, b:32, l:44}` — chart padding
- `devicePixelRatio` scaling for retina
- 12% Y-axis padding (auto-range)
- `fixedRange:[70,100]` for weight chart (kg), auto for others
- Dashed reference lines per field

## Dev commands

No build, no test, no lint, no typecheck. Open `index.html` in a browser (recommended via local HTTP server, e.g. `python -m http.server 8765`). Deploy by uploading `index.html` to any static host.

Only update the GitHub repository when asked, and never update GitHub yourself.
