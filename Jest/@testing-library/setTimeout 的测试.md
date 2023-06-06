# setTimeout 的测试

Jest 的默认的超时时间是 5s，如果一个定时器设置时间超过 5s，就会报错。  
可以使用 jest 提供的`jest.useFakeTimers()`结合`jest.runAllTimes()`、`jest.advanceTimersByTime(time)`进行快进。

```js
describe('examples for fakeTimers', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  test('a test for a simple setTimeout', async () => {
    const res = sleep(6000, 'this is a simple setTimeout test');
    jest.runAllTimers();
    await expect(res).resolves.toBe('this is a simple setTimeout test');
  });
});
```

使用 `jest.advanceTimersByTime(time)` 就可以将所有的定时器提前指定时间。

`jest.runAllTimers()`会运行所有的定时器，不论这个定时器是否在等待中，而因为递归的关系，我们的定时完成后，始终会有一次新的定时，所以会导致我们栈溢出，针对这种场景我们可以使用`jest.runOnlyPendingTimers()`，它只会运行目前挂起的定时器，
