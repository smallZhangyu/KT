const http = require('http');
const queryString = require('querystring');

const server = http.createServer((req, res) => {
  const method = req.method;
  const url = req.url;
  const urlSplitArray = url.split('?');
  const path = urlSplitArray[0];
  const queryStr = queryString.parse(urlSplitArray[1]);
  const contentType = req.headers['content-type'];

  const resData = {
    method,
    url,
    path,
    queryString: queryStr,
    contentType,
  };

  res.setHeader('content-type', 'application/json');

  // handle get request, http://localhost:8000/api/blog/list?author=zhangSan&keywords=abc
  if (method === 'GET') {
    res.end(JSON.stringify(resData));
  }

  // handle post request
  if (method === 'POST') {
    let reqData = '';
    req.on('data', (chunk) => {
      reqData += chunk.toString();
    });

    req.on('end', () => {
      resData.reqestBody = reqData;
      res.end(JSON.stringify(resData));
    });
  }
});

const serverPort = 8000;

server.listen(serverPort, () => {
  console.log(`server is running in ${serverPort}`);
});
