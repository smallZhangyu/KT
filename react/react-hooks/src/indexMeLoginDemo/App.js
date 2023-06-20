import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import './app.css';

const App = () => {
  return (
    <div className="appWrapper">
      <Outlet />
      <footer>
        <NavLink to="/index">Index</NavLink>
        <NavLink to="/user">Me</NavLink>
      </footer>
    </div>
  );
};

export default App;
