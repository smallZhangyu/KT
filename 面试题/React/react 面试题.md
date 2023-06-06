# React 面试题

## 组件之前如何通信？

1. 父子组件之前通过 props；
2. 自定义事件，利用第三方库 eventBus；
3. 状态管理库 Rudux 和 Context；

## vdom 和 diff

vdom - 用 JS 模拟 DOM 结构，计算出最小的变更，操作 DOM。JS 的计算速度比 DOM 渲染快。

通过 **snabbdom** 学习 vdom，Vue2 参考它是实现的 vdom 和 diff

### 用 JS 模拟 DOM 结构

```html
<!-- DOM 结构 -->
<div id="div1" class="container">
  <p>vdom</p>
  <ul style="font-size: 20px">
    <li>a</li>
  </ul>
</div>
```

JS 用 tag(标签)、props(属性)、children(子元素)来模拟 DOM 结构

```json
{
  "tag": "div",
  "props": {
    "id": "div1",
    "className": "container"
  },
  "children": [
    {
      "tag": "p",
      "children": "vdom"
    },
    {
      "tag": "ul",
      "props": {
        "style": "font-size: 20px"
      },
      "children": [
        {
          "tag": "li",
          "children": "a"
        }
      ]
    }
  ]
}
```

### diff

2 个 js 对象也可以做 diff，参考的库[jiff](https://github.com/cujojs/jiff)

树的 diff 算法，优化时间复杂度到 O(n)

1. 只比较同一层级，不跨级比较；
2. tag 不相同，则直接删掉重建，不再深度比较；
3. tag 和 key，二者都相同，则认为是相同节点，不再深度比较。

## JSX 本质是什么？

JSX 的本质是 React.createElement(tag, props, children...) 方法，执行返回 vnode，然后通过 patch(elem, vnode)/patch(vnode, newVnode) 去渲染。

## fiber 如何优化性能

1. 将 reconciliation 阶段进行任务拆分（commit 阶段处于 DOM 渲染无法拆分）；
2. DOM 需要渲染时暂停，空闲时恢复；
3. 什么时候空闲，通过 `window.requestIdleCallback` 判断

## Portals 的使用场景

组件默认会按照既定层次嵌套渲染，当需要让组件渲染到父组件以外时。主要是应对一些 CSS 兼容性/布局的问题。如下场景：

1. 父组件设置了 overflow：hidden，影响了子组件的展示；
2. 父组件 z-index 值太小；
3. fixed 的子元素需要放在 body 第一层级；

比如下边的例子需要将 modal 放到 body 下边时

```js
import ReactDom from 'react-dom';

function PortalsDemo(props) {
  return ReactDom.createPortal(
    <div className="modal">{this.props.children}</div>,
    document.body // 放置的DOM 节点
  );
}
```

## Context 是什么，如何应用？

父组件，向其下所有子孙组件传递信息。  
用于一些简单的状态，比如公共信息：主题色、语言等等，复杂的状态用 redux。

```js
const ThemeContext = React.createContext('light');

// 函数组件的使用方式
function ThemeBtn(props) {
  return (
    <ThemeContext.Consumer>
      {(value) => <p>buttion's theme is {value}</p>}
    </ThemeContext.Consumer>
  );
}

// 类组件的使用方式
class ThemeLink extends Component {
  constructor(props) {
    super(props);
  }
  // 方式一指定 context Type 读取当前的themeContext
  //   static contextType = themeContext;

  render() {
    const theme = this.context; // react 会往上找最近的theme设置

    return (
      <div>
        <p>Link's theme is {theme}</p>
      </div>
    );
  }
}
ThemeLink.contextType = ThemeContext; // 方式二指定contextType 读取位置

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: 'light',
    };
  }

  render() {
    return (
      <ThemeContext.Provider value={this.state.theme}>
        <ThemeBtn />
        <ThemeLink />
      </ThemeContext.Provider>
    );
  }
}
```

## redux 单项数据流

![redux 单项数据流](./img/redux%20单项数据流.png)

1. dispatch(action);
2. reducer 产生一个新的 state；
3. subscribe 触发通知，事务更新。

redux 里常用的方法：

1. `function todos(state, action){ switch(action.type)...}`, todos 就是一个 reducer，是一个纯函数;
2. `const reducer = combineReducers({todos, ...})`，合并多个子 reducers 到一个根 reducer；
3. `const store = createStore(reducer, applyMiddleware(thunk))`，创建一个 store 供 Provider 组件使用，applyMiddleware 用于整合多个中间件，如 redux-thunk, redux-saga, redux-promise, redux-logger 等;
4. `store.subscribe()`，订阅变化到视图;
5. `store.dispatch({type: 'ADD'})`;

react-redux 里常用的组件/方法：

1. `<Provider store={store}>...</Provider>`;
2. `const mapStateToProps = (state) => {...}`;
3. `const mapDispatchToProps = (dispatch) => {...}`;
4. `connect(mapStateToProps, mapDispatchToProps)(MyComponent)`;

## React 组件生命周期

![React 16.4 之后生命周期](./img/React%2016.4%20之后生命周期.png)

## Ajax 应该放在哪个生命周期里

1. componentDidMount；
2. componentDidUpdate；

## 什么是纯函数

纯函数的特点：返回一个新值，没有副作用(不会修改其他值)，输入值和返回值类型相同

## 渲染列表，为何使用 key

为了比较的时候更快视图更新。必须用 key，且不能是 index 和随机数。  
diff 算法中通过 tag 和 key 来判断，是否是相同的节点。  
减少渲染次数，提升渲染性能。

## 函数组件和 class 组件的区别

纯函数，输入 props，输出 JSX。
没有实例，没有生命周期，没有 state。  
不能扩展其他方法

## 什么是受控组件、非受控组件

受控组件的特点：  
表单的值是否受 state 控制，需要自行监听 onChange，更新 state。

非受控组件的特点：  
表单的值是通过 `defaultValue/defaultChecked` 来从 state 初始化，不需要 onChange 监听，也不会更新 state，视图不会更新，获取值需要通过 `ref.current` 来获取。

非受控组件的使用场景：

1. 必须手动操作 DOM 元素，setState 实现不了；
2. 文件上传 `<input type="file" />`;
3. 某些富文本编辑器，需要传入 DOM 元素。

> **React 中推荐优先使用受控组件**，必须操作 DOM 时，再使用非受控组件。

## setState 是异步还是同步？

React 18 版本之前：

1. setState 不可变值（针对数组/对象的操作不能改变原来的数组/对象，需要拷贝一份进行操作后通过 setState 赋值）;
2. 可能是异步更新，同步代码拿不到最新的值，可以通过 setState(param, fn)的第二个回调函数来拿到最新的值；注意：**在 setTimeout/自定义 DOM 事件中，setState 是同步的。**

   ```js
   // 获取最新值
   this.setState(
     {
       count: this.state.count,
     },
     () => {
       console.log('count by callback', this.state.count);
     }
   );
   ```

3. 可能会合并；setState 的第一个参数为对象的话，多次操作是会合并，如果第一个参数是回调函数的话，不会合并。**自定义 DOM 事件和 setTimeout 里也不合并 state。**

   ```js
   // setState 会合并
   this.setState({
     count: this.state.count + 1,
   });

   this.setState({
     count: this.state.count + 1,
   });

   this.setState({
     count: this.state.count + 1,
   });

   // setState 不会合并
   this.state((preState, props) => {
     count: preState.count + 1;
   });

   this.state((preState, props) => {
     count: preState.count + 1;
   });

   this.state((preState, props) => {
     count: preState.count + 1;
   });
   ```

React 18 版本之后：

1. React 组件事件：异步更新+合并 state；（同 v17 版本）
2. 自定义 DOM 事件，setTimeout：异步更新+合并 state；（不同于 v17 版本，二者和 React 组件事件行为一致了。原因是 18 版本后增加了 Automatic Batching 自动批处理功能）

## 何时使用异步组件？

1. 加载大组件
2. 路由懒加载

   `React.lazy(() => import('../componetName'))`和`React.Suspense`

## 多个组件有公共逻辑，如何抽离？

1. 高阶组件 HOC

   ```js
   // 高阶组件不是一种功能，而是一种模式 —— 工厂/装饰器模式。传入一个组件作为参数，然后返回一个新组件，公共逻辑在新组件里实现，将 props 透传给传入的组件
   const HOCFactory = (Component) => {
     class HOC extends React.Component {
       // 在此定义多个组件的公共逻辑
       render() {
         return <Component {...this.props} />; // 返回拼装的结果
       }
     }

     return HOC;
   };

   const EnhanceComponent1 = HOCFactory(Component1);
   const EnhanceComponent2 = HOCFactory(Component2);
   ```

2. Render Props

   ```js
   // 核心思想：通过一个函数将 class 组件的 state 作为 props 传递给纯函数组件
   class Factory extends React.Component {
    constructor(){
        super();
        this.state = {
            ... //多个组件的公共逻辑数据
        }
    }

    // 修改 state
    render(){
        return <div>{this.props.render(this.state)}</div>
    }
   }

   const App = () => {
      // 此处 render 是一个函数组件
      <Factory render={
        (props) => (<p>{props.a}...</p>)
      } />
   }
   ```

3. mixin 已被 React 废弃

## redux 如何进行异步请求

使用异步 action，如 redux-thunk、 redux-saga

> 同步 action 的返回值是一个 action 对象，异步 action 的返回是一个 dispatch(action)

```js
// 同步 action
export const addTodo = (text) => {
  // 返回 action 对象
  return {
    type: 'ADD_TODO',
    id: nextTodoId++,
    text,
  };
};
// 异步 action
export const addTodoAsync = () => {
  // 返回函数，其中有 dispath 参数
  return (dispatch) => {
    // ajax 获取数据
    fetch(url).then((res) => {
      // 执行同步 action
      dispatch(addTodo(res.text));
    });
  };
};
```

## react-router 如何配置懒加载

```js
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import React, { Suspense, lazy } from 'react';

const Home = lazy(() => import('./routes/Home'));
const About = lazy(() => import('./routes/About'));

const App = () => (
  <Router>
    <Suspense fallback={<div>loading... </div>}>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/about" component={About} />
      </Switch>
    </Suspense>
  </Router>
);
```

react-router 路由模式  
hash 模式（默认），如`http://abc.com/#/user/10`  
H5 history 模式，如`http://abc.com/user/10`  
后者需要 server 端支持，因此无特殊需求可选择前者。

```js
import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom'; // hash 模式
// import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'; // history 模式

function RouterComponent() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        {/* 动态路由 */}
        <Route path="/project/:id">
          <Project />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
}

import { Link, useParams } from 'react-router-dom';

function Project() {
  // 获取url参数，如'/project/100'
  const { id } = useParams();
  console.log('url param id', id);

  return (
    <div>
      <Link to="/">首页</Link>
    </div>
  );
}

import { useHistory } from 'react-router-dom';

function Trash() {
  let history = useHistory();
  function handleClick() {
    history.push('/');
  }

  return (
    <div>
      <button type="primary" onClick={handleClick}>
        回到首页
      </button>
    </div>
  );
}
```

## React 事件和 DOM 事件的区别

1. 所有事件都挂载到 document 上；（**React 17 版本后就不再绑定到 document 上了，而是绑定到 root 组件上了**，这样有利于多个 React 版本并存，例如微前端）
2. React event 不是原生的，是 SyntheticEvent 合成事件对象，模拟出来 DOM 事件的所有能力； 原生的 event 是 MouseEvent，React event 通过`event.nativeEvent`可以获取到原生 event
3. dispatchEvent 机制

使用合成事件机制的原因：

1. 更好的兼容性和跨平台；
2. 挂载到 document/rootComponent，减少内存消耗，避免频繁解绑；
3. 方便事件的统一管理（如事务机制）；

由于虚拟 DOM 的存在，在 React 中即使绑定一个事件到原生的 DOM 节点，事件也并不是绑定在对应的节点上，而是 **所有的事件都是绑定在根节点上**。然后由 React 统一监听和管理，获取事件后再分发到具体的虚拟 DOM 节点上。

## React 性能优化

1. 修改 CSS 模拟 v-show；
2. 渲染列表时加 key；
3. 使用 Fragment 减少层级；
4. JSX 中不要定义函数，因为每次 JSX 刷新都要重新创建函数；
5. 自定义事件、DOM 事件要及时销毁；
6. 合理使用异步组件；
7. 减少函数 bind this 的次数，在构造函数中使用 bind，在类组件中使用箭头函数，也可以省略 bind；
8. 合理使用 SCU、PureComponent 和 函数组件使用 memo(结合 useMemo 和 useCallback)；
9. 合理使用 Immutable.js、Immer 库；
10. Hooks (useMemo 和 useCallback)缓存数据；
11. webpack 层面的优化；
12. 前端通用的性能优化，如图片懒加载；
13. 使用 SSR；

## ShouldComponentUpdate 介绍

React 默认更新规则是：父组件有更新，子组件则无条件也更新。

SCU 默认返回 true，即更新。必须配合“不可变值”一起使用。不一定要一上来就使用，有性能不好时再考虑使用。

```js
shouldComponentUpdate(nextProps, nextState) {
    if(nextProps.text !== this.props.text){
        return true; // 渲染
    }

    return false; // 不渲染
}
```

SCU 中不建议使用深比较，因为深比较耗费时长，所以在设计 state 的时候不要设计的嵌套太深。

## PureComponent 有何区别

1. 实现了**浅比较**的 shouldComponentUpdate，只读 state 的第一层结构进行比较；
2. 优化性能；
3. 但要结合不可变值使用。

> PureComponent 是类组件的写法，对应的在函数组件中的写法是 memo。

```js
// class 写法
class Btn extends React.PureComponent {
    ...
}
// 函数写法
function MyComponent(props){
    // 使用props渲染
    ...
}
function isEqual(prevProps, nextProps) {
  // 如果把nextProps传入render方法的返回结果和prevProps传入render方法的返回结果比较，一致返回true，否则返回false
  ...
}

export default React.memo(MyComponent, isEqual);
```

## Immutable.js

彻底拥抱不可变值，基于共享数据（不是深拷贝），速度好，有一定学习和迁移成本，按需使用。

## React 和 Vue 的区别

相同点：

1. 都支持组件化；
2. 都是数据驱动视图；
3. 都使用 vdom 操作 DOM；

区别：

1. React 使用 JSX 拥抱 JS，Vue 使用模板拥抱 html；
2. React 函数式编程，Vue 声明式编程；
3. React 更多需要自力更生，Vue 把想要的都给你；

## 在使用 React 过程中遇到过哪些坑？

1. 自定义组件的名称首字母要大写；
2. JS 关键字的冲突，for -> htmlFor, class -> className;
3. JSX 中的数据类型，""表示字符串，{}表示变量；

   ```js
   <Demo position={1} flag={true} />
   <Demo position="1" flag="true" />
   ```

4. setState 是异步、合并更新的

## 如何统一监听 React 组件报错？

React 16 版本之后，增加一个 ErrorBoundary 的机制去监听所有**下级**组件报错，可降级展示 UI。  
production 环境生效，dev 会直接抛出错误。  
只监听组件渲染时报错，不监听 DOM 事件、异步错误。  
DOM 事件的报错，用 try-catch 或者 window.onerror 捕获。  
异步的报错用 window.onerror 捕获。

```js
import { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null, // 存储当前的报错信息
    };
  }

  static getDerivedStateFromError(error) {
    // 更新 state 使下一次渲染能够 显示降级后的UI
    console.log('getDerivedStateFromError: ', error);

    return { error };
  }

  componentDidCatch(error, errorInfo) {
    // 统计上报错误信息等的操作
    console.log('componentDidCatch: ', error, errorInfo);
  }

  render() {
    if (this.state.error) {
      // 报错后的替换组件
      return <h1>trigger error</h1>;
    }

    return <>{this.props.children}</>;
  }
}

export default ErrorBoundary;
```
