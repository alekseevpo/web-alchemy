# Инструкция по деплою на Vercel

## Быстрый старт

### 1. Подготовка репозитория GitHub

1. Создайте репозиторий на GitHub (если еще нет)
2. Загрузите код в репозиторий:
   ```bash
   git add .
   git commit -m "Initial commit: Technical specification"
   git remote add origin https://github.com/your-username/espana-best.git
   git push -u origin main
   ```

### 2. Настройка Giscus (для комментариев)

1. Перейдите на [giscus.app](https://giscus.app)
2. Введите URL вашего репозитория: `your-username/espana-best`
3. Настройте параметры:
   - **Page ↔ Discussion Mapping:** `pathname`
   - **Discussion Category:** выберите или создайте категорию (например, "Announcements")
4. Скопируйте значения:
   - `data-repo` (например: `your-username/espana-best`)
   - `data-repo-id` (например: `R_kgDOLikeqc`)

### 3. Деплой на Vercel

#### Вариант A: Через веб-интерфейс (рекомендуется)

1. Перейдите на [vercel.com/new](https://vercel.com/new)
2. Войдите через GitHub
3. Выберите репозиторий `espana-best`
4. Нажмите **Import**
5. В настройках проекта добавьте переменные окружения:
   - `NEXT_PUBLIC_GISCUS_REPO` = `your-username/espana-best`
   - `NEXT_PUBLIC_GISCUS_REPO_ID` = `your-repo-id`
6. Нажмите **Deploy**

#### Вариант B: Через CLI

1. Установите Vercel CLI (если еще нет):
   ```bash
   npm i -g vercel
   ```

2. Войдите в Vercel:
   ```bash
   vercel login
   ```

3. Задеплойте проект:
   ```bash
   vercel
   ```

4. Добавьте переменные окружения:
   ```bash
   vercel env add NEXT_PUBLIC_GISCUS_REPO
   vercel env add NEXT_PUBLIC_GISCUS_REPO_ID
   ```

5. Задеплойте в production:
   ```bash
   vercel --prod
   ```

### 4. Проверка работы

1. Откройте URL вашего проекта на Vercel
2. Проверьте, что техническое задание отображается корректно
3. Прокрутите вниз до секции комментариев
4. Если комментарии не отображаются, проверьте:
   - Правильность переменных окружения
   - Что репозиторий публичный
   - Что Giscus приложение установлено на репозиторий

## Обновление содержимого

После внесения изменений в код:

1. Закоммитьте изменения:
   ```bash
   git add .
   git commit -m "Update technical specification"
   git push
   ```

2. Vercel автоматически задеплоит изменения (если настроен авто-деплой)
3. Или задеплойте вручную через CLI:
   ```bash
   vercel --prod
   ```

## Полезные ссылки

- [Документация Vercel](https://vercel.com/docs)
- [Документация Giscus](https://github.com/giscus/giscus)
- [Документация Next.js](https://nextjs.org/docs)
