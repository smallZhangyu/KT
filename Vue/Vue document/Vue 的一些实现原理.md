# Vue 底层的一些实现原理

## Vue 里的响应式数据的原理

{{message}} 只要 data.message 一修改，页面的值立马更新，底层的原理是 proxy 实现数据的监控。

```js
let data = {
  message: 'Hello',
};

data = new Proxy(data, {
  set(target, key, newValue) {
    console.log('set data');
    app.innerHtml = newValue;
  },
  get(target) {
    console.log('get data');
    return target.message;
  },
});

app.innerHTML = data.message;

setTimeout(() => {
  data.message = 'Vue';
}, 2000);
```

## 计算属性是只读的，并且定义时是函数，使用是却直接写一个变量，底层的实现方式

```js
let computed = {
  num() {
    return 123;
  },
};
let vm = {};
for (let attr in computed) {
  Object.defineProperty(vm, attr, {
    value: computed[attr](),
  });
}
```
