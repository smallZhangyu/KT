import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import './app.css';

const App: React.FC = () => {
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
