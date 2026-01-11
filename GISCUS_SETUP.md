# Пошаговая инструкция по настройке Giscus

## Шаг 1: Откройте Giscus Configuration

Перейдите на сайт: **https://giscus.app**

## Шаг 2: Заполните информацию о репозитории

1. В поле **Repository** введите: `alekseevpo/espana-best`

2. Убедитесь, что репозиторий:
   - ✅ Является публичным (public)
   - ✅ Включены GitHub Discussions (Settings → General → Features → Discussions)

## Шаг 3: Настройте параметры

### Page ↔ Discussion Mapping
Выберите: **`pathname`**

### Discussion Category
- Выберите категорию "Announcements" или создайте новую
- Можно оставить категорию по умолчанию

### Features (можно оставить по умолчанию)
- ✅ Reactions enabled
- ✅ Emit metadata: No (опционально)

### Theme
Выберите: **`preferred_color_scheme`** (автоматически адаптируется к теме)

### Language
Выберите: **`Russian`** (или English, если предпочитаете)

## Шаг 4: Скопируйте настройки

После заполнения формы вы получите код, который содержит:

1. **data-repo** = `alekseevpo/espana-best`
2. **data-repo-id** = `R_kgD...` (это важный ID, скопируйте его!)
3. **data-category-id** (если указали категорию)

## Шаг 5: Настройте переменные окружения

### Для локальной разработки

Создайте файл `.env.local` в корне проекта:

```env
NEXT_PUBLIC_GISCUS_REPO=alekseevpo/espana-best
NEXT_PUBLIC_GISCUS_REPO_ID=ваш-repo-id-здесь
```

**Важно:** Замените `ваш-repo-id-здесь` на реальный `data-repo-id` из шага 4.

### Для Vercel (Production)

1. Перейдите в настройки проекта на Vercel
2. Откройте **Settings → Environment Variables**
3. Добавьте переменные:
   - `NEXT_PUBLIC_GISCUS_REPO` = `alekseevpo/espana-best`
   - `NEXT_PUBLIC_GISCUS_REPO_ID` = `ваш-repo-id-здесь`
4. Выберите окружения: **Production**, **Preview**, **Development**
5. Нажмите **Save**
6. Передеплойте проект

## Шаг 6: Включите GitHub Discussions (если еще не включены)

1. Перейдите в репозиторий: https://github.com/alekseevpo/espana-best
2. Откройте **Settings** → **General**
3. Прокрутите до раздела **Features**
4. Найдите **Discussions** и включите его (галочка)
5. Нажмите **Set up discussions**

## Шаг 7: Проверка

1. Запустите локальный сервер: `npm run dev`
2. Откройте http://localhost:3000
3. Прокрутите до любого раздела технического задания
4. В конце раздела должна появиться секция комментариев Giscus
5. Попробуйте оставить комментарий (потребуется авторизация через GitHub)

## Решение проблем

### Комментарии не отображаются

1. Проверьте, что репозиторий публичный
2. Убедитесь, что GitHub Discussions включены
3. Проверьте правильность `data-repo-id` в переменных окружения
4. Убедитесь, что файл `.env.local` существует (для локальной разработки)
5. Перезапустите dev-сервер после изменения `.env.local`

### Ошибка авторизации

- Убедитесь, что вы авторизованы в GitHub
- Giscus использует OAuth для авторизации через GitHub

### Виджет не загружается

- Проверьте консоль браузера на наличие ошибок
- Убедитесь, что скрипт Giscus загружается (проверьте Network tab в DevTools)

## Дополнительная информация

- Документация Giscus: https://github.com/giscus/giscus
- GitHub Discussions: https://docs.github.com/en/discussions
