# React 中的一些 ts 类型

## React 相关的 ts 类型限定

1. 函数组件的类型限定：`const xxx: FC<T> = () => {}`；
2. 类组件的类型限定：`class Student extends React.Component<StudentProps, StudentState>{}`；
3. props 为组件的类型限定：`React.ComponentType<T>`;
4. children：`React.ReactNode`；
5. 点击事件 event：`React.MouseEvent<HTMLButtonElement>`，事件只加给 button 标签；
6. change 事件：`React.ChangeEvent<HTMLInputElement>`，事件加给 input 标签。
7. style 类型限定：`React.CSSProperties`

## React-router 相关的 ts 类型限定

```ts
import type { RouteObject } from 'react-router-dom';

// 扩展 meta 类型
declare module 'react-router' {
  interface IndexRouteObject {
    meta?: {
      title: string;
    };
  }
  interface NonIndexRouteObject {
    meta?: {
      title: string;
    };
  }
}

const routes: RouteObject[] = [
  {
    path: '/',
    element: React.createElementComponent('App'),
    children: [],
  },
];
```

## Redux Toolkit 相关的 ts 类型限定

```ts
import { useDispatch } from 'react-redux';
export type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
```
