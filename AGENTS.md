# boss_of_the_gym_antigravity — AGENTS.md

## What this is

Single‑file PWA (`index.html`, ~268 KB). Vanilla HTML/CSS/JS, no frameworks, no build step. Russian UI. Tracks an ab‑wheel rollout program (standing rollout progression) with exercise history, body measurements, inline timer, and a roadmap.

## Key architecture

- **Single entrypoint**: `index.html` — all markup, CSS, and JS in one file.
- **All state persisted in `localStorage`** under these keys:
  - `abw8` — main app state (weeks, days, exercises, current week/day, theme, edit state)
  - `abw_weeks` — roadmap progression (p/100, colors, label, description)
  - `abw_app_cfg` — user‑editable title/subtitle/footer text plus font weight/color per field
  - `abw_history` — session history (date, exercises with sets/reps/notes)
  - `abw_measurements` — weight/chest/waist/biceps entries with date
  - `abw_sw` — stopwatch state (persisted across page reloads)
  - `catEdits` — user additions/edits to the exercise catalog
- **Boot sequence** (at file bottom, lines ~3535–3619): `renderAppCfg(loadAppCfg())` → `render()` → `initSW()`
- **Migrations**: a version check (`abw_v4_iso_migrated`) runs once to fix UTC dates in history to local dates.

## UI patterns

- **Bottom sheets** for all modals (settings, measurements, history, catalog, weeks editor, theme picker). Each has an overlay div + sheet div; `.open` class controls visibility.
- **Edit mode** (toggle ✎ in day header): enables exercise reordering (drag), add/delete, tag change, set editor (+/−), and block toggles (sets/reps/load).
- **Theme system**: 7 themes (`THEME_ORDER`): `light`, `dark`, `cyberpunk`, `matrix`, `synthwave`, `terminal`, `holo`. Applied via `data-theme` attribute on `<html>`. CSS custom properties for all colors. Theme icons in `THEME_ICONS`.
- **Swipeable day tabs** — CSS transition on `.d-tab` for tab switching animation.
- **Day‑action buttons** («Сбросить» / «Заполнить») hidden behind a collapsible «▶ дополнительно» toggle.

## Critical conventions

- **Russian‑language UI** — all labels, prompts, confirm dialogs, placeholders in Russian. English text only in static HTML defaults (overridden by JS on load).
- **Inline event handlers** — `onclick`, `onchange`, `oninput` etc. used throughout (no framework event system).
- **Global state**: `S` (app state), `W` (current week), `D` (current day index), `WEEKS` (roadmap data), `editMode` (boolean), `_measEdit` (measurement edit index), `_measChartFields` (chart toggle state).
- **`save()`** writes `S` to `localStorage` key `abw8`; called after any state mutation.
- **`render()`** redraws the entire day tabs + exercise list + roadmap list; called after any change to state.
- **`esc()`** utility used for HTML escaping in template literals.

## localStorage keys map

| Key | Contents | Loaded at boot |
|-----|----------|---------------|
| `abw8` | `{W, D, days[], theme, ...}` | Yes (restored into `S`) |
| `abw_weeks` | `[{l, d, p, c}]` | Yes (restored into `WEEKS`) |
| `abw_app_cfg` | `{topbar, heroTitle, progTitle, progSub, footer, *Weight, *Color}` | Yes |
| `abw_history` | `[{date, iso, time, days[{ex[{n, sets, reps, load, note}]}]}]` | No (loaded on demand via `openHistory()`) |
| `abw_measurements` | `[{date, iso, time, weight?, chest?, waist?, biceps?}]` | No (loaded on demand via `openMeasurements()`) |
| `abw_sw` | `{running, elapsed, started}` | Yes (restores running stopwatch) |
| `catEdits` | `{[exId]: {n, d, t, ...}}` | No (loaded on demand) |

## Key functions

- `render()` — full re‑render of day tabs + exercise list + roadmap + stats + history button
- `selDay(i)` — switch to day `i`; triggers render
- `chWk(d)` — switch week by delta; saves S, triggers render
- `renderExItem(e, di, ei)` — render one exercise row (edit or view mode)
- `recordSession()` — saves current day progress to history
- `loadHistory()` / `saveHistory(h)` — history read/write
- `exportData()` / `handleImportFile(e)` — full localStorage dump/restore

## Measurements chart

Canvas‑based line chart in `drawMeasChart()`. Points spaced at fixed 45px gap (`X_GAP`). Horizontal scroll if needed. Fields toggled via checkboxes. Y‑axis auto‑ranges with 12% padding. Retina‑aware via `devicePixelRatio`.

## Service Worker

Injected via Blob URL as fallback (tries `sw.js` first). Only used for timer background notifications — **no caching** (`install`/`fetch` handlers absent). Registers at boot.

## Dev commands

No build, no test, no lint, no typecheck. Open `index.html` in a browser. Deploy by uploading `index.html` to any static host.

Only update the GitHub repository when asked, and never update GitHub yourself.