<div align="center">
  <h1>Колёсико</h1>
  <p><strong>Ab Wheel · Standing Rollout Tracker</strong></p>

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

<p align="center">
  <b>Универсальный PWA-трекер тренировок, который можно адаптировать под любую программу.</b><br>
  Дни, упражнения, подходы, замеры тела, таймер отдыха, история — всё в одном файле.<br>
  В репозитории — <b>готовый пример</b>: программа Standing Rollout на колесе для пресса.
</p>

---

## Что это

Полностью кастомизируемое приложение для отслеживания любых тренировок:

- Любые дни недели, любое количество тренировок
- Любые упражнения с подходами, повторениями и нагрузкой
- Дорожная карта прогресса с визуальными барами
- Редактирование всего через интерфейс — не нужно править код
- Экспорт / импорт данных — переносите прогресс куда угодно

Всё, что вы видите в этом репозитории — конкретный пример для ab wheel standing rollout. Ничего не мешает очистить недели, переименовать тренировки, добавить свои упражнения и получить трекер для бега, турника, кроссфита или йоги.

## Возможности

- **Программа «Standing Rollout»** — пошаговая дорожная карта от Wall Rollout до полного выхода
- **3 тренировки в неделю** (Push / Pull / Skill) с упражнениями, подходами и повторениями
- **Режим редактирования** — добавляй, удаляй, переставляй упражнения, меняй теги
- **История тренировок** — календарь + список, фильтр по неделям, inline-редактирование
- **График прогресса** — средние повторения по каждому упражнению на canvas, переключение календарь/график, легенда с подсветкой линии при наведении, зум
- **Замеры тела** — вес (шкала 70–100) / грудь, талия, бицепс — два отдельных графика, каждый со своей шкалой
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

---

## English

<div align="center">
  <h1>Kolyosiko</h1>
  <p><strong>Universal PWA Workout Tracker</strong></p>
</div>

A fully customizable single-file workout tracker. Configure days, exercises, sets, reps, load — or use the built-in Standing Rollout program for ab wheel progression.

### Features

- **Standing Rollout program** — step-by-step roadmap from Wall Rollout to full standing
- **3 sessions / week** (Push / Pull / Skill) with exercises, sets, and reps
- **Edit mode** — add, delete, reorder exercises, change tags
- **Training history** — calendar view + list, week filter, inline editing
- **Progress chart** — per-exercise average reps on canvas, calendar/chart toggle, hover line highlight, zoom
- **Body measurements** — weight (fixed 70–100 scale) / chest, waist, biceps — two separate charts, each with its own Y-axis
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

### Quick start

```
https://enlyl.github.io/ab-wheel-tracker/
```

Or locally:
```bash
git clone https://github.com/Enlyl/ab-wheel-tracker.git
cd ab-wheel-tracker
# open index.html in a browser
```

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
☀  Светлая      —  классика, минимум отвлекающего
☽  Тёмная       —  стандартная тёмная тема
⚡  Cyberpunk    —  неон: розовый, циан, фиолетовый
⎔  Matrix       —  зелёный монохром
◈  Synthwave    —  фиолетово-розовый закат
⌨  Terminal     —  amber на чёрном, как старый терминал
◌  Holo         —  голографический отлив
```

## Технологии

```
┌─────────────────────────────────────┐
│          index.html  (268 КБ)        │
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
| `abw_weeks` | Прогресс дорожной карты |
| `abw_history` | История тренировок |
| `abw_measurements` | Замеры тела |
| `abw_app_cfg` | Настройки интерфейса |
| `abw_sw` | Состояние секундомера |
| `catEdits` | Пользовательские правки каталога |

## Лицензия

MIT
