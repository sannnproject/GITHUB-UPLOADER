const sharp = require('sharp');
const fs = require('fs');

async function resize() {
  const input = './src/assets/images/modern_github_upload_logo_1782643766844.jpg';
  
  // ensure public dir exists
  if (!fs.existsSync('public')) {
    fs.mkdirSync('public');
  }

  await sharp(input)
    .resize(192, 192)
    .png()
    .toFile('public/icon-192x192.png');

  await sharp(input)
    .resize(512, 512)
    .png()
    .toFile('public/icon-512x512.png');

  console.log('Icons generated successfully.');
}

resize().catch(console.error);
