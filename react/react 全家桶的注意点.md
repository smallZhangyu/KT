# react 全家桶的注意点

## react 的注意点

1. ReactDOM.unmountComponentAtNode，从 DOM 中卸载组件，会将其事件处理器（event handlers）和 state 一并清除。如果指定容器上没有对应已挂载的组件，这个函数什么也不会做。如果组件被移除将会返回 true，如果没有组件可被移除将会返回 false。
2. 在 React 18 之前也有批处理，但是在 Promise、setTimeout、原生事件中不起作用；`ReactDom.flushSync(() => {this.setState({msg: 'hi'})})`可以取消批处理能力。
3. Hook 中的 useDebugValue 的作用是用于在 React 开发者工具中显示自定义 Hook 的标签。
4. 避免使用 refs 来做任何可以通过声明式实现来完成的事情，下面是几个适合使用 refs 的情况：1.管理焦点，文本选择或媒体播放。2.触发强制动画。3.集成第三方 DOM 库
5. ReactDOM.createPortal(child, container)函数。尽管 portal 可以被放置在 DOM 树中的任何地方，但在任何其他方面，其行为和普通的 React 子节点行为一致。由于 portal 仍存在于 React 树， 且与 DOM 树 中的位置无关，那么无论其子节点是否是 portal，像 context 这样的功能特性都是不变的，包含事件冒泡。
6. Hook 设定的目标是尽早覆盖 class 的所有使用场景。目前暂时还没有对应不常用的 getSnapshotBeforeUpdate，getDerivedStateFromError 和 componentDidCatch 生命周期的 Hook 等价写法
7. 默认情况下不能在函数组件上使用 ref 属性，因为函数组件没有实例。如果要在函数组件中使用 ref，可以使用 forwardRef，或者可以将该组件转化为 class 组件。不管怎样，可以在函数组件内部使用 ref 属性，只要它指向一个 DOM 元素或 class 组件
8. React 支持的触摸事件有 onTouchCancel，onTouchEnd，onTouchMove，onTouchStart
9. react 支持的剪贴板事件有 onCopy，onCut，onPaste
10. React 支持的鼠标事件有 onClick，onContextMenu，onDoubleClick，onDrag，onDragEnd，onDragEnter，onDragExit，onDragLeave，onDragOver，onDragStart，onDrop，onMouseDown onMouseEnter，onMouseLeave，onMouseMove，onMouseOut，onMouseOver，onMouseUp，双击事件是 onDoubleClick 而非 onDblclick

## redux 的注意点

1. 在 Redux 中，action 是一个用于描述**已发生事件**的普通对象。

## react-router 的注意点

1. Router： react-router 的重要组件，它能保持 UI 和 URL 的同步。
2. RoutingContext：在 context 中给定路由的 state、设置 history 对象和当前的 location，`<RoutingContext>` 就会去渲染组件树。
3. Link：允许用户浏览应用的主要方式，`<Link>` 以适当的 href 去渲染一个可访问的锚标签。
4. 没有内置组件 DefaultLink
5. browserHistory，背后调用的是浏览器的 History API。
6. hashHistory，路由将通过 URL 的 hash 部分（#）切换
7. createMemoryHistory 主要用于服务器渲染，它创建一个内存中的 history 对象，不与浏览器 URL 互动
