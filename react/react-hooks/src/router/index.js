import {
  createBrowserRouter,
  createHashRouter,
  Route,
  createRoutesFromElements,
  Navigate,
  redirect,
} from 'react-router-dom';
import App from '../routerDemo/App';
import Home from '../routerDemo/Home';
import About from '../routerDemo/About';
import Foo from '../routerDemo/Foo';
import Bar from '../routerDemo/Bar';
import BeforeEach from '../components/BeforeEach';

// v6.4 路由表的配置方式，推荐
export const routes = [
  {
    path: '/',
    element: (
      <BeforeEach>
        <App />
      </BeforeEach>
    ),
    meta: { title: 'route meta home' },
    // errorElement 为全局路由不匹配时的处理
    errorElement: <>404</>,
    children: [
      {
        path: '',
        element: <Home />,
        meta: { title: 'route meta home', auth: false },
      },
      {
        path: 'about',
        element: <About />,
        meta: { title: 'route meta about' },
        children: [
          {
            index: true,
            // element: <div>默认的内容</div>,
            element: <Navigate to="foo/123" />, // Navigate 为重定向组件
          },
          {
            path: 'foo/:id',
            element: <Foo />,
            meta: { title: 'route meta foo', auth: true },
          },
          {
            path: 'bar',
            element: <Bar />,
            meta: { title: 'route meta bar', auth: true },
            loader: async () => {
              // 进入组件前触发,相当于vue-loader的beforeEnter
              //   console.log('before enter component');
              setTimeout(() => {}, 2000);
              // redirect('/login');
              return null;
            },
            // loader() {
            //   console.log('bar');
            //   return null;
            // },
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

const router = createBrowserRouter(routes);

export default router;
