# Vue 的生命周期

## 生命周期钩子有

1. beforeCreate：在组件实例被创建之前调用。
   创建一个空白的 Vue 实例，数据 data 和方法 methods 还未被初始化，所以无法访问 data 和 methods。

2. created：在组件实例被创建后调用。
   此时 Vue 实例已经创建，可以访问到组件实例的数据和方法。
   在这个阶段，Vue 会初始化组件的响应式数据，进行依赖注入和事件初始化等操作。
   Vue 实例初始化完成，完成了响应式绑定，还没有开始渲染模板，可以完成一些和 dom 无关的操作。

3. beforeMount：在组件挂载之前调用。
   此时 Vue 实例已经完成了数据的初始化，进行编译模板，调用 render 生成虚拟 Dom，但尚未将组件模板渲染成真实的 DOM。

4. mounted：在组件挂载到 DOM 后调用。
   此时 Vue 实例已经将组件模板渲染成真实的 DOM，并挂载到页面上。
   在这个阶段，可以进行 DOM 操作、访问 DOM 元素、与第三方库进行集成等操作。

5. beforeUpdate：在组件更新之前调用。当组件的响应式数据发生改变时，会触发重新渲染的过程，在重新渲染之前会调用该钩子函数

6. updated：在组件更新完成后调用。
   在这个阶段，Vue 实例已经完成了重新渲染，并且更新了组件的 DOM。

7. beforeUnmount（Vue2 中叫 beforeDestroy）：在组件卸载之前调用。
   当组件从 DOM 中移除之前，会调用该钩子函数。
   可以在这个阶段进行一些清理工作，比如清除定时器、取消订阅、自定义事件的解绑等。

8. mounted（Vue2 中叫 destroyed）：在组件卸载之后调用。
   此时组件已经从 DOM 中移除，并且 Vue 实例也被销毁。
   在这个阶段，可以进行一些最终的清理工作。

除了上述生命周期钩子函数，还有一些其他的钩子函数，如 activated、deactivated、errorCaptured 等，用于处理组件的激活和失活、错误捕获等特定场景的操作。

## Vue2 的生命周期图示

![Vue2 的生命周期图示](../assets/Vue2%20生命周期钩子.png)

## Vue3 的生命周期图示

![Vue3 的生命周期图示](../assets/Vue3%20生命周期钩子.png)

## 父子组件生命周期钩子执行的顺序

Parent beforeCreate
Parent created
Parent beforeMount
Child beforeCreate
Child created
Child beforeMount
Child mounted
Parent mounted
Parent beforeUnmount
Child beforeUnmount
Child unmounted
Parent unmounted

触发更新的顺序：
Parent beforeUpdate
Child beforeUpdate
Child updated
Parent updated

## keep-alive 组件和子组件生命周期钩子函数执行的顺序

子组件的 created、mounted、activated、deactivated 钩子函数先执行，  
然后是 keep-alive 组件的 created、mounted、activated、deactivated 钩子函数。  
其他生命周期钩子函数如 beforeCreate、beforeMount、beforeUpdate、updated、beforeUnmount 和 unmounted 只会在包裹的子组件中触发，而不会在 keep-alive 组件中触发。
