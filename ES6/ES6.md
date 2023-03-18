# ES6

## async/await 的要点

1. await 返回的也是一个 promise 对象（resolve 的结果）；
2. await 必须在 async 函数里使用，不能单独使用；
3. await 后面可以继续使用 promise 语；
4. 可以使用 try/catch 来捕获 await 里遇到的 reject 错误。
