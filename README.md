# Web Alchemy - Сайт компании

Веб-сайт компании Web Alchemy, занимающейся разработкой веб-проектов любой сложности под ключ.

## Технологии

- **Next.js 16** (React, TypeScript)
- **Tailwind CSS** для стилизации
- **Многоязычность** (русский, английский, испанский)
- **Темная/светлая тема**

## Локальная разработка

```bash
# Установка зависимостей
npm install

# Запуск dev-сервера
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000) в браузере.

## Структура проекта

```
web-alchemy/
├── app/
│   ├── page.tsx          # Главная страница
│   ├── layout.tsx        # Layout приложения
│   ├── developers/
│   │   └── page.tsx      # Страница разработчиков
│   └── globals.css       # Глобальные стили
├── components/
│   ├── CompanyContent.tsx    # Основной контент о компании
│   ├── AppChrome.tsx         # Навигация и chrome элементы
│   ├── Footer.tsx            # Футер страницы
│   ├── TableOfContents.tsx   # Навигация по разделам
│   └── ...
├── lib/
│   └── i18n/                 # Переводы и языковой контекст
│       ├── translations.ts
│       └── LanguageContext.tsx
└── README.md
```

## Кастомизация

Основной контент находится в:
- `components/CompanyContent.tsx` - секции: Hero, Services, About, Contact
- `lib/i18n/translations.ts` - все текстовые переводы
- `app/layout.tsx` - метаданные страницы

Стили можно изменять через Tailwind CSS классы или в `app/globals.css`.

## Деплой на Vercel

1. **Подключите репозиторий к Vercel:**
   - Загрузите код в GitHub/GitLab
   - Подключите репозиторий в [Vercel Dashboard](https://vercel.com/new)

2. **Деплой:**
   - Vercel автоматически задеплоит проект
   - Или используйте: `vercel --prod`

## Лицензия

Проект создан для Web Alchemy.
