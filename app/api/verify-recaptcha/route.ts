import { NextRequest, NextResponse } from 'next/server';

const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY || '';

/**
 * API route для проверки reCAPTCHA токена на сервере
 */
export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json();

    if (!token) {
      return NextResponse.json(
        { success: false, error: 'Токен reCAPTCHA не предоставлен' },
        { status: 400 }
      );
    }

    if (!RECAPTCHA_SECRET_KEY) {
      console.warn('RECAPTCHA_SECRET_KEY не настроен');
      // В режиме разработки разрешаем без проверки
      return NextResponse.json({ success: true, score: 1.0 });
    }

    // Проверка токена через Google API
    const response = await fetch(
      `https://www.google.com/recaptcha/api/siteverify`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `secret=${RECAPTCHA_SECRET_KEY}&response=${token}`,
      }
    );

    const data = await response.json();

    if (data.success) {
      // reCAPTCHA v3 возвращает score от 0.0 до 1.0
      // Обычно score > 0.5 считается подозрительным, > 0.7 - нормальным
      const score = data.score || 0;
      const threshold = 0.5; // Порог для принятия решения

      return NextResponse.json({
        success: score >= threshold,
        score,
        action: data.action,
      });
    } else {
      return NextResponse.json(
        {
          success: false,
          error: 'Неверный токен reCAPTCHA',
          'error-codes': data['error-codes'],
        },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Ошибка проверки reCAPTCHA:', error);
    return NextResponse.json(
      { success: false, error: 'Ошибка при проверке reCAPTCHA' },
      { status: 500 }
    );
  }
}
