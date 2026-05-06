# UniVerse App — React + TypeScript

## Структура проекта

```
universe-app/
├── src/
│   ├── App.tsx                    # Главный роутер (web / mobile режим)
│   ├── MobileApp.tsx              # Оболочка мобильного приложения + навигация
│   ├── main.tsx                   # Точка входа
│   │
│   ├── screens/                   # Экраны мобильного приложения
│   │   ├── LogoScreen.tsx         # Splash / Logo screen (авто-переход через 2.5с)
│   │   ├── OnboardingScreen.tsx   # Онбординг 1–3 + иллюстрации (SVG)
│   │   └── SignUpScreen.tsx       # Sign Up форма
│   │
│   └── pages/
│       └── WebLanding.tsx         # Полноценный веб-лендинг (dark, responsive)
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

## Переключение режимов

В правом верхнем углу есть кнопки:
- **🌐 Web** — лендинг сайт (dark theme, адаптивный)
- **📱 Mobile** — мобильное приложение в рамке телефона

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

## Как добавить новые экраны

1. Создайте файл в `src/screens/NewScreen.tsx`
2. Добавьте тип в `MobileApp.tsx` → `type Screen = "logo" | "onboarding" | "signup" | "new"`
3. Добавьте рендер в `MobileApp.tsx`
4. Добавьте навигацию по кнопкам

## Следующие шаги

- [ ] Добавить React Router для нормальной маршрутизации
- [ ] Подключить реальные иллюстрации из Figma (заменить SVG)
- [ ] Добавить Framer Motion для более плавных переходов
- [ ] Добавить экран Home/Dashboard
- [ ] Добавить экраны Jobs, Housing, Events
- [ ] Подключить API/backend
