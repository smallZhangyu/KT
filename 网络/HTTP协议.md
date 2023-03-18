# HTTP 协议

## HTTP 历史

1. HTTP/0.9，只有 GET 请求，没有 HEADER 等描述数据的信息，服务器发送完毕，就关闭 TCP 连接；
2. HTTP/1.0，增加了很多命令，增加 status code 和 header，多字符集支持、多部分发送、权限、缓存等
3. HTTP/1.1，keep alive 持久连接，pipeline，增加 host 和其他一些命令，
4. HTTP/2.0，所有数据以二进制传输，同一个 TCP 连接里面发送多个请求不再需要按照顺序来，头信息压缩以及推送等提高效率的功能。

## HTTP 客户端

1. 浏览器;
2. curl (windows 可以通过 git bash 客户端来访问), `curl -v www.baidu.com`;
3. 爬虫代码；

## 跨域

跨域只是浏览器的规则限制的，不是服务端的限制。浏览器允许 script，link 等标签的请求进行跨域访问。

JSONP 只允许 GET 请求访问。

cors 跨域预请求 preflight 默认允许的规则有：

1. method 支持的只有 GET、HEAD、POST；
2. Content-Type 支持的有 text/plain、multipart/form-data、application/x-www-form-urlencoded
3. 请求头的限制，只支持 Accept、Accept-Language、Content-Language、Content-Type，参考 <https://fetch.spec.whatwg.org/#cors-safelisted-request-header>

## 跨域的处理

1. Server 端设置 header

   ```js
   res.setHeader('Access-Control-Allow-Credentials', true); // 允许跨域使用凭证
   res.setHeader('Access-Control-Allow-Headers', 'Content-type'); // 允许跨域添加的额外header
   //   res.setHeader('Access-Control-Allow-Origin', '*'); // 允许跨域的 origin
   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8001'); // 允许指定的 origin 跨域
   res.setHeader(
     'Access-Control-Allow-Methods',
     'GET, POST, OPTIONS, PUT, PATCH, DELETE'
   ); // 设置允许跨域的方法
   res.setHeader('Access-Control-Max-Age', 1000); // 设置跨域允许的时间，在允许的时间内，请求不会再次发送preflight预检请求
   ```

2. express 使用 `cors` 库;
3. koa2 使用 `@koa/cors` 库。

## Cache-Control 浏览器缓存的控制

1. max-age 缓存生效的时间设置
2. no-cache 每次请求都需要经过服务器来判断是否使用缓存
3. no-store 直接忽略 max-age 其他设置，禁用缓存

## Last-Modified

上次修改时间，配合 If-Modified-Since 或者 If-Unmodified-Since 使用，对比上次修改时间以验证资源是否需要更新。

> If-Modified-Since 和 If-Unmodified-Since 是由浏览器接收到服务器的 Last-Modified 时候，后续的请求携带的。服务器收到客户端发送的验证头之后进行是否缓存的判断，Cache-Control 需开启 no-cache。

## Etag

通过数字签名验证，配合 If-Match 或者 If-None-Match 使用，比如对内容进行 hash 值的计算

> If-Match 和 If-None-Match 是由浏览器接收到服务器的 Etag 时候，后续的请求携带的。服务器收到客户端发送的验证头之后进行是否缓存的判断，Cache-Control 需开启 no-cache。
>
> Chrome 浏览器里 Network 下开启 disable cache 后，会导致后续的请求不会携带 If-Match 等验证 headers

## Cookie

在服务器端通过 `Set-Cookie` 去设置，客户端接收到后，在同域的请求中会携带。多个键值对的形式。

属性有：

1. max-age 和 expires 设置过期时间
2. Secure： 只在 https 的时候发送
3. httpOnly 设置之后浏览器无法通过 document.cookie 来获取
4. path： 生效的路径

## 客户端要求的数据格式的设置 Accept

1. Accept 要求服务端返回数据格式的设置，`text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9` 以逗号分割，q=代表权重
2. Accept-Encoding 要求服务端返回数据的压缩设置，gzip, deflate, br 等
3. Accept-Language 数据展示的语言，`en,zh-CN;q=0.9,zh;q=0.8` 以逗号分割，q=代表权重
4. User-Agent 浏览器的一些信息，

   ```js
   // 本地电脑不同浏览器的 User-Agent
   Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36  // Chrome
   Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36 Edg/109.0.1518.55  // Edge
   Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:100.0) Gecko/20100101 Firefox/100.0  // FireFox
   Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; LCTE; rv:11.0) like Gecko  // ie11
   ```

> User-Agent 信息中含义
>
> `Mozilla/5.0` 代表早期的网景浏览器，为了兼容而增加；
>
> `(Windows NT 10.0; Win64; x64)` Windows NT 10.0;表示系统是 windows 10 版本， Win64; x64 是指 64 位处理器
>
> `AppleWebKit/537.36` AppleWebKit 表示苹果开发的浏览器内核；
>
> `(KHTML, like Gecko)` KHTML 指浏览器的渲染引擎，Gecko 指火狐浏览器的引擎
>
> `Chrome/109.0.0.0` 谷歌浏览器版本（Safari 浏览器就不会出现这个）
>
> `Safari/537.36` Safari 浏览器版本，因为前面有 AppleWebKit，因此会出现这个 Safari 的版本信息

## 服务端返回的数据格式的设置 Content

1. Content-Type: 服务端对返回数据格式的声明
2. Content-Encoding: 对返回数据的压缩方式，与客户端的 Accept-Encoding 相对应
3. Content-Language: 返回数据的语言

## 常用的状态码

1. 200 成功
2. 204
3. 301 永久的重定向跳转，跳转的新 url 会缓存到客户端里了，除非客户手动清除浏览器缓存，否则重定向的 url 一直不会更新，慎用
4. 302 临时的重定向跳转，每次都会进行新旧路径的跳转
5. 304 使用缓存
6. 403 无权限禁止访问
7. 404 请求路径不存在
8. 500
