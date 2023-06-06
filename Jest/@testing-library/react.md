# @testing-library/react 方法

## render(Component) 方法，渲染一个组件

## screen 对象，render 组件之后返回的一个全局对象

## waitFor 测试异步方法

测试异步的方法，接收两个参数，第一个是需要重复执行的回调函数，我们可以在其中查询元素并且断言，waitFor 会根据设定（或者默认）的超时时间和执行间隔来重复执行回调。第二个参数是可以配置的数据，比如说超时时间（timeout)、执行间隔（interval），通过这个参数我们就可以自定义我们需要的超时场景。

> 建议在 waitFor 中只加入一个断言，也就是只有一个 expect，这样是为了如果 waitFor 失败，可以更快获得某个断言的报错信息，而不用等待超时结束才看到所有的断言报错。

## waitForElementToBeRemoved，组件移除的测试

对于 `waitForElementToBeRemoved` 需要判断的 DOM 元素，也就是第一个入参 callback，我们应该使用 queryBy 来查询，而不是 getBy，queryBy 和 getBy 的区别在于 getBy 在未查询到指定元素时，会抛出错误。
