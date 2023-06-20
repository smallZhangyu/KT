import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';

// import App from './App';
// import router from './router';
// import store from './store';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <Provider store={store}>
//       {/* <App /> */}
//       <RouterProvider router={router}></RouterProvider>
//     </Provider>
//   </React.StrictMode>
// );

/**
 * index & me & login demo
 */
import router from './indexMeLoginDemo/router';
import store from './indexMeLoginDemo/store';

const root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
