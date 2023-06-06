# react-hooks 面试题

## 为什么会有 React Hooks，它解决了哪些问题？

完善函数组件的能力，函数更适合 React 组件。  
组件逻辑复用，Hooks 表现更好。

解决 class 组件的问题：

1. 大型组件很难拆分和重构，很难测试；
2. 相同业务逻辑，分散到各个方法中，逻辑混乱；比如如果需要在组件挂载后和更新后都发送 Ajax 请求，需要在这 2 个生命周期里都些同样的代码。
3. 复用逻辑变得复杂，如 Mixins(已废弃)、HOC、Render Prop

## React Hooks 如何模拟组件生命周期？

```js
import {useEffect} from 'react';
// 模拟组件挂载后 DidMount
useEffect(()=>{...}, []); //第二个参数传空数组[]

// 模拟组件更新后 DidUpdate
useEffect(() => {
  ...
}, [dependsParams]);  // 第二个参数传入依赖的变量，当依赖值变化时执行

// 第二个参数不传时，同时模拟 DidMound 和 DidUpdate
useEffect(() => {
  ...
});

// 模拟组件卸载 WillUnmount，但不完全相等，
// 当依赖为[]时，等于 willUnmount，
// 当依赖不传，或者依赖[a, ...] 时，二者就不完全相等，因为更新、卸载都会执行
// 准确的说：返回的函数，会再下一次 effect 执行之前，被执行。
useEffect(() => {
  return () => {  // return 一个函数，里边是卸载的逻辑
    ...
  }
}, []);
```

## useReducer 和 redux 的区别

useReducer 是 useState 的替代方案，用于 state 复杂变化的情况。  
useReducer 是单个组件的状态管理，组件通讯还需要 props。  
redux 是全局的状态管理，多组件共享数据。

## 如何自定义 Hooks？

### 使用自定义 Hooks 的场景

1. 封装通用的功能；
2. 开发和使用第三方 Hooks；
3. 自定义 Hook 带来了无限的扩展性，解耦代码。

### 写法及注意事项

1. 本质是一个函数，命名以 use 开头；
2. 内部正常使用 useState、useEffect 或者其他自定义的 hooks；
3. 自定义返回结果，格式不限；

### Hooks 使用规范

1. 只能用于 React 函数组件和自定义 Hook 中，其他地方不可以使用；
2. 只能用于顶层代码，不能在循环、判断中使用 hooks，因为 hooks 的执行依赖代码的顺序

> eslint 插件 eslint-plugin-react-hooks 可以做检测，CRA 脚手架已集成

### 第三方的一些 hooks 封装库

[react-hooks](https://nikgraf.github.io/react-hooks)  
[umijs/hooks](https://github.com/umijs/hooks)

## React Hooks 性能优化

1. useMemo 优化数据；
2. useCallback 优化函数；

## 使用 React Hooks 遇到哪些坑？

1. useEffect 里的返回函数执行不完全等同于组件卸载；
2. 使用 useMemo 优化的子组件 state，需要用 memo 去包裹子组件才能生效；
3. useState 初始化值，只有第一次有效；因为 re-render 时，useState 只恢复初始化的 state 值，不会再重新设置新的值，修改值只能用 `setXXX()` 去修改。
4. useEffect 当依赖为[]时，内部不能修改 state；当依赖为[]时，re-render 不会重新执行 effect 函数。当没有依赖时，re-render 才会重新执行 effect 函数。解决方案，使用 useRef(0)去定义一些变量。
5. useEffect 当依赖里有{}、[]引用类型时，会出现死循环；

## Hooks 相比 HOC 和 Render Prop 有哪些优点？

### Mixins(已废弃)的问题

1. 变量作用域来源不清；
2. 属性重名；
3. Mixins 引入过多会导致顺序冲突；

### HOC 的问题

1. 组件层级嵌套过多，不易渲染、调试；
2. HOC 父组件会劫持 props，必须严格规范，容易出现疏漏。

### Render Prop 的问题

1. 学习成本高，不易理解；
2. render 只能传递纯函数，而默认情况下纯函数功能有限。

```js
class Mouse extends React.Component {
  constructor(props) {
    super(props);
    // 公共的state
    this.state = {
      x: 0,
      y: 0,
    };
  }

  render() {
    return <div>{this.props.render(this.state)}</div>;
  }
}

<Mouse
  render={(x, y) => (
    <div>
      纯函数 {x},{y}
    </div>
  )}
/>;
```

### Hooks 的好处

1. 完全符合 Hooks 原有规则，没有其他要求，易理解记忆；
2. 变量作用域很明确；
3. 不会产生组件嵌套
