<div align="center">
  <h1>Kolyosiko</h1>
  <p><strong>Universal PWA Workout Tracker</strong></p>

  <p>
    <a href="https://enlyl.github.io/ab-wheel-tracker/" target="_blank">
      <img src="https://img.shields.io/badge/Live%20Demo-0c0c0e?style=for-the-badge&logo=githubpages&logoColor=c8a96e" alt="Live Demo">
    </a>
    <img src="https://img.shields.io/badge/PWA-0c0c0e?style=for-the-badge&logo=pwa&logoColor=c8a96e" alt="PWA">
    <img src="https://img.shields.io/badge/No%20Dependencies-0c0c0e?style=for-the-badge&logo=html5&logoColor=c8a96e" alt="No Dependencies">
  </p>

  <img src="https://img.shields.io/github/last-commit/Enlyl/ab-wheel-tracker?color=c8a96e&style=flat-square" alt="Last Commit">
  <img src="https://img.shields.io/github/repo-size/Enlyl/ab-wheel-tracker?color=c8a96e&style=flat-square" alt="Repo Size">
  <img src="https://img.shields.io/badge/license-MIT-c8a96e?style=flat-square" alt="License">
</div>

---

A fully customizable single-file workout tracker. Configure days, exercises, sets, reps, load — or use the built-in Standing Rollout program for ab wheel progression. All data stays in your browser (localStorage). No build step, no frameworks, no dependencies — just open `index.html`.

## Features

- **Standing Rollout program** — step-by-step roadmap from Wall Rollout to full standing rollout
- **3 sessions / week** (Push / Pull / Skill) with exercises, sets, and reps
- **Edit mode** — add, delete, reorder exercises, change tags
- **Training history** — calendar view + list, week filter, inline editing
- **Progress chart** — per-exercise average reps on canvas, calendar/chart toggle, hover line highlight, zoom (50–400%)
- **Body measurements** — weight (fixed 70–100 scale) / chest, waist, biceps — two separate charts, each with its own Y-axis and reference lines
- **Exercise collapse** — hide details, keep only name and checkbox
- **Skip exercise** — long-press checkbox, counts as done
- **Rest timer** — ring animation with metronome
- **Stopwatch** — persists across page reloads (hidden by default)
- **Exercise catalog** — search, custom exercises, alternatives, technique descriptions
- **Settings** — card layout with visibility toggles per block, danger-styled reset section
- **Topbar buttons** — grouped into pills: history/catalog/measurements, settings/theme
- **7 themes** — light, dark, cyberpunk, matrix, synthwave, terminal, holo
- **Export / Import** — full data backup as JSON
- **PWA** — works offline (Service Worker for timer notifications only)
- **Accessibility** — keyboard focus-trap on all dialogs, skip-link, AA-contrast, `prefers-reduced-motion`, 24×24 hit-areas

## Quick start

```
https://enlyl.github.io/ab-wheel-tracker/
```

Or locally:

```bash
git clone https://github.com/Enlyl/ab-wheel-tracker.git
cd ab-wheel-tracker
python -m http.server 8765
# open http://127.0.0.1:8765/index.html
```

## 7 themes

```
☀  Light        — clean, minimal distraction
☽  Dark         — standard dark theme
⚡  Cyberpunk    — neon pink, cyan, purple
⎔  Matrix       — green monochrome
◈  Synthwave    — purple-pink sunset
⌨  Terminal     — amber on black, old terminal vibe
◌  Holo         — holographic shimmer
```

## Tech stack

```
┌─────────────────────────────────────┐
│          index.html  (404 KB)        │
│  ┌───────────────────────────────┐  │
│  │  HTML5 + CSS Custom Properties │  │
│  │  Vanilla JavaScript (ES2023)  │  │
│  │  Canvas (measurement & history charts) │  │
│  │  Service Worker (Blob URL)    │  │
│  │  localStorage (all data)      │  │
│  └───────────────────────────────┘  │
│     0 dependencies · 0 build step   │
└─────────────────────────────────────┘
```

## Data structure

| localStorage key | Contents |
|---|---|
| `abw8` | Current week, day, exercise list |
| `abw_weeks` | Roadmap progress (l, d, p, c, barH, barStyle) |
| `abw_history` | Training history (date, isoDate, time, exList) |
| `abw_measurements` | Body measurements (weight, chest, waist, biceps) |
| `abw_app_cfg` | Interface settings (themes, hero, footer, reminders) |
| `abw_sw` | Stopwatch state |
| `catEdits` | User catalog edits |
| `abw_ex_timer_presets` | Per-exercise rest timer presets |
| `abw_v4_iso_migrated` | One-shot migration flag (UTC→local dates) |
| `abw8_bsaw_mig`, `abw8_bsaw_hist_mig` | Body Saw rename flags |

## License

MIT

---

<div align="center">
  <h1>Колёсико</h1>
  <p><strong>Универсальный PWA-трекер тренировок</strong></p>

  <p>
    <a href="https://enlyl.github.io/ab-wheel-tracker/" target="_blank">
      <img src="https://img.shields.io/badge/Live%20Demo-0c0c0e?style=for-the-badge&logo=githubpages&logoColor=c8a96e" alt="Live Demo">
    </a>
    <img src="https://img.shields.io/badge/PWA-0c0c0e?style=for-the-badge&logo=pwa&logoColor=c8a96e" alt="PWA">
    <img src="https://img.shields.io/badge/No%20Dependencies-0c0c0e?style=for-the-badge&logo=html5&logoColor=c8a96e" alt="No Dependencies">
  </p>

  <img src="https://img.shields.io/github/last-commit/Enlyl/ab-wheel-tracker?color=c8a96e&style=flat-square" alt="Last Commit">
  <img src="https://img.shields.io/github/repo-size/Enlyl/ab-wheel-tracker?color=c8a96e&style=flat-square" alt="Repo Size">
  <img src="https://img.shields.io/badge/license-MIT-c8a96e?style=flat-square" alt="License">
</div>

---

Полностью кастомизируемое PWA-приложение для отслеживания любых тренировок в одном HTML-файле. Настраивай дни, упражнения, подходы, повторения, нагрузку — или используй встроенную программу Standing Rollout для колеса пресса. Все данные хранятся в браузере (localStorage). Никаких сборок, фреймворков и зависимостей — просто открой `index.html`.

## Возможности

- **Программа «Standing Rollout»** — пошаговая дорожная карта от Wall Rollout до полного выхода стоя
- **3 тренировки в неделю** (Push / Pull / Skill) с упражнениями, подходами и повторениями
- **Режим редактирования** — добавляй, удаляй, переставляй упражнения, меняй теги
- **История тренировок** — календарь + список, фильтр по неделям, inline-редактирование
- **График прогресса** — средние повторения по каждому упражнению на canvas, переключение календарь/график, подсветка линии при наведении, зум (50–400%)
- **Замеры тела** — вес (фиксированная шкала 70–100) / грудь, талия, бицепс — два отдельных графика, каждый со своей шкалой и референсными линиями
- **Сворачивание упражнений** — спрятать детали и кнопки, оставив только название и чекбокс
- **Пропуск упражнения** — долгое нажатие на чекбокс, засчитывается как выполненное
- **Встроенный таймер отдыха** — с кольцевой анимацией и метрономом
- **Секундомер** — не сбрасывается при перезагрузке страницы (скрыт по умолчанию)
- **Каталог упражнений** — поиск, свои упражнения, альтернативы, описание техники
- **Настройки приложения** — карточки с чекбоксами видимости для каждого блока, предупредительный блок сброса
- **Кнопки топбара** — сгруппированы в пилюли: история/каталог/замеры, настройки/тема
- **7 тем оформления** — светлая, тёмная, cyberpunk, matrix, synthwave, terminal, holo
- **Экспорт / Импорт** — полный бекап всех данных в JSON
- **PWA** — работает офлайн (Service Worker только для уведомлений таймера)

## Быстрый старт

```
https://enlyl.github.io/ab-wheel-tracker/
```

Или локально:

```bash
git clone https://github.com/Enlyl/ab-wheel-tracker.git
cd ab-wheel-tracker
# Открой index.html в браузере
```

## 7 тем

```
☀  Светлая      — классика, минимум отвлекающего
☽  Тёмная       — стандартная тёмная тема
⚡  Cyberpunk    — неон: розовый, циан, фиолетовый
⎔  Matrix       — зелёный монохром
◈  Synthwave    — фиолетово-розовый закат
⌨  Terminal     — amber на чёрном, как старый терминал
◌  Holo         — голографический отлив
```

## Технологии

```
┌─────────────────────────────────────┐
│          index.html  (404 КБ)        │
│  ┌───────────────────────────────┐  │
│  │  HTML5 + CSS Custom Properties │  │
│  │  Vanilla JavaScript (ES2023)  │  │
│  │  Canvas (график замеров и истории)  │  │
│  │  Service Worker (Blob URL)    │  │
│  │  localStorage (все данные)    │  │
│  └───────────────────────────────┘  │
│     0 зависимостей · 0 сборок       │
└─────────────────────────────────────┘
```

## Структура данных

| localStorage ключ | Что хранит |
|---|---|
| `abw8` | Текущая неделя, день, список упражнений |
| `abw_weeks` | Прогресс дорожной карты (l, d, p, c, barH, barStyle) |
| `abw_history` | История тренировок (date, isoDate, time, exList) |
| `abw_measurements` | Замеры тела (вес, грудь, талия, бицепс) |
| `abw_app_cfg` | Настройки интерфейса (темы, hero, footer, напоминания) |
| `abw_sw` | Состояние секундомера |
| `catEdits` | Пользовательские правки каталога |
| `abw_ex_timer_presets` | Пресеты таймера отдыха для упражнений |
| `abw_v4_iso_migrated` | Флаг миграции (UTC→локальные даты) |
| `abw8_bsaw_mig`, `abw8_bsaw_hist_mig` | Флаги переименования Body Saw |

## Лицензия

MIT
