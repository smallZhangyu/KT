import { Navigate, createBrowserRouter, redirect } from 'react-router-dom';
import React from 'react';
import type { RouteObject } from 'react-router-dom';


import store from '../store';
import App from '../App';
import Index from '../views/Index';
import Me from '../views/Me';
import Login from '../views/Login';

declare module 'react-router' {
  interface IndexRouteObject {
    meta?: {
      title: string;
    }
  }
  interface NonIndexRouteObject {
    meta?: {
      title: string;
    }
  }
}

const routes: RouteObject[] = [
  {
    path: '/',
    element: React.createElement(App),
    meta: {
      title: 'index'
    },
    children: [
      {
        index: true,
        element: React.createElement(Navigate, { to: '/index' }),
      },
      {
        path: '/index',
        element: React.createElement(Index),
      },
      {
        path: '/user',
        element: React.createElement(Me),
        loader: () => {
          if (!store.getState().myInfo.username) {
            return redirect('/login');
          }
          return null;
        },
      },
      {
        path: '/login',
        element: React.createElement(Login),
        meta: {
          title: 'login'
        },
      },
    ],
  },
];

const router = createBrowserRouter(routes);

export default router;
