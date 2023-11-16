# typescript 实战

[TOC]

## 使用泛型约束后端接口类型

```ts
interface API {
  '/book/details': {
    id: number;
  };
  '/book/comment': {
    id: number;
    comment: string;
  };
}

function request<T extends keyof API>(url: T, obj: API[T]) {
  return axios.post(url, obj);
}

// 正确的访问
request('/book/comment', {
  id: 1,
  comment: 'good',
});

// 报错：url类型错误
request('/book/test', {
  id: 1,
  comment: 'good',
});
// 报错：参数类型错误
request('/book/details', {
  id: 1,
  comment: 'good',
});
```

## 构造函数的类型如何定义

```ts
interface ClassWithConstructor {
  new (str: string): void;
}
```

## 带属性的函数的类型如何定义

```ts
interface FunctionWithAttr{
  attr: string;
  (str: string): void
}

function foo:FunctionWithAttr(){}
foo.attr = '23';
```
