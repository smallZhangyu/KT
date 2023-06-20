import { Navigate, createBrowserRouter, redirect } from 'react-router-dom';

import store from '../store';
import App from '../App';
import Index from '../views/Index';
import Me from '../views/Me';
import Login from '../views/Login';

const routes = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Navigate to="/index" />,
      },
      {
        path: '/index',
        element: <Index />,
      },
      {
        path: '/user',
        element: <Me />,
        loader: () => {
          if (!store.getState().myInfo.username) {
            return redirect('/login');
          }
          return null;
        },
      },
      {
        path: '/login',
        element: <Login />,
      },
    ],
  },
];

const router = createBrowserRouter(routes);

export default router;
