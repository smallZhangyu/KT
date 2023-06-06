/*eslint no-unused-vars: "off"*/
import React, { useCallback, useState, memo, useMemo } from 'react';

const AddCountBtn = memo(({ btnLabel, clickHandle = () => {} }) => {
  console.log('3. Child Component: Add count btn render');

  return <button onClick={clickHandle}>{btnLabel}</button>;
});

const InputBox = memo(({ value, changeHandle }) => {
  console.log('2. Child Comp: input box render');

  return <input value={value} onChange={changeHandle} />;
});

/**
 * useCallback 和 useMemo 通常用于性能优化，
 * useCallback 与 useMemo 要想达到减少渲染的效果，子组件必须使用 memo() 这个高阶组件包裹，
 *
 * useCallback: 用于缓存回调函数，是useMemo 对函数缓存的封装版，使用useMemo 也可以实现 useCallback 的效果，
 * useMemo(() => (callbackFn), [dependencies])  fn函数返回一个函数作为缓存结果
 *
 * useMemo: 缓存计算的结果， useMemo(fn, deps)
 * @returns
 */
const Counter = () => {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('tom');

  // const btnClickHandle = () => setCount(count + 1);
  const btnClickHandle = useCallback(() => setCount(count + 1), [count]);

  // const inputChangeHandle = (e) => setName(e.target.value);
  const inputChangeHandle = useMemo(() => (e) => setName(e.target.value), []);

  console.log('1. CounterMemo Component render');

  return (
    <div>
      <InputBox value={name} changeHandle={inputChangeHandle} />
      <AddCountBtn clickHandle={btnClickHandle} btnLabel={count} />
      <button onClick={btnClickHandle}>add {count}</button>
    </div>
  );
};

export default Counter;
