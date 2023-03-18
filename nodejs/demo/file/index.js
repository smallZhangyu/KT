/**
 * test file read/write
 */

const fs = require('fs');
const path = require('path');
const fileName = path.resolve(__dirname, 'text.txt');

// 文件读取操作
// fs.readFile(fileName, (error, content) => {
//   if (error) {
//     console.error(error);
//     return;
//   }

//   console.log(content.toString()); // content 为二进制数据，使用toString()转换
// });

// 文件写操作
const writeData = 'this is write data\n';
const opts = {
  flag: 'a', // default is 'w', w是覆盖，a是追加
};
fs.writeFile(fileName, writeData, opts, (error) => {
  if (error) {
    console.error(error);
  }
});

// 检查文件是否存在 fs.exist已废弃，使用fs.state/ fs.access 代替
fs.stat(fileName, (err, stats) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(stats.isFile());
  console.log(stats.isDirectory());
});
