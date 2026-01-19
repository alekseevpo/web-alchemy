import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Ленивая инициализация Resend - создаем только когда нужен и есть API ключ
function getResend() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new Resend(apiKey);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, service, message, recaptchaToken } = body;

    // Валидация данных
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, message: 'Все обязательные поля должны быть заполнены' },
        { status: 400 }
      );
    }

    // Проверка reCAPTCHA (если токен предоставлен)
    if (recaptchaToken) {
      const secretKey = process.env.RECAPTCHA_SECRET_KEY;
      
      if (!secretKey) {
        console.warn('RECAPTCHA_SECRET_KEY не настроен на сервере. Проверка reCAPTCHA пропущена.');
      } else {
        // Проверка токена напрямую через Google API
        const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${recaptchaToken}`;
        
        try {
          const verifyResponse = await fetch(verifyUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          });
          
          const verifyData = await verifyResponse.json();
          
          if (!verifyData.success || verifyData.score < 0.5) {
            console.error('reCAPTCHA verification failed:', verifyData);
            return NextResponse.json(
              { success: false, message: 'Проверка reCAPTCHA не пройдена' },
              { status: 401 }
            );
          }
        } catch (error) {
          console.error('Error verifying reCAPTCHA token:', error);
          return NextResponse.json(
            { success: false, message: 'Ошибка проверки reCAPTCHA' },
            { status: 500 }
          );
        }
      }
    }

    // Проверяем наличие Resend API ключа
    const resend = getResend();
    if (!resend) {
      console.log('📧 Контактная форма (RESEND_API_KEY не настроен):');
      console.log('Имя:', name);
      console.log('Email:', email);
      console.log('Услуга:', service || 'Не указана');
      console.log('Сообщение:', message);
      
      // В продакшене лучше вернуть ошибку
      // return NextResponse.json(
      //   { success: false, message: 'Email сервис не настроен' },
      //   { status: 500 }
      // );
      
      // Для разработки - имитация успешной отправки
      return NextResponse.json({ 
        success: true, 
        message: 'Сообщение получено (в режиме разработки)' 
      });
    }

    // Получаем название услуги из сервиса
    const serviceNames: Record<string, string> = {
      'webapp': 'Веб-приложения',
      'businesscard': 'Сайты-визитки',
      'landing': 'Landing-страницы',
      'corporate': 'Корпоративные сайты',
      'support': 'Техническая поддержка',
      'specification': 'Разработка технического задания',
      'onlineStore': 'Онлайн магазин',
      'bot': 'Разработка ботов',
      'other': 'Другое',
    };

    const serviceName = service ? serviceNames[service] || service : 'Не указана';

    // Формируем содержимое email
    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
            .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
            .field { margin-bottom: 20px; }
            .label { font-weight: bold; color: #4b5563; margin-bottom: 5px; display: block; }
            .value { color: #1f2937; padding: 10px; background: white; border-radius: 4px; border-left: 3px solid #667eea; }
            .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; font-size: 12px; color: #6b7280; text-align: center; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0;">Новое сообщение с сайта Web-Alchemy</h1>
            </div>
            <div class="content">
              <div class="field">
                <span class="label">Имя:</span>
                <div class="value">${name}</div>
              </div>
              <div class="field">
                <span class="label">Email:</span>
                <div class="value">${email}</div>
              </div>
              <div class="field">
                <span class="label">Услуга:</span>
                <div class="value">${serviceName}</div>
              </div>
              <div class="field">
                <span class="label">Сообщение:</span>
                <div class="value" style="white-space: pre-wrap;">${message}</div>
              </div>
              <div class="footer">
                <p>Это сообщение было отправлено с контактной формы сайта Web-Alchemy</p>
                <p>Время отправки: ${new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' })}</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    const emailText = `
Новое сообщение с сайта Web-Alchemy

Имя: ${name}
Email: ${email}
Услуга: ${serviceName}

Сообщение:
${message}

---
Это сообщение было отправлено с контактной формы сайта Web-Alchemy
Время отправки: ${new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' })}
    `;

    // Отправка email через Resend
    const { data, error } = await resend!.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'Web-Alchemy <onboarding@resend.dev>',
      to: 'alekseevpo@gmail.com',
      replyTo: email,
      subject: `Новое сообщение с сайта Web-Alchemy: ${serviceName}`,
      html: emailHtml,
      text: emailText,
    });

    if (error) {
      console.error('Ошибка отправки email через Resend:', error);
      return NextResponse.json(
        { success: false, message: 'Ошибка отправки сообщения' },
        { status: 500 }
      );
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Сообщение успешно отправлено',
      emailId: data?.id 
    });

  } catch (error) {
    console.error('Ошибка обработки запроса контактной формы:', error);
    return NextResponse.json(
      { success: false, message: 'Внутренняя ошибка сервера' },
      { status: 500 }
    );
  }
}
