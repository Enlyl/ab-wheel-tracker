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
- **История тренировок** — каждое занятие сохраняется с датой, подходами и заметками
- **Замеры тела** — вес, грудь, талия, бицепс с графиком изменений
- **Встроенный таймер отдыха** — с кольцевой анимацией и метрономом
- **Секундомер** — не сбрасывается при перезагрузке страницы
- **Каталог упражнений** — поиск, свои упражнения, альтернативы
- **Экспорт / Импорт** — полный бекап всех данных в JSON
- **7 тем оформления** — светлая, тёмная, cyberpunk, matrix, synthwave, terminal, holo
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
│  │  Canvas (график замеров)      │  │
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
