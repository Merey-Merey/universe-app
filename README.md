# UniVerse App — React + TypeScript

## Структура проекта

```
universe-app/
├── src/
│   ├── App.tsx                    # Главный роутер (web / mobile режим)
│   ├── main.tsx                   # Точка входа
│   │
│   ├── pages/                     # Экраны и полноценный веб-лендинг мобильного приложения
│       ├── LogoPage.tsx           # Splash / Logo screen (авто-переход через 2.5с)
│       ├── OnboardingPage.tsx     # Онбординг 1–3 + иллюстрации (SVG)
│       └── SignUpPage.tsx         # Sign Up форма
│
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json
└── tsconfig.node.json
```

## Запуск

```bash
cd universe-app
npm install
npm run dev
```

Откройте http://localhost:5173

## Что реализовано

### Мобильное приложение
- ✅ Logo screen (анимация, автопереход)
- ✅ Onboarding 1: "Find Your Dream Job"
- ✅ Onboarding 2: "Find Your Perfect Home"
- ✅ Onboarding 3: "Never Miss an Event"
- ✅ Sign Up форма
- ✅ Навигация (Skip, Next, Get Started)
- ✅ Анимации переходов
- ✅ Phone shell с notch

### Веб-лендинг
- ✅ Sticky navbar
- ✅ Hero секция с двумя phone mockup
- ✅ Features (3 карточки с hover)
- ✅ Stats (4 метрики)
- ✅ How it works (3 шага)
- ✅ CTA с email подпиской
- ✅ Footer
- ✅ Адаптивный дизайн (breakpoint 768px)
- ✅ Floating animations

## Дизайн-токены (CSS переменные)

| Переменная       | Значение   | Использование            |
|-----------------|------------|--------------------------|
| `--purple`      | `#7C3AED`  | Основной акцент          |
| `--purple-light`| `#A78BFA`  | Градиенты, текст         |
| `--dark`        | `#0A0818`  | Фон веб-версии           |
| `--text`        | `#E8E4FF`  | Основной текст           |
| `--muted`       | `#9490B5`  | Вторичный текст          |

Цвета мобильного приложения:
- Фон: `#F8F7FF`
- Primary/navbar: `#1E1B4B`
- Accent: `#7C3AED`
- Text: `#0F0E2A`

