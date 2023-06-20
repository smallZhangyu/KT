# React-router 6.4

## react-router 的安装

```bash
npm i react-router-dom
```

## react-router 的基础配置使用

```js
// router/index.js 6.4版本的配置
import {
  createBrowserRouter,
  createHashRouter,
  Route,
  createRoutesFromElements,
  Navigate,
} from 'react-router-dom';
import App from '../routerDemo/App';
import Home from '../routerDemo/Home';
import About from '../routerDemo/About';
import Foo from '../routerDemo/Foo';
import Bar from '../routerDemo/Bar';

// v6.4 路由表的配置方式，推荐
const routes = [
  {
    path: '/',
    element: <App />,
    // errorElement 为全局路由不匹配时的处理
    errorElement: <>404</>,
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: 'about',
        element: <About />,
        children: [
          {
            index: true,
            // element: <div>默认的内容</div>,
            element: <Navigate to="foo/123" />, // Navigate 为重定向组件
          },
          {
            path: 'foo/:id',
            element: <Foo />,
          },
          {
            path: 'bar',
            element: <Bar />,
            loader: () => {
              //loader 中重定向需要使用 redirection
            },
          },
          {
            // 局部路由不匹配时的处理
            path: '*',
            element: <div>404</div>,
          },
        ],
      },
    ],
  },
];

// 组件式的配置方式，老式写法
const routes2 = createRoutesFromElements(
  <Route element={<App />}>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />}>
      <Route path="foo/:id" element={<Foo />} />
      <Route path="bar" element={<Bar />} />
    </Route>
  </Route>
);

const router = createBrowserRouter(routes2);

export default router;
```

```jsx
// root 组件的路由挂载
import { ReactDOM } from 'react-dom';
import { RouterProvider } from 'react-router-dom';
import router from './router';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>
);
```

```jsx
// About.jsx 组件，三种跳转方式
import React from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import './style.css';

const About = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/about/bar');
  };

  return (
    <div>
      <h3>About Page</h3>
      <Link to="/">Home</Link> |<NavLink
        to="/about/foo/123"
        className={({ isActive }) => (isActive ? 'active' : '')}
      >
        Foo 123
      </NavLink> |<NavLink
        to="/about/foo/456"
        className={({ isActive }) => (isActive ? 'active' : '')}
      >
        Foo 456
      </NavLink> |<button onClick={handleClick}>Bar</button>
      <Outlet />
    </div>
  );
};

export default About;
```

### react-router 的相关组件

1. `<Link to='/'>Home</Link>`，Link 组件表示一个普通的 a 标签；
2. `<NavLink to="/about/foo/123" className={({isActive}) => (isActive ? 'active': '')}>Foo 123</NavLink>`，NavLink 组件可设置样式；注意此处的 isActive 是在一个对象中，解构出来的。
3. `<Navigate to="/about/bar" />`，路由重定向组件

### react-router 的相关 use 方法

1. `const location = useLocation()`，获取 location；
2. `const = useSearchParams()`，获取搜索关键词；
3. `const {id} = useParams()`，获取动态路由的参数；
4. `const navigate = useNavigate()`，用于路由跳转；
5. `useLoaderData()`，获取 loader 函数返回的数据

## 参考链接

1. [官方文档](https://reactrouter.com/en/main/start/overview)
