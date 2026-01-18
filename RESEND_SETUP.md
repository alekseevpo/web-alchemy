# Настройка Resend для отправки email

## Шаг 1: Регистрация на Resend

1. Перейдите на [https://resend.com/signup](https://resend.com/signup)
2. Зарегистрируйтесь (можно через GitHub/Google или email)
3. Подтвердите email (если регистрировались через email)

## Шаг 2: Получение API ключа

1. После входа в Dashboard, перейдите в раздел **API Keys**
   - Ссылка: [https://resend.com/api-keys](https://resend.com/api-keys)
2. Нажмите **"Create API Key"**
3. Введите название (например: "Web-Alchemy Production" или "Web-Alchemy Development")
4. Выберите права доступа (нужно разрешить отправку email)
5. Нажмите **"Create"**
6. **ВАЖНО**: Скопируйте API ключ (он начинается с `re_`). Показать его можно будет только один раз!

## Шаг 3: Добавление API ключа в проект

Откройте файл `.env.local` и добавьте ваш API ключ:

```bash
RESEND_API_KEY=re_ваш_ключ_здесь
```

### Пример:

```bash
# Google reCAPTCHA v3
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=6Lcdl04sAAAAAKvUfYaHE55nbqc6Oq2rqzaix4e2
RECAPTCHA_SECRET_KEY=6Lcdl04sAAAAAHSHsEh6HtAwwYDTj7Zj98cAfDZs

# Resend Email Service
RESEND_API_KEY=re_AbCdEf1234567890
RESEND_FROM_EMAIL=Web-Alchemy <onboarding@resend.dev>
```

## Шаг 4: Настройка From Email (опционально)

### Вариант 1: Использовать тестовый email от Resend (для разработки)

```bash
RESEND_FROM_EMAIL=Web-Alchemy <onboarding@resend.dev>
```

Этот email работает автоматически и не требует дополнительной настройки.

### Вариант 2: Настроить свой домен (рекомендуется для production)

1. В Dashboard Resend перейдите в **Domains**
2. Нажмите **"Add Domain"**
3. Введите ваш домен (например: `yourdomain.com`)
4. Добавьте DNS записи, которые Resend предоставит, в настройки вашего домена
5. Дождитесь верификации (обычно несколько минут)
6. Используйте email с вашего домена:

```bash
RESEND_FROM_EMAIL=Web-Alchemy <noreply@yourdomain.com>
```

## Шаг 5: Тестирование

1. Перезапустите локальный сервер разработки:
   ```bash
   npm run dev
   ```

2. Заполните форму контактов на сайте
3. Отправьте форму
4. Проверьте почту `alekseevpo@gmail.com` - должно прийти письмо

## Шаг 6: Настройка на Vercel (для production)

1. Перейдите в Vercel Dashboard → Ваш проект → Settings → Environment Variables
2. Добавьте переменные:
   - `RESEND_API_KEY` = ваш API ключ
   - `RESEND_FROM_EMAIL` = `Web-Alchemy <noreply@yourdomain.com>` или `Web-Alchemy <onboarding@resend.dev>`
3. Выберите окружения: Production, Preview, Development
4. Нажмите "Save"
5. Перезапустите deployment

## Полезные ссылки

- Resend Dashboard: [https://resend.com](https://resend.com)
- API Keys: [https://resend.com/api-keys](https://resend.com/api-keys)
- Domains: [https://resend.com/domains](https://resend.com/domains)
- Документация: [https://resend.com/docs](https://resend.com/docs)

## Лимиты Resend

Бесплатный план Resend включает:
- 3,000 emails в месяц
- 100 emails в день
- Достаточно для небольших проектов

## Помощь

Если возникают проблемы:
1. Проверьте, что API ключ скопирован правильно (без пробелов)
2. Убедитесь, что переменная `RESEND_API_KEY` добавлена в `.env.local`
3. Перезапустите сервер разработки после изменения `.env.local`
4. Проверьте консоль сервера на наличие ошибок
