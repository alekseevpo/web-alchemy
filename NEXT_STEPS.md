# Следующие шаги

Репозиторий готов: [alekseevpo/espana-best](https://github.com/alekseevpo/espana-best)

## 1. Загрузка кода в GitHub

```bash
# Добавить все файлы
git add .

# Создать коммит
git commit -m "Initial commit: Technical specification with comments system"

# Загрузить в GitHub
git push -u origin main
```

Если ветка называется `master` вместо `main`:
```bash
git branch -M main  # Переименовать ветку в main
git push -u origin main
```

## 2. Настройка Giscus для комментариев

1. Перейдите на [giscus.app](https://giscus.app)
2. Введите URL вашего репозитория: `alekseevpo/espana-best`
3. Настройте параметры:
   - **Page ↔ Discussion Mapping:** `pathname`
   - **Discussion Category:** выберите или создайте категорию (например, "Announcements")
   - **Features:** оставьте значения по умолчанию
4. Скопируйте полученные значения:
   - `data-repo` = `alekseevpo/espana-best`
   - `data-repo-id` = `R_kgD...` (ваш ID)

## 3. Деплой на Vercel

### Вариант A: Через веб-интерфейс (рекомендуется)

1. Перейдите на [vercel.com/new](https://vercel.com/new)
2. Войдите через GitHub
3. Выберите репозиторий `alekseevpo/espana-best`
4. Нажмите **Import**
5. В настройках проекта добавьте переменные окружения:
   - `NEXT_PUBLIC_GISCUS_REPO` = `alekseevpo/espana-best`
   - `NEXT_PUBLIC_GISCUS_REPO_ID` = `ваш-repo-id` (из шага 2)
6. Нажмите **Deploy**

### Вариант B: Через CLI

```bash
# Установить Vercel CLI (если еще не установлен)
npm i -g vercel

# Войти в Vercel
vercel login

# Задеплоить проект
vercel

# Добавить переменные окружения
vercel env add NEXT_PUBLIC_GISCUS_REPO
vercel env add NEXT_PUBLIC_GISCUS_REPO_ID

# Задеплоить в production
vercel --prod
```

## 4. Локальная разработка с Giscus

После настройки Giscus, создайте файл `.env.local` в корне проекта:

```env
NEXT_PUBLIC_GISCUS_REPO=alekseevpo/espana-best
NEXT_PUBLIC_GISCUS_REPO_ID=ваш-repo-id
```

Затем перезапустите dev-сервер:
```bash
npm run dev
```

## 5. Проверка работы

1. Откройте задеплоенное приложение на Vercel
2. Прокрутите до любого раздела технического задания
3. В конце раздела должна отображаться секция комментариев
4. Попробуйте оставить комментарий (потребуется авторизация через GitHub)

## Полезные ссылки

- Репозиторий: https://github.com/alekseevpo/espana-best
- Giscus: https://giscus.app
- Vercel: https://vercel.com
- Документация Next.js: https://nextjs.org/docs
