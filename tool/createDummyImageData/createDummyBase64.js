const fs = require('fs');
const path = require('path');

// const imagePath = path.resolve(__dirname, 'input/plumbing2.jpg');
// const imagePath = path.resolve(__dirname, 'input/plumbing.jpg');
// const imagePath = path.resolve(__dirname, 'input/aircon.jpg');
const imagePath = path.resolve(__dirname, 'input/profile.jpg');
const imageBuffer = fs.readFileSync(imagePath);
const imageBase64 = imageBuffer.toString('base64');

console.log(imageBase64);
fs.writeFileSync('./tool/createDummyImageData/imageBase64.txt', imageBase64);