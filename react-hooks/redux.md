# Redux

## Redux store 的特点

1. Redux Store 是全局唯一的，整个应用程序一般只有一个 store；
2. Redux Store 是树形结构。

## Redux 的三个基本概念

1. State，即 Store，一个纯 JavaScript Object；
2. Action，也是一个 Object，用于描述发生的动作；
3. Reducer，一个纯函数，接收 State，Action 作为参数，通过计算返回新的 Store；

## Redux 基本使用示例

Redux 可以单独作为一个状态管理库使用。

```js
import { legacy_createStore as createStore } from 'redux';
// const createStore = require('redux').legacy_createStore;

const initState = {
  value: 0,
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case 'counter/incremented':
      return { ...state, value: state.value + 1 };
    case 'counter/decremented':
      return { ...state, value: state.value - 1 };
    default:
      return { ...state };
  }
};

// 创建store
const store = createStore(reducer);

// 使用subscribe监听Store的变化
store.subscribe(() => console.log(store.getState()));

// Action
const addAction = { type: 'counter/incremented' };
// 使用dispatch 触发Action，执行对应的Reducer修改state
store.dispatch(addAction);

const subAction = { type: 'counter/decremented' };
store.dispatch(subAction);

export default store;
```

如果在 React 中使用，使用 react-redux 库连接

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';

import App from './App';

ReactDOM.render(
  <Provider store={store}>
    <APP />
  </Provider>,
  document.getElementById('root')
);

// React v18 之后的示例
import ReactDOM from 'react-dom/client';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// 具体的组件内部如果使用redux store -- useSelector, useDispatch
import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

export function App() {
  const count = useSelector((state) => state.value);
  const dispatch = useDispatch();

  const handleClick = useCallback(() => {
    const addAction = { type: 'counter/incremented' };
    dispatch(addAction);
  }, []);

  return (
    <div>
      <p>{count}</p>
      <button onClick={handleClick}>Add</button>
    </div>
  );
}
```

## Redux 中的中间件 middleware

middleware 提供了一个拦截器在 reducer 处理 action 之前被调用。  
在这个拦截器中，可以自由的处理获得的 action。无论是把这个 action 直接传递到 reducer，还是构建新的 action 后发送到 reducer。

**redux-thunk 的原理**  
Redux 中的 Action 不仅可以是一个 Object，也可以是一个函数。利用这个机制，redux-thunk 这个中间件，它如果发现 Action 是一个函数，就不会直接传递给 Reducer，而是把 dispatch 作为参数传递给这个函数，然后执行这个函数，在这个函数中我们可以决定什么时候，如何发送 Action。

```js
// redux-thunk 的使用
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducer';

const composedEnhancer = applyMiddleware(thunkMiddleware);
const store = createStore(rootReducer, composedEnhancer);

// 函数类型的Action，里边包含多个Action
function fetchData() {
  return (dispatch) => {
    dispatch({ type: 'FETCH_DATA_BEGIN' });
    fetch('/some-url')
      .then((res) => {
        dispatch({ type: 'FETCH_DATA_SUCCESS', data: res });
      })
      .catch((err) => {
        dispatch({ type: 'FETCH_DATA_FAILURE', error: res });
      });
  };
}

function DataList() {
  const dispatch = useDispatch();
  dispatch(fetchData());
}
```

> 异步 Action 并不是一个具体的概念，而可以把它看作是 Redux 的一个使用模式。它通过组合使用同步 Action，在没有引入新概念的同时，用一致的方式提供了处理异步逻辑的方案。
