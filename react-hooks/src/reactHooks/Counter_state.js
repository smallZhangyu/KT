/*eslint no-unused-vars: "off"*/
import React, { useEffect, useReducer, useState } from 'react';

function countReducer(state, action) {
  switch (action.type) {
    case 'add':
      return state + 1;
    case 'minus':
      return state - 1;
    default:
      return state;
  }
}
/**
 * useReducer 是最基础的state-hooks，useState是useReducer的基础上封装的简化版
 * useReducer() 适用于state是object的用法
 * useState() 适用于state是普通类型的场景，它是比较是浅比较，对于Object的类型，改变他的属性值，引用地址没变，
 * 不会引起组件的渲染
 * @returns
 */
const Counter = () => {
  //   const [count, setCount] = useState(0);
  const [count, dispatchCount] = useReducer(countReducer, 0);
  useEffect(() => {
    const interval = setInterval(() => {
      // 此处存在闭包，setCount使用传入回调函数这种写法是为了保证每次拿到的count是最新的
      //setCount((c) => c + 1);
      console.warn('4. CounterState setInterval');
      dispatchCount({ type: 'minus' });
    }, 1000);
    console.warn('2. CounterState effect invoke');

    return () => {
      console.warn('3. CounterState effect unmount');
      clearInterval(interval);
    };
  }, []);

  console.log('1. CounterState Component render');

  return <div>{count}</div>;
};

export default Counter;
