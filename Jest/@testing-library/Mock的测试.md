# Mock 的测试

## 全局 mock 的 API

`jest.mock(path, moduleFactory)`, 接受两个参数，path 和 moduleFactory，其中 path 是需要 mock 的文件路径，moduleFactory 是这个模块的工厂函数，类型与模块保持一致就行，可以进行更自定义的 mock。

这个 mock 的执行会被提升到 import 之前，也就是对于这个文件而言，mock 的内容会替代原有的模块。

jest 的 mockFn 会提供一些 api

1. `mockFn.mockReturnValue(value)`, Mock 返回值，同步；
2. `mockFn.mockReturnValueOnce(value)`, Mock 返回值，同步，只生效一次；
3. `mockFn.mockResolvedValue(value)`, Mock resolve 返回值，异步
4. `mockFn.mockResolvedValueOnce(value)`, Mock resolve 返回值，异步，只生效一次
5. `mockFn.mockRejectedValue(value)`, Mock reject 返回值，异步
6. `mockFn.mockRejectedValueOnce(value)`, Mock reject 返回值，异步, 只生效一次

## 第三方库 jest-mock

jest-mock，会补充全局 mock 对应的 mockFn 类型。

```js
import axios from 'axios';
import { mocked } from 'jest-mock';

jest.mock('axios');

describe('examples for mock', () => {
  test('a test for global mock', async () => {
    const res = 'this is a test for global mock';
    // axios.get.mockResolvedValue(res);
    mocked(axios.get).mockResolvedValue(res);
    const data = await axios.get('/');
    expect(data).toBe('this is a test for global mock');
  });
});
```

## 单次 mock

`jest.doMock(moduleName, factory, options)`

```js
import React from 'react';
import axios from 'axios';
import mock from '../components/Mock';

jest.mock('axios');

describe('examples for mock', () => {
  // ...other

  test('a test for single mock', () => {
    jest.doMock('../components/Mock', () => ({
      __esModule: true,
      getMockData: () => {
        return 'newMockData';
      },
    }));
    // expect(mock.getMockData()).toBe("newMockData");
    const mock = require('../components/Mock');
    expect(mock.getMockData()).toBe('newMockData');
  });
});
```

## mock 函数

常用的 mock 函数

1. `jest.fn(implementation?)`, 用于 mock 一个空函数，它会默认返回 undefined. `jest.fn()` 需要自己定义入参和回参的类型，我们通常用它来定义一些简单、好定义类型的函数.
2. `jest.spyOn(object, methodName)`, 也可以创建一个和 jest.fn 类似的 mock 函数，不同的是它可以追踪目标函数的调用，使得它的入参和回参与需要 mock 的函数是自动匹配的.

   ```js
   import axios from 'axios';
   import mock from '../components/Mock';

   jest.mock('axios');

   describe('examples for mock', () => {
     // ...other

     test('other ways for single mock', () => {
       jest.spyOn(mock, 'getMockData').mockReturnValue('newMockData');
       expect(mock.getMockData()).toBe('newMockData');
     });
   });
   ```

> 其实，通过 `jest.spyOn` 足够覆盖我们需要的大部分场景，不过它一次只能 mock 一个对应的函数，如果需要对整体模块覆写，那我们还是需要 `jest.mock()` 和 `jest.doMock()` 来协助实现的。
