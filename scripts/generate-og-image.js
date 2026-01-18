/**
 * Скрипт для генерации OG изображения
 * 
 * Требования:
 * - Node.js 18+
 * - Установить зависимости: npm install puppeteer
 * 
 * Использование:
 * node scripts/generate-og-image.js
 */

const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

async function generateOGImage() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();
    
    // Установить размер viewport для OG изображения
    await page.setViewport({
      width: 1200,
      height: 630,
      deviceScaleFactor: 1 // Оптимизировано для меньшего размера файла
    });

    // Загрузить HTML шаблон
    const htmlPath = path.join(__dirname, '..', 'og-image-template.html');
    const htmlContent = fs.readFileSync(htmlPath, 'utf-8');
    
    // Заменить путь к логотипу на абсолютный
    const htmlWithLogo = htmlContent.replace(
      'src="logo.png"',
      `src="file://${path.join(__dirname, '..', 'public', 'logo.png')}"`
    );

    await page.setContent(htmlWithLogo, { waitUntil: 'networkidle0' });

    // Подождать загрузки изображений
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Сделать скриншот
    const outputPath = path.join(__dirname, '..', 'public', 'og-image.png');
    await page.screenshot({
      path: outputPath,
      type: 'png',
      fullPage: false,
      clip: {
        x: 0,
        y: 0,
        width: 1200,
        height: 630
      },
      omitBackground: false // Для правильного отображения фона
    });

    console.log('✅ OG изображение создано:', outputPath);
    console.log('📝 Размер файла:', (fs.statSync(outputPath).size / 1024).toFixed(2), 'KB');
    console.log('💡 Рекомендуется оптимизировать изображение через Squoosh.app или ImageOptim');

  } catch (error) {
    console.error('❌ Ошибка при создании OG изображения:', error);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

// Запуск
if (require.main === module) {
  generateOGImage().catch(console.error);
}

module.exports = { generateOGImage };
