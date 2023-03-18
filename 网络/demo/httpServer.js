const http = require('http');
const PORT = 8000;
const zlib = require('zlib');

const app = http.createServer((req, res) => {
  console.log(`request url: ${req.url}`);
  res.writeHead(200, {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'PUT, DELETE',
    'Access-Control-Allow-Headers': 'X-TOKEN',
    'Access-Control-Max-Age': 60,
  });

  if (req.url === '/') {
    res.writeHead(200, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'PUT, DELETE',
      'Access-Control-Allow-Headers': 'X-TOKEN',
      'Access-Control-Max-Age': 60,
      'Content-Encoding': 'gzip', // 开启gzip压缩
    });
    const msg =
      'http is running/nhttp is running/nhttp is running/nhttp is running/nhttp is running/nhttp is running/nhttp is running/nhttp is running/nhttp is running/nhttp is running/nhttp is running/nhttp is running/nhttp is running/nhttp is running/nhttp is running/nhttp is running/nhttp is running/nhttp is running/nhttp is running/nhttp is running/nhttp is running/nhttp is running/nhttp is running/nhttp is running/nhttp is running/nhttp is running/nhttp is running/nhttp is running/nhttp is running/n';
    res.end(zlib.gzipSync(msg)); // gzip压缩传输
    // res.end(msg);
  }

  if (req.url === '/script.js') {
    const etagFlag = req.headers['if-none-match'];

    if (etagFlag === 'asdf') {
      res.writeHead(304, {
        'content-type': 'text/javascript',
      });

      res.end('console.log("123");'); // 不会生效，读取的之前的缓存结果
      return;
    }

    res.writeHead(200, {
      'content-type': 'text/javascript',
      'Cache-Control': 'max-age=60, no-cache',
      'Last-Modified': '123',
      Etag: 'asdf',
    });

    res.end('console.log("script loader");');
  }
});

app.listen(PORT, () => {
  console.log('Server is running on port ' + PORT);
});
