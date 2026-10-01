import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function generateFavicons() {
  const inputPath = path.resolve(__dirname, '../public/logo.png');
  const publicDir = path.resolve(__dirname, '../public');
  
  try {
    // 32x32 favicon
    await sharp(inputPath)
      .resize(32, 32)
      .png()
      .toFile(path.join(publicDir, 'favicon-32x32.png'));
      
    // 192x192 Android / Chrome icon
    await sharp(inputPath)
      .resize(192, 192)
      .png()
      .toFile(path.join(publicDir, 'favicon-192x192.png'));
      
    // 180x180 Apple Touch Icon
    await sharp(inputPath)
      .resize(180, 180)
      .png()
      .toFile(path.join(publicDir, 'apple-touch-icon.png'));

    console.log('Favicons generated successfully.');
  } catch (error) {
    console.error('Error generating favicons:', error);
  }
}

generateFavicons();
