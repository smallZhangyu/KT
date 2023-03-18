const fs = require('fs');
const path = require('path');
const fileName1 = path.resolve(__dirname, 'sourceTxt.txt');
const fileName2 = path.resolve(__dirname, 'targetTxt.txt');

const readStream = fs.createReadStream(fileName1);
const writeStream = fs.createWriteStream(fileName2);
readStream.pipe(writeStream);

readStream.on('data', (chunk) => {
  console.log('=======\n' + chunk.toString());
});

readStream.on('end', () => {
  console.log('copy end.');
});
