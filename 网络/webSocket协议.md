# webSocket 协议

## webSocket 协议简介

2008 年提出，2011 年成为标准。HTML5 新增的协议；可以在浏览器和服务器之间建立一个全双工的通信通道，支持端到端通讯，可以由 client 发起，也可以由 server 发起。

### 底层原理

WebSocket 协议建立在 tcp 协议基础上的。tcp 协议是全双工协议，http 协议基于它，但设计成了单向的。WebSocket 协议没有同源限制。

### 使用场景

1. 消息通知
2. 直播间讨论区
3. 聊天室
4. 协同编辑

## WebSocket 和 HTTP 区别

1. WebSocket 协议名是`ws://`，可双端发起请求；
2. WebSocket 没有跨域限制；
3. 通过 send 和 onmessage 通讯（HTTP 通过 req 和 res 通讯）

## WebSocket 和 HTTP 长轮询的区别

HTTP 长轮询：客户端发起请求，服务端阻塞，不会立即返回；  
WebSocket：客户端可发起请求，服务端也可发起请求，立即返回，不需要阻塞。

## 使用示例

```js
// 服务端
const { WebSocketServer } = require('ws');

const wsServer = new WebSocketServer({ port: 3000 });

const wsList = new Set();

wsServer.on('connection', (curWs) => {
  // 需要清除无效的ws
  wsList.add(curWs);

  curWs.on('message', function message(msg) {
    console.log('received msg is ', msg.toString());

    wsList.forEach((ws) => {
      if (ws === curWs) return;

      ws.send(msg.toString());
    });
  });
});
```

```js
// 客户端
var ws = new WebSocket('ws://127.0.0.1:3000');

ws.onopen = function (event) {
  ws.send('Client B is open.');
};

ws.onmessage = function (event) {
  console.log('Client B === ', event.data);
};
```

## ws 可升级为 wss(像 https)

```js
import { createServer } from 'https';
import { readFileSync } from 'fs';
import { WebSocketServer } from 'ws';

const server = createServer({
  cert: readFileSync('/path/cert.pem'),
  key: readFileSync('/path/key.pem'),
});
const ws = new WebSocketServer({ server });
```

## socket.io

Socket.IO 是一个库，可以在客户端和服务器之间实现 低延迟, 双向 和 基于事件的通信。  
它建立在 WebSocket 协议之上，并提供额外的保证，例如回退到 HTTP 长轮询或自动重新连接。  
它可以在每个平台、每个浏览器和每个设备上工作，可靠性和速度同样稳定。

[socket.io 文档](https://socket.io/zh-CN/docs/v4/)
