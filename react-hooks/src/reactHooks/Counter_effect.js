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
    console.log('3. effect invoke');

    return () => {
      console.log('5. effect unmount');
    };
  }, [count]);

  useLayoutEffect(() => {
    console.log('2. useLayoutEffect invoke');

    return () => {
      console.log('4. useLayoutEffect unmount');
    };
  }, [count]);

  console.log('1. CounterEffect Component render');

  return (
    <div>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <button onClick={() => setCount(count + 1)}>{count}</button>
    </div>
  );
};

export default Counter;
