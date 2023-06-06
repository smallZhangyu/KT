/*eslint no-unused-vars: "off"*/
import React, { useEffect, useLayoutEffect, useState } from 'react';

/**
 * useEffect 总是在组件render 完成之后才执行，如有多个，按顺序执行。
 * useLayoutEffect 比useEffect 先执行，因为useLayoutEffect是在挂在到DOM之前执行的，
 * useEffect 是DOM 完成之后执行的
 * @returns
 */
const Counter = () => {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('tom');

  useEffect(() => {
    console.log(
      'Effect --->  useEffect no dependencies after render callback every time.'
    );
  }); // 每次render 之后都执行

  useEffect(() => {
    console.log(
      'Effect --->  useEffect has empty dependency, only first render after callback.'
    );
  }, []);

  useEffect(() => {
    console.log('Effect --->  3. useEffect invoke');

    return () => {
      console.log('Effect --->  5. useEffect unmount');
    };
  }, [count]); // count 变化后执行

  useLayoutEffect(() => {
    console.log('Effect --->  2. useLayoutEffect invoke');

    return () => {
      console.log('Effect --->  4. useLayoutEffect unmount');
    };
  }, [count]);

  console.log('Effect --->  1. CounterEffect Component render');

  return (
    <div>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <button onClick={() => setCount(count + 1)}>{count}</button>
    </div>
  );
};

export default Counter;
